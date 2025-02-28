import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-top-banner',
  imports: [ButtonComponent],
  templateUrl: './top-banner.component.html',
  styleUrl: './top-banner.component.css',
})
export class TopBannerComponent {}
