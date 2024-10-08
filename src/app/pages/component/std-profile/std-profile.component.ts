import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, forkJoin } from 'rxjs';
import { AuthService, JwtPayload } from '../../../core/service/auth.service';
import { BorrowRecord } from '../../../core/model/interceptor/BorrowRecord';
import { ReserveRecord } from '../../../core/model/interceptor/ReserveRecord';
import { UserDetail } from '../../../core/model/interceptor/UserDetails';

@Component({
  selector: 'app-std-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './std-profile.component.html',
  styleUrls: ['./std-profile.component.css'] 
})
export class StdProfileComponent implements OnInit {
  userDetails: UserDetail | null = null;
  borrowRecord: BorrowRecord[] = [];
  reserveRecord: ReserveRecord[] = [];

  user: JwtPayload | null = null;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.user = user;
      this.getUserDetailsAndRecords();
    });
  }

  getUserDetails(): Observable<UserDetail> {
    return this.http.get<any>(`http://localhost:8080/student/getUserDetailsByName/${this.user?.sub}`).pipe(
      map(response => response.data)
    );
  }

  getBorrowRecordByUserId(userId: number): Observable<BorrowRecord[]> {
    return this.http.get<any>(`http://localhost:8080/api/all_borrow_record?userId=${userId}`).pipe(
      map(response => response.data)
    );
  }

  getReserveRecordByUserId(userId: number): Observable<ReserveRecord[]> {
    return this.http.get<any>(`http://localhost:8080/api/all_reservation_record?userId=${userId}`).pipe(
      map(response => response.data)
    );
  }

  getUserDetailsAndRecords(): void {
    this.getUserDetails().pipe(
      switchMap(userDetails => {
        this.userDetails = userDetails;
        console.log(this.userDetails);
        return forkJoin([
          this.getBorrowRecordByUserId(userDetails.id),
          this.getReserveRecordByUserId(userDetails.id)
        ]);
      })
    ).subscribe(
      ([borrowRecords, reserveRecords]) => {
        this.borrowRecord = borrowRecords;
        this.reserveRecord = reserveRecords;
        console.log('Borrow Records:', this.borrowRecord);
        console.log('Reserve Records:', this.reserveRecord);
      },
      error => {
        console.error('Error fetching records', error);
      }
    );
  }
  payfine(id:number) {
   
    this.http.post(`http://localhost:8080/api/pay/fine?borrowId=${id}`, {}).subscribe((res:any) => {
      console.log(res.message);
      alert(res.message)
    }, error => {
      console.error('Error paying fine', error);
    });
  }
}


