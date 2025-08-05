import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
      username:'',
      email:'',
      password:'',
      rePassword:'',
      biography:'',
      
    })
  }

  register():void{
    console.log('yessss')
  }
}
