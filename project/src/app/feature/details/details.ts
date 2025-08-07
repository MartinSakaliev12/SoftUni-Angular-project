import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../shared/models/post.model';
import { PostService } from '../../core/services/post.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details {
  post$:Observable<Post>
  
  private postService = inject(PostService)
  private route = inject(ActivatedRoute)
  
  constructor(private httpClient: HttpClient){
    
    this.post$ = this.postService.getDetailsPost(this.route.snapshot.paramMap.get('postId'))
    
  }
}
