import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {map, Observable} from 'rxjs';
import { Book } from '../model/interceptor/Book';
import { BorrowRecord } from '../model/interceptor/BorrowRecord';
import { ReserveRecord } from '../model/interceptor/ReserveRecord';

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
    return this.http.get('http://localhost:8080/api/all_borrow_records').pipe( map((response:any)=>response.data))
   }
   getReserveRecords():Observable<ReserveRecord[]>{
    return this.http.get<any>('http://localhost:8080/api/all_reservations').pipe( map(response=>response.data))
   }

}


  
  
