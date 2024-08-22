import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { BorrowRecord } from '../../../core/model/interceptor/BorrowRecord';
import { BookService } from '../../../core/service/book.service';
@Component({
  selector: 'app-fine-record',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule, RouterLink],
  templateUrl: './fine-record.component.html',
  styleUrls: ['./fine-record.component.css']
})
export class FineRecordComponent implements OnInit {

  borrowRecord: BorrowRecord[] = [];
  filterRecord: BorrowRecord[] = [];
  bookMap: { [id: number]: string } = {};
  userMap: { [id: number]: string } = {};
  searchQuery = '';
  p: number = 1;
  
  constructor(private http: HttpClient, private bookService: BookService) {}

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
      const fineMatch = record.fineAmount.toString().includes(this.searchQuery);
      return bookIdMatch || userIdMatch || fineMatch;
    });
    this.p=1
  }
  calculate(id:number){
    this.http.get<any>(`http://localhost:8080/api/calculate/fine?borrowId=${id}`).pipe(map(res=>res.data))
    .subscribe((fine)=>{if(fine==0){
      alert("Book is not Returned to calculate Fine")
    }else
    alert("fine calculate sucess and the fine amount is:"+ fine)
    })
  }
  updateFilterRecord(): void {
    // Update the filterRecord to ensure the changes in book and user maps are reflected
    this.filterRecord = [...this.borrowRecord];
  }
}