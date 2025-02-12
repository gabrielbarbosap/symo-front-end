import { CommonModule, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  NgpDialog,
  NgpDialogTitle,
  NgpDialogDescription,
  NgpDialogTrigger,
  NgpDialogOverlay,
} from 'ng-primitives/dialog';
import { NgpButton } from 'ng-primitives/button';
import { bootstrapInfoCircleFill } from '@ng-icons/bootstrap-icons';

@Component({
  selector: 'app-login',
  imports: [
    NgpDialog,
    NgpDialogTitle,
    NgpDialogDescription,
    NgpDialogTrigger,
    NgpDialogOverlay,
    DecimalPipe,
    NgpButton,
    NgIcon,
    CommonModule,
  ],
  viewProviders: [provideIcons({ bootstrapInfoCircleFill })],
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

  currentFlow: 'login' | 'forgot_password' | 'reset_password' = 'forgot_password';

  isEmailSent = true;
  emailSent = 'r4*****@h****.com.br';

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
