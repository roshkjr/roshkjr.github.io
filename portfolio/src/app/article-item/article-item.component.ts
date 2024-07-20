import { Component, Input} from '@angular/core';
import { ArticleItem } from './article-item.model';

@Component({
  selector: 'app-article-item',
  standalone: true,
  imports: [],
  templateUrl: './article-item.component.html',
  styleUrl: './article-item.component.css'
})
export class ArticleItemComponent {
  @Input() data?: ArticleItem;

}
