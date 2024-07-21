import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BookService, ReserveRecord } from '../../service/book.service';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

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
  constructor(private bookService:BookService){}
  reserveRecord:ReserveRecord[]=[]
  filteredRecord:ReserveRecord[]=[]
  searchQuery=''
  p:number=1
  
  fetchReserveRecord():void{
    this.bookService.getReserveRecords().subscribe((data:ReserveRecord[])=>{
      this.reserveRecord= data
    this.filteredRecord=this.reserveRecord
    console.log(this.reserveRecord)
    })

    

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

}
