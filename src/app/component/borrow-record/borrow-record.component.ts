import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BookService, BorrowRecord } from '../../service/book.service';
import { HttpClient } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-borrow-record',
  standalone: true,
  imports: [RouterLink, CommonModule,ReactiveFormsModule,FormsModule,NgxPaginationModule],
  templateUrl: './borrow-record.component.html',
  styleUrl: './borrow-record.component.css'
})

export class BorrowRecordComponent implements OnInit {
  borrowRecord:BorrowRecord[]=[]
  filterRecord:BorrowRecord[]=[]
  searchQuery=''
  p: number = 1 
  constructor(private bookService:BookService, private http:HttpClient){}
  ngOnInit(): void {
    this.fetchBorrowRecord()
  }
  fetchBorrowRecord():void{
        this.bookService.getBorrowRecords().subscribe((data:BorrowRecord[])=>{
        this.borrowRecord=data
        this.filterRecord=this.borrowRecord
        
       })
      }

      filterBorrowRecord(): void {
        this.filterRecord = this.borrowRecord.filter(record => {
          const bookIdMatch = record.bookId.toString().includes(this.searchQuery);
          const userIdMatch = record.userId.toString().includes(this.searchQuery);
      
          // Convert dates to string in 'YYYY-MM-DD' format for comparison
          const borrowDateMatch = this.formatDate(record.borrowDate).includes(this.searchQuery);
          const returnDateMatch = this.formatDate(record.returnDate).includes(this.searchQuery);
      
          return bookIdMatch || userIdMatch || borrowDateMatch || returnDateMatch;
        });
        console.log(this.filterRecord)
      }
      formatDate(date: Date): string {
        if (!(date instanceof Date)) {
          date = new Date(date);
        }
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
        const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
        return `${year}-${month}-${day}`;
      }
      


}
