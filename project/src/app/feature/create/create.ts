import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostService } from '../../core/services/post.service';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {
  createForm:FormGroup;
  private postService = inject(PostService)
  private router = inject(Router)

  constructor(private formBuilder: FormBuilder){
    this.createForm = this.formBuilder.group({
      title:['',[Validators.required]],
      description:['',[Validators.required,Validators.minLength(10)]],
      imageUrl:['']
    })
  }
  get title() :AbstractControl|null{
    return this.createForm.get('title')
  }
  get description () :AbstractControl|null{
    return this.createForm.get('description')
  }
  get imageUrl () :AbstractControl|null{
    return this.createForm.get('imageUrl')
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

  create(){
    this.postService.createPost(
      this.title?.value,
      this.imageUrl?.value,
      this.description?.value
    ).subscribe({
      next:()=>{
        this.router.navigate(['/home'])
      },
    })
  }
}
