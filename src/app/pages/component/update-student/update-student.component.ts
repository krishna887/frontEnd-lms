import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { StrongPasswordRegx } from '../../../core/constants/password_regix';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent {
  http=inject(HttpClient)
  constructor(private router:Router){}
  studentUpdateForm:FormGroup=new FormGroup(
    {
    email:new FormControl('',[Validators.required, Validators.email]),
    username:new FormControl('',[Validators.required]),
    // password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    password: new FormControl<string>('', {
      validators: [Validators.required, Validators.pattern(StrongPasswordRegx)],
    }),
    cPassword:new FormControl('',[Validators.required]),
    name:new FormControl('',[Validators.required]),
    contactDetails:new FormControl('',Validators.required),
    },[confirmPasswordValidator("password","cPassword")]
    )
    get passwordFormField() {
      return this.studentUpdateForm.get('password');
    }

    update() {

      const updateStudent= 'http://localhost:8080/student/update' 
      
 
     this.http.put(updateStudent, this.studentUpdateForm.value, { observe: 'response' }).subscribe({
 
       next: (response: HttpResponse<any>) => {
         if(response.body.status){
           alert("Student Update Sucessefully")
         }
         
         console.log(response)
         
       },
       error: (error) => {
         alert(error.message)
         console.log(error)
       }
     });
     this.router.navigate(['/student-dashboard/profile']);

   }
  }




export function confirmPasswordValidator(password:string, cPassword:string){
  return function(form:AbstractControl){
    if(form.get(password)?.value===form.get(cPassword)?.value){
      return null
    }
    return {mismatch:true}
    
  }

}

