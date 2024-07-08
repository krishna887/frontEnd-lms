import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.css'
})
export class ReactiveFormComponent {
  studentForm:FormGroup=new FormGroup({
    name :new FormControl("",[Validators.required,Validators.minLength(4)]),
    email:new FormControl("", Validators.email),
    password:new FormControl("",Validators.required),

  })
  formValue:any
  onSave(){
    this.formValue=this.studentForm.value
  }


}
