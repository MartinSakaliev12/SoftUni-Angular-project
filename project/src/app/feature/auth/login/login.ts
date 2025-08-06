import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;

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
    console.log(this.loginForm.valid)
  }
}
