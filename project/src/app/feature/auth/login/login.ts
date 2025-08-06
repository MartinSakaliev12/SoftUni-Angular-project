import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  private authService = inject(AuthService)
  private router = inject(Router)
  constructor(private formBuidler: FormBuilder){
    this.loginForm = this.formBuidler.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  get isEmailInvalid():boolean{
    if(this.loginForm.get('email')?.invalid && this.loginForm.get('email')?.touched){
      return true
    }
    return false
  }

  get isPasswordInvalid (){
    if(this.loginForm.get('password')?.touched && this.loginForm.get('password')?.invalid){
      return true
    }
    return false
  }

  login(){
    const email = this.loginForm.get('email')?.value
    const password = this.loginForm.get('password')?.value
    this.authService.login(email,password).subscribe({
      next: ()=>{
        this.router.navigate(['/home'])
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }
}


