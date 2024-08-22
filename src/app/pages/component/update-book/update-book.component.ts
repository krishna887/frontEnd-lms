import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Component({
  selector: 'app-update-book',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css'
})
export class UpdateBookComponent implements OnInit {
  bookForm: FormGroup;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private toaster:ToastrService
   
  ) {
    // Initialize bookForm with an empty form group
    this.bookForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl(''),
      author: new FormControl(''),
      isbn: new FormControl(''),
      copiesAvailable: new FormControl('')
    });
  }

  ngOnInit() {
    const bookId = this.route.snapshot.paramMap.get('id');
    this.bookForm = new FormGroup({
      id:new FormControl({value:bookId, disabled:true}),
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      isbn: new FormControl('', [Validators.required]),
      copiesAvailable: new FormControl('', [Validators.min(0)]),
    });

    this.http.get(`http://localhost:8080/api/books/findBookById/${bookId}`)
    .pipe(map((response: any) => response.data))
    .subscribe((book: any) => {
      console.log(book);
      if (book) {
        this.bookForm.patchValue({
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          copiesAvailable: book.copiesAvailable
        });
      }
    });
  }
  onSubmit() {
    if (this.bookForm.valid) {
      const bookData = this.bookForm.getRawValue();
      this.http.put(`http://localhost:8080/api/books/update/${bookData.id}`, bookData).subscribe(
        response => {
          console.log('Book updated successfully', response);
          this.toaster.show("Book Updated Sucessful !")
        },
        error => {
          console.error('Error updating book', error);
          this.toaster.show("Error in Updating Book ")
        }
      )
      this.router.navigate(['/librarian-dashboard/books-record'])
    }
  }
}