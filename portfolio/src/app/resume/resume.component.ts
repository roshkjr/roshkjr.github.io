import { Component, OnInit} from '@angular/core';
import { HeaderComponent} from '../header/header.component';
import { ExperienceComponent } from '../experience/experience.component';
import { Experience } from '../experience/experience.model';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [HeaderComponent, ExperienceComponent],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent implements OnInit{
  experiences?: Experience[];
  
  ngOnInit(){
    this.experiences=[{
      role: 'Scientific Programmer',
      organisation: 'EMBL-EBI',
      duration:{
        begin: 'Sep 2023',
        end: 'Present'
      },
      description:[
        'Spearheading data and services related to small molecules in the PDBe',
        `Developing open-source python packages to streamline processing and
        analysis of small molecules`,
        'Building webcomponents and webpages to make small molecule data in the PDB easily accessible',
        'Developing tutorial and training materials to reach students and researchers'
      ],
      logo: '../../assets/images/EMBL_EBI_Logo_black.svg'
    },
    {
      role: 'Researcher',
      organisation: 'Tata Consultancy Services',
      duration:{
        begin: 'Aug 2017',
        end: 'Aug 2022'
      },
      description:[
        `Managed a team of researchers working in the area of drug repurposing and
        toxicogenomics`,
        `Developed research proposals and contributed to manuscript preparation
        for peer-reviewed scientific journals`,
        `Managed client requirements and developed technical project proposals and
        solutions
        `
      ],
      logo:'../../assets/images/TCS-logo-black-CMYK.svg'
    }
  ]
  }

}
