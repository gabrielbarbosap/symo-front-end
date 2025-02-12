import { CommonModule, DecimalPipe } from '@angular/common';
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
  imports: [
    NgpDialog,
    NgpDialogTitle,
    NgpDialogDescription,
    NgpDialogTrigger,
    NgpDialogOverlay,
    DecimalPipe,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  showPassword = false;
  showResetPassword = false;
  showConfirmResetPassword = false;
  subtotal = 2014.95;
  total = 1014.95;

  hasCheckout = false;

  currentFlow: 'login' | 'forgot_password' | 'reset_password' = 'reset_password';

  get modalTitle() {
    const titles = {
      login: 'Login',
      forgot_password: 'Esqueci minha senha',
      reset_password: 'Reset de senha',
    };

    return titles[this.currentFlow];
  }

  get contentTitle() {
    if (this.hasCheckout) {
      return 'Finalize sua compra';
    }

    return 'Acesse sua conta';
  }

  togglePasswordVisibility(type: 'login' | 'reset' | 'confirm_reset' = 'login'): void {
    if (type === 'login') {
      this.showPassword = !this.showPassword;
      return;
    }

    if (type === 'reset') {
      this.showResetPassword = !this.showResetPassword;
      return;
    }

    this.showConfirmResetPassword = !this.showConfirmResetPassword;
  }
}
