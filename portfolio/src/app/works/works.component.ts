import { Component, Input} from '@angular/core';
import { Work } from './works.model';

@Component({
  selector: 'app-works',
  standalone: true,
  imports: [],
  templateUrl: './works.component.html',
  styleUrl: './works.component.css'
})
export class WorksComponent {
  @Input() data?: Work[];

}
