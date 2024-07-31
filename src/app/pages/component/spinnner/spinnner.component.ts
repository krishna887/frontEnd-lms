import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from '../../../core/service/loader.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-spinnner',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './spinnner.component.html',
  styleUrl: './spinnner.component.css',
  encapsulation:ViewEncapsulation.ShadowDom
})
export class SpinnnerComponent {
  constructor(public loader: LoaderService) { }

}
