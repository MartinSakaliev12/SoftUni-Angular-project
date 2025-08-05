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
