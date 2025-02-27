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
import {
  bootstrapInfoCircleFill,
  bootstrapX,
  bootstrapPerson,
  bootstrapBracesAsterisk,
  bootstrapEyeFill,
  bootstrapEyeSlashFill,
  bootstrapPhone,
  bootstrapApple,
  bootstrapGoogle,
  bootstrapFacebook,
} from '@ng-icons/bootstrap-icons';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';

type Flow = 'login' | 'forgot_password' | 'reset_password';

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
    SpinnerComponent,
  ],
  viewProviders: [
    provideIcons({
      bootstrapInfoCircleFill,
      bootstrapX,
      bootstrapPerson,
      bootstrapBracesAsterisk,
      bootstrapEyeFill,
      bootstrapEyeSlashFill,
      bootstrapPhone,
      bootstrapApple,
      bootstrapGoogle,
      bootstrapFacebook,
    }),
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

  currentFlow: Flow = 'login';

  isEmailSent = false;
  emailSent = 'r4*****@h****.com.br';

  socialLogin: 'facebook' | 'google' | 'apple' | '' = '';

  closeDialog() {
    this.currentFlow = 'login';
  }

  get modalTitle() {
    const titles: Record<Flow, string> = {
      login: 'Login',
      forgot_password: 'Esqueci minha senha',
      reset_password: 'Reset de senha',
    };

    return titles[this.currentFlow];
  }

  get modalIcon() {
    const icons: Record<Flow, string> = {
      login: 'bootstrapPerson',
      forgot_password: 'bootstrapBracesAsterisk',
      reset_password: 'bootstrapBracesAsterisk',
    };

    return icons[this.currentFlow];
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

  toggleFlow(flow: Flow) {
    this.currentFlow = flow;
  }
}
