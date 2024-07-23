import { HttpClient,HttpResponse } from '@angular/common/http';
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
  constructor(private http:HttpClient){

  }
  studentUpdateForm:FormGroup= new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email]),
    username:new FormControl('',[Validators.required]),
    contactDetails:new FormControl('',Validators.required)

  })
  register() {

     const registerUrl= 'http://localhost:8080/librarian/register/student' 
     console.log(this.studentUpdateForm.value)

    this.http.post(registerUrl, this.studentUpdateForm.value, { observe: 'response' }).subscribe({

      next: (response: HttpResponse<any>) => {
        if(response.body.status){
          alert("Student Register Successful and Email is Send to Respective Mail")
        }
        
        console.log(response)
        
      },
      error: (error) => {
        alert(error.message)
        console.log(error)
      }
    });
  }

}
