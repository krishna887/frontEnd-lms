import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SpinnnerComponent } from './pages/component/spinnner/spinnner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,RouterLink ,RouterLinkActive,SpinnnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'library_management_system_frontend';
  

}
