import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-footer',
  imports: [ButtonComponent, NavigationComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {}
