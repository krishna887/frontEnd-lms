import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { BookService } from '../../../core/service/book.service';
import { ReserveRecord } from '../../../core/model/interceptor/ReserveRecord';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reservation-record',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink,NgxPaginationModule],
  templateUrl: './reservation-record.component.html',
  styleUrl: './reservation-record.component.css'
})
export class ReservationRecordComponent implements OnInit {
  ngOnInit(): void {
   this.fetchReserveRecord()
  }
  constructor(private bookService:BookService,private http:HttpClient){}
  reserveRecord:ReserveRecord[]=[]
  bookMap: { [id: number]: string } = {};
  userMap: { [id: number]: string } = {};
  filteredRecord:ReserveRecord[]=[]
  searchQuery=''
  p:number=1
  
  fetchReserveRecord():void{
    this.bookService.getReserveRecords().subscribe((data:ReserveRecord[])=>{
      this.reserveRecord= data
    this.filteredRecord=this.reserveRecord

      // Fetch book and user details for each record
      this.reserveRecord.forEach(record => {
        this.getBookRecord(record.bookId);
        this.getUserDetails(record.userId);
      });
    })
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
  formatDate(date: Date): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Add leading zero if needed
    const day = ('0' + date.getDate()).slice(-2); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  }
  filterReserveRecord(): void {
    this.filteredRecord = this.reserveRecord.filter(record => {
      const bookIdMatch = record.bookId.toString().includes(this.searchQuery);
      const userIdMatch = record.userId.toString().includes(this.searchQuery);
  
      // Convert dates to string in 'YYYY-MM-DD' format for comparison
      const reservationDateMatch = this.formatDate(record.reservationDate).includes(this.searchQuery);
  
      return bookIdMatch || userIdMatch || reservationDateMatch 
    });
    console.log(this.filteredRecord)
  }

  updateFilterRecord(): void {
    // Update the filterRecord to ensure the changes in book and user maps are reflected
    this.filteredRecord = [...this.reserveRecord];
  }

}
