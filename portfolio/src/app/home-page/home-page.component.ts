import { Component, OnInit} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MarkdownModule } from 'ngx-markdown';
import { ArticleItemComponent } from '../article-item/article-item.component';
import { ArticleItem } from '../article-item/article-item.model';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent, ArticleItemComponent, MarkdownModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit{
  articleItems?: ArticleItem[];
  
  ngOnInit(){
    this.articleItems = [
      {
        title: "adada",
        img: "../../assets/images/angular.svg",
        caption: "asdadafafsdfsdf",
        date: "20 Jul, 2024",
        tags: ["Angular", "Web"]
      }
    ]

  }
}
