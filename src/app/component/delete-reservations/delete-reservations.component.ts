import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-delete-reservations',
  standalone: true,
  imports: [],
  templateUrl: './delete-reservations.component.html',
  styleUrl: './delete-reservations.component.css'
})
export class DeleteReservationsComponent implements OnInit {
  constructor(
    private http:HttpClient,
    private route:ActivatedRoute,
    private router: Router){}
  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');

    this.http.post(`http://localhost:8080/api/reserve/cancel/${bookId}`,{})
    .pipe(map((response:any)=>response.data))
    .subscribe((book:any)=>{
      console.log(book)
    })
    this.router.navigate(['/librarian-dashboard/reservation-record'])
    
  }

}
