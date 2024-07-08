import { CommonModule, JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Actor } from './actor';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule,CommonModule, JsonPipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  skills = ['Method Acting', 'Singing', 'Dancing', 'Swordfighting'];
  model = new Actor(18, 'Tom Cruise', this.skills[3], 'CW Productions');
  submitted = false;
  onSubmit() {
    this.submitted = true;
  }
 
}


