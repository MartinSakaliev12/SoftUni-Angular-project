import { Component, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../shared/models/post.model';
import { PostService } from '../../core/services/post.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit{
  post$:Observable<Post>
  private postService = inject(PostService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  editForm:FormGroup

  editMode = signal<boolean>(false)

  authService = inject(AuthService)

  constructor(private formBuilder:FormBuilder){
    
    this.post$ = this.postService.getDetailsPost(this.route.snapshot.paramMap.get('postId'))
    this.editForm = this.formBuilder.group({
      title:['',[Validators.required]],
      description:['',[Validators.required,Validators.minLength(10)]],
      imageUrl:['']
    })

  }
    ngOnInit(): void {
    this.post$.subscribe((postData) => {
      if (postData) {
        this.editForm.patchValue({
          title: postData.title,
          description: postData.description,
          imageUrl: postData.imageUrl
        });
      }
    });
  }
  get title() :AbstractControl|null{
    return this.editForm.get('title')
  }
  get description () :AbstractControl|null{
    return this.editForm.get('description')
  }
  get imageUrl () :AbstractControl|null{
    return this.editForm.get('imageUrl')
  }

  get isTitleInvalid():boolean{
    if(this.title?.invalid && this.title?.touched){
      return true
    }
    return false;
  }
  get isDescriptionInvalid():boolean{
    if((this.description?.touched || this.description?.dirty) && (this.description.invalid || this.description.errors?.['minlength'])){
      return true
    }
    return false
  }

  get titleErrorMessage ():string{
    if(this.title?.touched && this.title?.invalid){
      return "Title is reqired!";
    }
    return "";
  }
  
  get descriptionErrorMessage():string{
    if(this.description?.dirty && this.description.errors?.['minlength']){
      return "Description have at least 10 characters!"
    }
    if(this.description?.touched){
      return "Description is reqired!"
    }
    
    return ""
  }
  editModeSwitch():void{
    if(this.editMode()){
      this.editMode.set(false)
    }else{
      this.editMode.set(true)
    }
    
  }
  edit():void{

    this.postService.editPost(
      this.title?.value,
      this.imageUrl?.value,
      this.description?.value,
      this.route.snapshot.paramMap.get('postId')
    ).subscribe({
      next:()=>{
        //this.router.navigate(['/home'])
        this.editMode.set(false)
      }
    })
  }
  deletePost():void{
    this.postService.deletePost(this.route.snapshot.paramMap.get('postId')).subscribe({
      next:()=>{
        this.router.navigate(['/home'])
      }
    })
  }
}
