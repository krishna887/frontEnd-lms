import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  private apiUrl = 'http://localhost:8080/api'; // Base URL for your API


  constructor(private http:HttpClient) { }
  borrowBook(userId: number , bookId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/borrow`, null, {
      params: { userId: userId, bookId: bookId }
    });
  }

  returnBook(userId: number, bookId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/return`, null, {
      params: { userId: userId, bookId: bookId }
    });
  }

  reserveBook(userId: number, bookId: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reserve`, null, {
      params: { userId: userId, bookId: bookId }
    });
  }
}
