import { Component, OnInit} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { WorksComponent } from '../works/works.component';
import { Work } from '../works/works.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [HeaderComponent, WorksComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  works?: Work[];

  ngOnInit() {
    this.works = [
      {
        header: 'Cheminformatics',
        description:`Explore the world of cheminformatics with me. 
                     From fundamentals to various applciation of
                     latest tools and algorithms in cheminformatics.
                     `,
        logo:'../../assets/images/cheminformatics.svg'
      },
      {
        header: 'Machine Learning',
        logo:'../../assets/images/machine-learning.svg',
        description: `Discover tutorials on how to use latest ML algorithms
                      in drug discovery and development. Covers QSAR, binding
                      affinity prediction, toxicity prediction and many more`
      },
      {
        header: 'Investing',
        logo: '../../assets/images/investing.svg',
        description: `Discusses data-driven approaches for valuing companies
                      and investing in stocks. Only for educational purpose,
                      not an investment advice`

      }
    ]
  }
}
