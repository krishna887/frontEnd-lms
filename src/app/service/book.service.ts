import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
http= inject(HttpClient) // this is one way to inject http
  constructor() { }
  getBooks():Observable<Book[]>{
   return this.http.get<any>('http://localhost:8080/api/books/find-all').pipe( map(response=>response.data))
  }
  getBorrowRecords():Observable<BorrowRecord[]>{
    return this.http.get<any>('http://localhost:8080/api/all_borrow_records').pipe( map(response=>response.data))
   }
   getReserveRecords():Observable<ReserveRecord[]>{
    return this.http.get<any>('http://localhost:8080/api/all_reservations').pipe( map(response=>response.data))
   }

}

export interface Book {
  id:number
  author: string;
  copiesAvailable: number;
  available: boolean;
  isbn: string;
  title: string;
}
export interface BorrowRecord{
    id:number;
    userId:number;
    bookId:number;
    borrowDate :Date;
    returnDate:Date;
    returned:boolean ;
    fineAmount:number;
    finePaid:boolean;
}
export interface ReserveRecord{
  id:number
  userId:number
  bookId:number
  reservationDate:Date;
  cancelled:boolean
  active:boolean
}
  
  
