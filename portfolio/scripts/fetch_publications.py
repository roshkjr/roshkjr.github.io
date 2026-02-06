#!/usr/bin/env python3
"""
Fetch publications from Europe PMC API using ORCID ID and generate markdown list.
"""

import requests
from pathlib import Path
from typing import List, Dict, Tuple
import os
from dotenv import load_dotenv
from jinja2 import Environment, FileSystemLoader
import configparser
from functools import lru_cache


load_dotenv()
config = configparser.ConfigParser()
portfolio_dir = Path(__file__).parent.parent
config_file = portfolio_dir / 'config.ini'
config.read(config_file)

ORCID_ID = os.getenv("ORCID_ID")
EUROPE_PMC_BASE_URL = config['DEFAULT']['EURPOPEPMC_URL']
OUTPUT_FILE = portfolio_dir / 'publications.qmd'


@lru_cache(maxsize=1)
def fetch_all_publications() -> tuple:
    """Fetch all publications from Europe PMC API with pagination (cached)."""
    all_publications = []
    cursor_mark = "*"

    while True:
        try:
            url = f"{EUROPE_PMC_BASE_URL}/articleApi"
            params = {
                "query": ORCID_ID,
                "cursorMark": cursor_mark,
                "format": "json",
                "pageSize": 25,
                "sort": "Relevance",
                "synonym": "FALSE"
            }

            response = requests.get(url, params=params, timeout=10)
            response.raise_for_status()
            data = response.json()

            # Extract articles from response
            articles = data.get("resultList", {}).get("result", [])
            if not articles:
                break

            all_publications.extend(articles)

            # Check if there are more results
            next_cursor_mark = data.get("nextCursorMark")
            if not next_cursor_mark or next_cursor_mark == cursor_mark:
                break

            cursor_mark = next_cursor_mark

        except requests.RequestException as e:
            print(f"Error fetching publications: {e}")
            break

    return tuple(all_publications)


def extract_publication_info(article: Dict) -> Dict:
    """Extract relevant information from a Europe PMC article entry."""
    info = {
        "title": "",
        "year": "",
        "doi": "",
        "journal": "",
        "type": "peer-reviewed",
        "citations": None,
        "authors": None,
    }

    # Extract title
    info["title"] = article.get("title", "")

    # Extract year
    info["year"] = str(article.get("pubYear", ""))

    # Extract DOI
    info["doi"] = article.get("doi", "")

    # Determine publication type based on publication type or source
    pub_type = article.get("pubType", "")
    source = article.get("source", "")

    if "preprint" in pub_type or "posted-content" in pub_type:
        info["type"] = "preprint"
    elif "bioRxiv" in source or "medRxiv" in source:
        info["type"] = "preprint"
    else:
        info["type"] = "peer-reviewed"

    # Extract journal
    journal_name = ""
    if source == "PPR":
        book_details = article.get("bookOrReportDetails", None)
        if book_details:
            journal_name = book_details.get("publisher", "")
    else:
        journal_name = article.get("journalTitle", "")
    
    info["journal"] = journal_name

    # Extract author list and highlight your name
    author_string = article.get("authorString", "")
    if author_string:
        authors = author_string.split(", ")
        if len(authors) > 5:
            author_string = ", ".join(authors[:5]) + " et al."

        info["authors"] = author_string


    # Extract citation count
    citation_count = article.get("citedByCount")
    if citation_count:
        info["citations"] = citation_count



    return info


def organize_publications(articles: List[Dict]) -> Tuple[List[Dict], List[Dict]]:
    """Organize publications into peer-reviewed and preprints."""
    peer_reviewed = []
    preprints = []

    for article in articles:
        info = extract_publication_info(article)

        if not info["title"]:
            continue

        if info["type"] == "preprint":
            preprints.append(info)
        else:
            peer_reviewed.append(info)

    # Sort by year (newest first)
    peer_reviewed.sort(key=lambda x: x["year"], reverse=True)
    preprints.sort(key=lambda x: x["year"], reverse=True)

    return peer_reviewed, preprints


def render_template(peer_reviewed: List[Dict], preprints: List[Dict]) -> str:
    """Render publications using Jinja2 template."""

    # Set up Jinja2 environment to load templates from portfolio/templates
    templates_dir = portfolio_dir / "templates"
    env = Environment(loader=FileSystemLoader(templates_dir))
    template = env.get_template("publications.jinja2")

    # Render template with data
    rendered = template.render(
        peer_reviewed=peer_reviewed,
        preprints=preprints
    )

    return rendered


def main():
    """Main function."""
    print(f"Fetching publications for ORCID ID: {ORCID_ID}...")
    articles = list(fetch_all_publications())  # Convert cached tuple to list

    if not articles:
        print("Failed to fetch publications.")
        return

    print(f"Found {len(articles)} publications...")
    peer_reviewed, preprints = organize_publications(articles)

    print(f"Organized {len(peer_reviewed)} peer-reviewed and {len(preprints)} preprint publications...")

    rendered = render_template(peer_reviewed, preprints)

    # Write to file
    with open(OUTPUT_FILE, "w") as f:
        f.write(rendered)

    print(f"✓ Publications updated in {OUTPUT_FILE}")
    print(f"  - Peer-reviewed: {len(peer_reviewed)}")
    print(f"  - Preprints: {len(preprints)}")


if __name__ == "__main__":
    main()
