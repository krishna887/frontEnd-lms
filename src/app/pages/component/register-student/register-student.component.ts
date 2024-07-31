import { JsonPipe } from '@angular/common';
import { HttpClient,HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-student',
  standalone: true,
  imports: [ReactiveFormsModule,JsonPipe],
  templateUrl: './register-student.component.html',
  styleUrl: './register-student.component.css',
  providers:[ToastrService]
})
export class RegisterStudentComponent {
  constructor(private http:HttpClient,private toaster:ToastrService,
    private router:Router){

  }
  studentUpdateForm:FormGroup= new FormGroup({
    email:new FormControl('',[Validators.required, Validators.email,Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]),
    username:new FormControl('',[Validators.required]),
    contactDetails:new FormControl('',Validators.required)

  })
  register() {

     const registerUrl= 'http://localhost:8080/librarian/register/student' 
     console.log(this.studentUpdateForm.value)

    this.http.post(registerUrl, this.studentUpdateForm.value, { observe: 'response' }).subscribe({

      next: (response: HttpResponse<any>) => {
        if(response.body.status){
          this.toaster.show("Student Register Successful and Mail was sent to Respected Email ")
        }
        
        console.log(response)
        this.router.navigate(['/librarian-dashboard/books-record']);
      },
      error: (error) => {
        let errorMessage=''
        if(error.status==400){
          errorMessage="User name already taken!"
        }
        else{
          errorMessage='An Error Occured while registering student'
        }
        this.toaster.show(errorMessage)
        console.log(error)
      }
    });
    

  }

}
