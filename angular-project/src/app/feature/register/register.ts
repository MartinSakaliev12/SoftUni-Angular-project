import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  formBuilder = inject(FormBuilder)
  registerForm: FormGroup;
 
  constructor(){
    this.registerForm = this.formBuilder.group({
      username:['',[Validators.required,Validators.minLength(4)]],
      email:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)]],
      passwords: this.formBuilder.group({
        password:['',[Validators.required,Validators.minLength(6)]],
        rePassword:['',[Validators.required]],
      },{validators:this.isPassowrdsMatch}),
      biography:[''] 
    })
  }
  get username (){
    return this.registerForm.get('username')
  }
  get email (){
    return this.registerForm.get('email')
  }
  get passwords (){
    return this.registerForm.get('passwords') as FormGroup
  }
  
  get isUsernameInvalid(){
    if((this.username?.touched || this.username?.dirty) && (this.username.invalid || this.username.errors?.['minlength'])){
      return true
    }
    return false
  }

  get isEmailInvalid (){
    if((this.email?.touched || this.email?.dirty) && (this.email.invalid || this.email.errors?.['pattern'])){
      return true
    }
    return false
  }

  get isPasswordInvalid (){
    if((this.passwords.get('password')?.touched || this.passwords.get('password')?.dirty) && (this.passwords.get('password')?.invalid || this.passwords.get('passwords')?.errors?.['minlength'])){
      return true
    }
    return false
  }

  get isRePasswordInvalid(){
    if(this.passwords.errors?.['passwordsMissmatch']){
      return true
    }
    return false
  }

  // get usernameErrorMessage(){
  //   //todo errors messages and add returning type of get
  // }
  register():void{
    console.log(this.registerForm.get('passwords'))
  }

  isPassowrdsMatch(passwords:FormGroup){
    const password = passwords.get('password')
    const rePasssword = passwords.get('rePassword')
    if(password && rePasssword && password.value !== rePasssword.value){
      return {passwordsMissmatch: true}
    }
    return null
  }
}
