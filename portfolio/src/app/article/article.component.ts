import { Component, Input} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [HeaderComponent, MarkdownModule],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  @Input() name:? string;
  
}
