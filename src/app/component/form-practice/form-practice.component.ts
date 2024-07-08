import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-practice',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './form-practice.component.html',
  styleUrl: './form-practice.component.css'
})
export class FormPracticeComponent {
  studentObj:any={
    name:'',
    email:'',
    password:''
  }
  formValue:any
  onClick(){
    this.formValue=this.studentObj
    console.log(this.formValue)
  }

}
