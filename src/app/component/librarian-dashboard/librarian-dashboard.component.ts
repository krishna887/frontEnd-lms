import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-librarian-dashboard',
  standalone: true,
  imports: [FooterComponent, RouterOutlet,RouterLink,RouterLinkActive,],
  templateUrl: './librarian-dashboard.component.html',
  styleUrl: './librarian-dashboard.component.css'
})
export class LibrarianDashboardComponent {
  constructor(private router:Router,private authService:AuthService){}
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

logout(){
  
  
    // Clear session storage
    localStorage.clear();

    // Redirect to landing page
    this.router.navigate(['/home']); // Adjust the route to your actual landing page
  }
}


