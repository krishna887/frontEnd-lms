import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Route, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-librarian-dashboard',
  standalone: true,
  imports: [FooterComponent, RouterOutlet,RouterLink,RouterLinkActive,],
  templateUrl: './librarian-dashboard.component.html',
  styleUrl: './librarian-dashboard.component.css'
})
export class LibrarianDashboardComponent {
  constructor(private router:Router,private authService:AuthService){}
  
 

logout(){
  
  
    // Clear session storage
    localStorage.clear();

    // Redirect to landing page
    this.router.navigate(['/home']);
  }
}


