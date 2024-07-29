import { Component, OnInit, inject } from '@angular/core';
import {CommonModule, JsonPipe} from "@angular/common";
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { Book } from '../../../core/model/interceptor/Book';
import { BookService } from '../../../core/service/book.service';

@Component({
  selector: 'app-book-record',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterOutlet,FormsModule,NgxPaginationModule],
  templateUrl: './book-record.component.html',
  styleUrl: './book-record.component.css'
})
export class BookRecordComponent implements OnInit {
  books:Book[]=[]
  filteredBooks:Book[] = []
  searchQuery =''
  p: number = 1  // Current page number


  ngOnInit(): void {
   this.fetchBooks();
  


  }
  constructor(private bookservice:BookService, private router:Router,
    ){

  }
  fetchBooks():void{
    this.bookservice.getBooks().subscribe((data:Book[])=>{
    this.books=data
    this.filteredBooks = this.books; // Update filteredBooks after fetching
    console.log(this.books)
   })
  }
  filterBooks(): void {
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.isbn.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.p = 1; // go to first page

    console.log('Filtered Books:', this.filteredBooks);
  }


}
