import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookService, BorrowRecord } from '../../service/book.service';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs';
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
     
    });
  }

  filterBorrowRecord(): void {
    this.filterRecord = this.borrowRecord.filter(record => {
      const bookIdMatch = record.bookId.toString().includes(this.searchQuery);
      const userIdMatch = record.userId.toString().includes(this.searchQuery);
      const fineMatch = record.fineAmount.toString().includes(this.searchQuery);
      return bookIdMatch || userIdMatch || fineMatch;
    });
  }
  calculate(id:number){
    this.http.get<any>(`http://localhost:8080/api/calculate/fine?borrowId=${id}`).pipe(map(res=>res.data))
    .subscribe((fine)=>{if(fine==0){
      alert("Book is not Returned to calculate Fine")
    }else
    alert("fine calculate sucess and the fine amount is:"+ fine)
    })
  }
}