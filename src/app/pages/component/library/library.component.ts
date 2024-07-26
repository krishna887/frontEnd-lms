import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Book } from '../../../core/model/interceptor/Book';
import { BorrowRecord } from '../../../core/model/interceptor/BorrowRecord';
import { UserDetail } from '../../../core/model/interceptor/UserDetails';
import { BookRecordComponent } from '../book-record/book-record.component';
import { LibraryService } from '../../../core/service/library.service';
import { AuthService, JwtPayload } from '../../../core/service/auth.service';
import { BookService } from '../../../core/service/book.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css']
})
export class LibraryComponent implements OnInit {

  booksInCart: Book[] = [];
  filteredBooks: Book[] = [];
  borrowRecords: BorrowRecord[] = [];
  searchQuery = '';
  userId: number | null = null;
  userDetails: UserDetail | null = null;

  constructor(
    private bookService: BookService,
    private libraryService: LibraryService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.authService.user$.pipe(
      switchMap((user: JwtPayload | null) => {
        if (user) {
          return this.getUserDetails(user.sub);
        } else {
          throw new Error('User not logged in');
        }
      })
    ).subscribe(
      userDetails => {
        this.userDetails = userDetails;
        this.userId = userDetails.id;
        console.log('User ID:', this.userId);
        this.fetchBooks();
        this.fetchBorrowRecord();
      },
      error => {
        console.error('Error fetching user details', error);
      }
    );
  }

  getUserDetails(username: string): Observable<UserDetail> {
    return this.http.get<any>(`http://localhost:8080/student/getUserDetailsByName/${username}`).pipe(
      map(response => response.data)
    );
  }

  fetchBooks(): void {
    this.bookService.getBooks().subscribe((data: Book[]) => {
      this.booksInCart = data;
      this.filteredBooks = this.booksInCart;
      console.log(this.booksInCart);
    });
  }

  filterBooks(): void {
    this.filteredBooks = this.booksInCart.filter(book =>
      book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      book.isbn.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    console.log('Filtered Books:', this.filteredBooks);
  }

  fetchBorrowRecord(): void {
    if (this.userId !== null) {
      this.bookService.getBorrowRecords().subscribe((data: BorrowRecord[]) => {
        this.borrowRecords = data;
        console.log(this.borrowRecords);
      });
    }
  }

  borrowBook(book: any): void {
    if (this.userId !== null) {
      this.libraryService.borrowBook(this.userId, book.id).subscribe(
        response => {
          alert("book Borrowed Success!")
          console.log('Book borrowed successfully', response);
        },
        error => {
        console.error('Error borrowing book', error);
        }
        );
      } else {
      console.error('User ID is null, cannot borrow book.');
    }
  }

  returnBook(book: any): void {
    if (this.userId !== null) {
      
      this.libraryService.returnBook(this.userId, book.id).subscribe(
        response => {
          alert("book Return Success!")
          console.log('Book returned successfully', response);
        },
        error => {
          alert("Error Returning book")
          console.error('Error returning book', error);
        }
      );
    } else {
      console.error('User ID is null, cannot return book.');
    }
  }

  reserveBook(book: any): void {
    if (this.userId !== null) {
      this.libraryService.reserveBook(this.userId, book.id).subscribe(
        response => {
          alert("book Reserved Success!")
          console.log('Book reserved successfully', response);
        },
        error => {
          console.error('Error reserving book', error);
        }
      );
    } else {
      console.error('User ID is null, cannot reserve book.');
    }
  }


}
