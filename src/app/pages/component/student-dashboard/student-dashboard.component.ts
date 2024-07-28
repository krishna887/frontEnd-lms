import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/service/auth.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [FooterComponent,RouterLink,RouterOutlet,],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
  constructor(private authService: AuthService,
    private router:Router){

  }
  logout(){
  
  
    // Clear session storage
    localStorage.clear();

    // Redirect to landing page
    this.router.navigate(['/home']); // Adjust the route to your actual home page
  }

}
