import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-librarian-dashboard',
  standalone: true,
  imports: [FooterComponent, RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './librarian-dashboard.component.html',
  styleUrl: './librarian-dashboard.component.css'
})
export class LibrarianDashboardComponent {
  constructor(private router:Router){}
  // navigateToRegisterStudent(){
  //   this.router.navigateByUrl('/register-student')
  // }
  navigateToBookRecord(){

  }
  navigateToBorrowRecord(){

  }
navigateToReservationRecord(){

}
navigationToFineRecord(){

}

}
