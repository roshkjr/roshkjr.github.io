import { Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePageComponent{
}
