import { DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  NgpDialog,
  NgpDialogTitle,
  NgpDialogDescription,
  NgpDialogTrigger,
  NgpDialogOverlay,
} from 'ng-primitives/dialog';

@Component({
  selector: 'app-login',
  imports: [NgpDialog, NgpDialogTitle, NgpDialogDescription, NgpDialogTrigger, NgpDialogOverlay, DecimalPipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showPassword = false;
  subtotal = 2014.95;
  total = 1014.95;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
