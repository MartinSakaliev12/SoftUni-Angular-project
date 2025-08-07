import { Component, Input } from '@angular/core';
import { Post } from '../../shared/models/post.model';

@Component({
  selector: 'app-single-post',
  imports: [],
  templateUrl: './single-post.html',
  styleUrl: './single-post.css'
})
export class SinglePost {
  @Input() post: Post| null = null
}
