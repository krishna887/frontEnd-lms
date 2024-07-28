import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode, { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<JwtPayload | null>(null);
  public user$: Observable<JwtPayload | null> = this.userSubject.asObservable();
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  constructor(private http:HttpClient ) {
    
    this.loadUserData()
  }

  getUserData(): JwtPayload | null {
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token)
    }
    return null;
  }
  private loadUserData() {
    const userData = this.getUserData();
    if (userData) {
      this.userSubject.next(userData);
    }
  }
 
}
export interface JwtPayload {
  sub:string
}
