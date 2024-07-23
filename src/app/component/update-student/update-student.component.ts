import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent {
  http=inject(HttpClient)
  constructor(){}
  studentUpdateForm:FormGroup=new FormGroup(
    {
    email:new FormControl('',[Validators.required, Validators.email]),
    username:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.minLength(8)]),
    cPassword:new FormControl('',[Validators.required]),
    name:new FormControl('',[Validators.required]),
    contactDetails:new FormControl('',Validators.required),
    },[confirmPasswordValidator("password","cPassword")]
    )
   

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

