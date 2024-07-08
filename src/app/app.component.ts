import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FormComponent } from './component/form/form.component';
import { FormPracticeComponent } from './component/form-practice/form-practice.component';
import { ReactiveFormComponent } from './component/reactive-form/reactive-form.component';
import { GetApiComponent } from './component/get-api/get-api.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormComponent,FormPracticeComponent,ReactiveFormComponent,GetApiComponent,RouterLink,RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'library_management_system_frontend';
}
