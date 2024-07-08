import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-get-api',
  standalone: true,
  imports: [JsonPipe, RouterOutlet,RouterLink, RouterLinkActive],
  templateUrl: './get-api.component.html',
  styleUrl: './get-api.component.css'
})
export class GetApiComponent {
  constructor(private http:HttpClient){
    
  }
  // this method is similar to constructor method we can do both of the method
  // http1= inject(HttpClient)
  userList:any[]=[];
  getAllUser(){
    this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe((result:any)=>{
      this.userList=result

    })
  }

}
