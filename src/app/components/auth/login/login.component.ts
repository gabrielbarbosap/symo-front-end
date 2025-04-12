import { CommonModule, DecimalPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  NgpDialog,
  NgpDialogTitle,
  NgpDialogDescription,
  NgpDialogOverlay,
  injectDialogRef,
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
import { NgpInput } from 'ng-primitives/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';

type Flow = 'login' | 'forgot_password' | 'reset_password';

@Component({
  selector: 'app-login',
  imports: [
    NgpDialog,
    NgpDialogTitle,
    NgpDialogDescription,
    NgpDialogOverlay,
    NgpInput,
    DecimalPipe,
    NgpButton,
    NgIcon,
    SpinnerComponent,
    NgxMaskDirective,
    CommonModule,
    ReactiveFormsModule,
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
  providers: [provideNgxMask()],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected readonly dialogRef = injectDialogRef<string>();

  private authService = inject(AuthService);

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

  loginForm: FormGroup;
  isSubmitting = signal(false);

  toast = inject(HotToastService);

  constructor() {
    this.loginForm = new FormGroup({
      identifier: new FormControl('', [Validators.required]),
    });
  }

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

  ngOnInit(): void {
    console.log(this.dialogRef.data);
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

  close() {
    this.dialogRef.close();
    this.router.navigate([], { relativeTo: this.route, queryParams: { auth: undefined } });
  }

  goToRegister() {
    this.dialogRef.close();
    this.router.navigate([], { relativeTo: this.route, queryParams: { auth: 'register' } });
  }

  onSubmit() {
    const payload = {
      identifier: this.loginForm.value.identifier.replace(/\D/g, ''),
    };

    console.log(payload);

    this.authService.signin(payload).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        console.log(response);

        this.dialogRef.close();
      },
      error: (err) => {
        this.isSubmitting.set(false);
        console.error('Error signing in', err);
        this.toast.error('Ocorreu um erro ao fazer o login. Por favor tente novamente mais tarde');
      },
    });
  }
}
