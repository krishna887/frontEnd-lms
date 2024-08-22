import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { BorrowRecord } from '../../../core/model/interceptor/BorrowRecord';
import { BookService } from '../../../core/service/book.service';

@Component({
  selector: 'app-borrow-record',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule, NgxPaginationModule],
  templateUrl: './borrow-record.component.html',
  styleUrls: ['./borrow-record.component.css']
})
export class BorrowRecordComponent implements OnInit {
  borrowRecord: BorrowRecord[] = [];
  bookMap: { [id: number]: string } = {};
  userMap: { [id: number]: string } = {};
  filterRecord: BorrowRecord[] = [];
  searchQuery = '';
  p: number = 1;

  constructor(private bookService: BookService, private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchBorrowRecord();
  }

  fetchBorrowRecord(): void {
    this.bookService.getBorrowRecords().subscribe((data: BorrowRecord[]) => {
      this.borrowRecord = data;
      this.filterRecord = this.borrowRecord;

      // Fetch book and user details for each record
      this.borrowRecord.forEach(record => {
        this.getBookRecord(record.bookId);
        this.getUserDetails(record.userId);
      });
    });
  }

  getBookRecord(id: number): void {
    this.http.get<any>(`http://localhost:8080/api/books/findBookById/${id}`).subscribe(response => {
      const book = response.data;
      this.bookMap[id] = book.title; 
      this.updateFilterRecord();
    });
  }

  getUserDetails(id: number): void {
    this.http.get<any>(`http://localhost:8080/student/getUserDetailsById/${id}`).subscribe(response => {
      const user = response.data;
      this.userMap[id] = user.username; // Assuming username is in the response as `username`
      this.updateFilterRecord();
    });
  }

  filterBorrowRecord(): void {
    this.filterRecord = this.borrowRecord.filter(record => {
      const bookIdMatch = record.bookId.toString().includes(this.searchQuery);
      const userIdMatch = record.userId.toString().includes(this.searchQuery);

      const borrowDateMatch = this.formatDate(record.borrowDate).includes(this.searchQuery);
      const returnDateMatch = this.formatDate(record.returnDate).includes(this.searchQuery);

      return bookIdMatch || userIdMatch || borrowDateMatch || returnDateMatch;
    });
    this.p = 1;
  }

  formatDate(date: Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  updateFilterRecord(): void {
    // Update the filterRecord to ensure the changes in book and user maps are reflected
    this.filterRecord = [...this.borrowRecord];
  }
}
