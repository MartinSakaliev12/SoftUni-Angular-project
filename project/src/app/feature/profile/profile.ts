import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileService } from '../../core/services/profile.service';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSingleDateSelectionModel } from '@angular/material/datepicker';
import { AuthService } from '../../core/services/auth.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, RouterModule,ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  private profileService = inject(ProfileService)
  authService = inject(AuthService)
  route = inject(ActivatedRoute)

  editProfileForm:FormGroup

  isEditMode = signal<boolean>(false)

  profile$: Observable<User>

  userId: string = ''

  constructor(private formBuilder:FormBuilder) {
    this.profile$ = this.profileService.getProfile(this.route.snapshot.paramMap.get('userId'))
    this.editProfileForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      imageUrl:['',[Validators.pattern(/https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg|webp)(\?.*)?$/)]],
      biography: ['']
    })
  }
  ngOnInit() {
    this.profile$.subscribe((userData) => {
      this.editProfileForm.patchValue({
        username:userData.username,
        email:userData.email,
        imageUrl:userData.imageUrl,
        biography:userData.biography
      })
    })
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadProfile(this.userId); // тук зареждаш новите данни
    });
  }
  loadProfile(id: string) {
    this.profile$ = this.profileService.getProfile(this.route.snapshot.paramMap.get('userId'))
    this.profile$.subscribe((userData) => {
      this.editProfileForm.patchValue({
        username:userData.username,
        email:userData.email,
        imageUrl:userData.imageUrl,
        biography:userData.biography
      })
    })
    
  }
  changeMode():void{
    if(this.isEditMode()){
      this.isEditMode.set(false)
    }else{
      this.isEditMode.set(true)
    }
  }
  get username():AbstractControl | null {
    return this.editProfileForm.get('username')
  }
  get email():AbstractControl | null {
    return this.editProfileForm.get('email')
  }

  get imageUrl():AbstractControl | null{
    return this.editProfileForm.get('imageUrl')
  }
  get biography ():AbstractControl | null{
    return this.editProfileForm.get('biography')
  }
  get isUsernameInvalid():boolean {
    if ((this.username?.touched || this.username?.dirty) && (this.username.invalid || this.username.errors?.['minlength'])) {
      return true
    }
    return false
  }

  get isEmailInvalid():boolean  {
    if ((this.email?.touched || this.email?.dirty) && (this.email.invalid || this.email.errors?.['pattern'])) {
      return true
    }
    return false
  }



  get isImageUrlInvalid():boolean{
    if(this.imageUrl?.errors?.['pattern']){
      return true
    }
    return false
  }

  get usernameErrorMessage():string {
    if (this.username?.dirty && this.username?.errors?.['minlength']) {
      return "Username have to be at least 4 characters."
    }
    if (this.username?.touched) {
      return "Username is reqired!"
    }

    return ""
    
  }

  get emailErrorMessage():string{
    if(this.email?.dirty && this.email?.errors?.['pattern']){
      return "Invalid email!"
    }
    if(this.email?.touched){
      return "Email is reqired!"
    }
    return "";
  }


  get imageUrlErrorMessage():string{
    if(this.imageUrl?.errors?.['pattern']){
      return "Incorrect image url!"
    }
    return ""
  }

  editProfile():void{
    this.authService.editProfile(
      this.biography?.value,
      this.username?.value,
      this.imageUrl?.value,
      this.email?.value
    ).subscribe({
      next:()=>{
        this.isEditMode.set(false)
      }
    })
  }
}
