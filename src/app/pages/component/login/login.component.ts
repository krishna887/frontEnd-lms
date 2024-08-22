import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Login } from '../../../core/model/class/Login';
import { CommonModule } from '@angular/common';
import { AuthService, JwtPayload } from '../../../core/service/auth.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers : [ ToastrService ]
})
export class LoginComponent  {
  role: string='';
  loginObj: Login;
  user:JwtPayload | null= null

  constructor(private http: HttpClient, private router: Router, private route:ActivatedRoute,
    private authService:AuthService,
    private toaster:ToastrService) {
    this.loginObj = new Login();
  }

 

  onLogin() {
    this.http.post('http://localhost:8080/librarian/login', this.loginObj, { observe: 'response' }).subscribe({

      next: (response: HttpResponse<any>) => {
        const token: any = response.headers.get('Authentication');
        if (token) {
          localStorage.setItem('token', token);
          
          this.toaster.show("Login Success");
          // alert('Login Success');
         this.authService.user$.subscribe(user=>this.user=user)
         if(this.user?.sub=='admin'){
                    this.router.navigateByUrl('/librarian-dashboard');
          }
         else{
          this.router.navigateByUrl('/student-dashboard');

         }
         console.log(this.user?.sub)
          
        } else {
          this.toaster.show('Authentication token not found');
        }
      },
      error: (error) => {
        if (error.status === 403) {
          this.toaster.show('Username or password do not match');
        } else {
          this.toaster.show('An error occurred. Please try again later.');
        }
      }
    });
  }


}

