import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-fine',
  standalone: true,
  imports: [FormsModule, CommonModule,ReactiveFormsModule],
  templateUrl: './edit-fine.component.html',
  styleUrl: './edit-fine.component.css'
})
export class EditFineComponent implements OnInit {

  formRecord: FormGroup;
  constructor(
    private http:HttpClient ,
    private route: ActivatedRoute,
    private router: Router
   
  ) {
     // Initialize bookForm with an empty form group
     this.formRecord = new FormGroup({
      id:new FormControl(''),
      userId: new FormControl(''),
      bookId: new FormControl(''),
      fineAmount:new FormControl(''),
      isFinePaid: new FormControl(false)
      
    });
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.formRecord = new FormGroup({
      id:new FormControl(id,[Validators.required]),
      userId: new FormControl('', [Validators.required]),
      bookId: new FormControl('', [Validators.required]),
      fineAmount: new FormControl('',Validators.required),
      finePaid: new FormControl(false, [Validators.required]),

    });

    this.http.get(`http://localhost:8080/api/borrow_record/${id}`)
    .pipe(map((response: any) => response.data))
    .subscribe((record: any) => {
      console.log(record);
      if (record) {
        this.formRecord.patchValue({
          id:record.id,
          userId:record.userId,
          bookId:record.bookId,
          fineAmount:record.fineAmount,
          finePaid:record.finePaid
        });
      }
    });
 


}

onSubmit() {
   
    const borrowData = this.formRecord.getRawValue();
  
    console.log(borrowData) // This includes the disabled 'id' field
    this.http.put(`http://localhost:8080/api/update/borrow_record/${borrowData.id}`, borrowData).subscribe(
      response => {
        console.log('Borrow Record updated successfully', response);
        console.log(borrowData)
        // Handle success response, such as navigating back to the book list or showing a success message
      },
      error => {
        console.error('Error updating Borrow record', error);
        // Handle error response, such as showing an error message
      }
    )
    this.router.navigate(['/librarian-dashboard/fine-record'])
  
}
}
