import { Component, Input} from '@angular/core';
import { Experience } from './experience.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css'
})
export class ExperienceComponent {
  @Input() data?: Experience[];

}
