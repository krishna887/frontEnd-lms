import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  role: string='';
  loginObj: Login;

  constructor(private http: HttpClient, private router: Router, private route:ActivatedRoute) {
    this.loginObj = new Login();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.role = params['role'];
    });
  }

  onLogin() {
    const loginUrl = this.role === 'librarian' ? 'http://localhost:8080/librarian/login' : 'http://localhost:8080/student/login';

    this.http.post(loginUrl, this.loginObj, { observe: 'response' }).subscribe({

      next: (response: HttpResponse<any>) => {
        const token: any = response.headers.get('Authentication');
        if (token) {
          localStorage.setItem('token', token);
          alert('Login Success');
          const dashboardUrl = this.role === 'librarian' ? '/librarian-dashboard' : '/student-dashboard';
          this.router.navigateByUrl(dashboardUrl);
        } else {
          alert('Authentication token not found');
        }
      },
      error: (error) => {
        if (error.status === 403) {
          alert('Username or password do not match');
        } else {
          alert('An error occurred. Please try again later.');
        }
      }
    });
  }


}

export class Login {
  username: string;
  password: string;

  constructor() {
    this.username = '';
    this.password = '';
  }
}

