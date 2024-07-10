import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.css'
})
export class RegisterStudentComponent {
  studentForm:FormGroup= new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email]),
    username:new FormControl('',[Validators.required]),
    contactDetails:new FormControl('',Validators.required)

  })

}
