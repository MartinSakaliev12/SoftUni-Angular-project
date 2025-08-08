import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule,],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  //TODO ADD FORM VALID TO CANNOT SUBMIT WHILE FORM GET VALID
  formBuilder = inject(FormBuilder)
  registerForm: FormGroup;
  private authService = inject(AuthService)
  private router = inject(Router)
  constructor() {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        rePassword: ['', [Validators.required]],
      }, { validators: this.isPassowrdsMatch }),
      imageUrl:['',[Validators.pattern(/https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg|webp)(\?.*)?$/)]],
      biography: ['']
    })
  }
  get username():AbstractControl | null {
    return this.registerForm.get('username')
  }
  get email():AbstractControl | null {
    return this.registerForm.get('email')
  }
  get passwords():FormGroup {
    return this.registerForm.get('passwords') as FormGroup
  }
  get imageUrl():AbstractControl | null{
    return this.registerForm.get('imageUrl')
  }
  get biography ():AbstractControl | null{
    return this.registerForm.get('biography')
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

  get isPasswordInvalid():boolean  {
    if ((this.passwords.get('password')?.touched || this.passwords.get('password')?.dirty) && (this.passwords.get('password')?.invalid || this.passwords.get('passwords')?.errors?.['minlength'])) {
      return true
    }
    return false
  }

  get isRePasswordInvalid():boolean  {
    if (this.passwords.errors?.['passwordsMissmatch']) {
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

  get passwordErrorMessage ():string{
    if(this.passwords.get('password')?.dirty && this.passwords.get('password')?.errors?.['minlength']){
      return "Your password have to be at least 6 characters!"
    }
    if(this.passwords.get('password')?.touched){
      return "Password is reqired!"
    }
    return "";
  }

  get rePasswordErrorMessage():string{
    if(this.passwords.get('rePassword')?.dirty && this.passwords?.errors?.['passwordsMissmatch']){
      return "Type your password to confirm it!"
    }
    if(this.passwords.get('rePassword')?.touched){
      return "Confirm passwords is reqired!"
    }
    return ""
  }
  get imageUrlErrorMessage():string{
    if(this.imageUrl?.errors?.['pattern']){
      return "Incorrect image url!"
    }
    return ""
  }
  register(): void {
    this.authService.register(
      this.biography?.value,
      this.email?.value,
      this.username?.value,
      this.passwords.get('password')?.value,
      this.imageUrl?.value
    ).subscribe({
      next: ()=>{
        this.router.navigate(['/home'])
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }

  isPassowrdsMatch(passwords: FormGroup) {
    const password = passwords.get('password')
    const rePasssword = passwords.get('rePassword')
    if (password && rePasssword && password.value !== rePasssword.value) {
      return { passwordsMissmatch: true }
    }
    return null
  }
  
}
