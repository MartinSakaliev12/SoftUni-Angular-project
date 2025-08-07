import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../shared/models/post.model';
import {  CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { SinglePost } from '../single-post/single-post';


@Component({
  selector: 'app-home',
  imports: [CommonModule,SinglePost],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home{
  
  posts:Post[]=[]
  posts$: Observable<Post[]>
  constructor(private postService: PostService){
    this.posts$ = this.postService.getPosts()

  }
 
}
