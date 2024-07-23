import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-borrow-edit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './borrow-edit.component.html',
  styleUrl: './borrow-edit.component.css'
})
export class BorrowEditComponent implements OnInit {
  formRecord: FormGroup;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
   
  ) {
    // Initialize bookForm with an empty form group
    this.formRecord = new FormGroup({
      id: new FormControl(''),
      userId: new FormControl(''),
      bookId: new FormControl(''),
      borrowDate:new FormControl(''),
      returnedDate: new FormControl(''),
      isReturned: new FormControl(false),
      fineAmount:new FormControl(''),
      isFinePaid: new FormControl(false)
      
    });
  }

  ngOnInit() {
    const borrowId = this.route.snapshot.paramMap.get('id');
    this.formRecord = new FormGroup({
      id:new FormControl({value:borrowId, disabled:true}),
      userId: new FormControl('', [Validators.required]),
      bookId: new FormControl('', [Validators.required]),
      borrowDate: new FormControl('', [Validators.required]),
      returnedDate: new FormControl('', [Validators.required]),
      isReturned: new FormControl(false, [Validators.required]),
      fineAmount: new FormControl(' ',Validators.required),
      isFinePaid: new FormControl(false, [Validators.required]),

    });

    this.http.get(`http://localhost:8080/api/borrow_record/${borrowId}`)
    .pipe(map((response: any) => response.data))
    .subscribe((record: any) => {
      console.log(record.fineAmount);
      if (record) {
        this.formRecord.patchValue({
          id:record.id,
          userId:record.userId,
          bookId:record.bookId,
          borrowDate:record.borrowDate,
          returnedDate:record.returnedDate,
          returned:record.returned,
          fineAmount:record.fineAmount,
          finePaid:record.finePaid
        
        });
      }
    });
  }
  onSubmit() {
    
      const bookData = this.formRecord.getRawValue(); // This includes the disabled 'id' field
      this.http.put(`http://localhost:8080/api/update/borrow_record/${bookData.id}`, bookData).subscribe(
        response => {
          console.log('Borrow Record updated successfully', response);
          // Handle success response, such as navigating back to the book list or showing a success message
        },
        error => {
          console.error('Error updating Borrow Record', error);
          // Handle error response, such as showing an error message
        }
      )
      this.router.navigate(['/librarian-dashboard/borrow-record'])
    
  }

}
