import { Component, Input } from '@angular/core';
import { Post } from '../../shared/models/post.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-single-post',
  imports: [RouterModule],
  templateUrl: './single-post.html',
  styleUrl: './single-post.css'
})
export class SinglePost {
  @Input() post: Post| null = null
}
