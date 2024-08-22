import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-add-book',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css'
})
export class AddBookComponent {
  // http=inject(HttpClient)
  constructor(private http:HttpClient,private router:Router){}
  bookForm:FormGroup=new FormGroup(
    {
    title:new FormControl('',[Validators.required]),
    author:new FormControl('',[Validators.required]),
    isbn:new FormControl('',[Validators.required]),
    copiesAvailable:new FormControl('',Validators.min(0)),

  },
    )

    onSubmit() {
      console.log(this.bookForm.value)
      if (this.bookForm.valid) {
        this.http.post('http://localhost:8080/api/books/create', this.bookForm.value).subscribe(() => {
          this.router.navigate(['/librarian-dashboard/books-record']);
        });
      }
    }

}
