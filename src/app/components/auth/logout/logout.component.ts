import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  NgpDialog,
  NgpDialogTitle,
  NgpDialogDescription,
  NgpDialogOverlay,
  injectDialogRef,
} from 'ng-primitives/dialog';
import { NgpButton } from 'ng-primitives/button';
import { bootstrapX, bootstrapBoxArrowRight } from '@ng-icons/bootstrap-icons';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-logout',
  imports: [NgpDialog, NgpDialogTitle, NgpDialogDescription, NgpDialogOverlay, NgpButton, NgIcon, CommonModule],
  viewProviders: [provideIcons({ bootstrapX, bootstrapBoxArrowRight })],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected readonly dialogRef = injectDialogRef<string>();
  private authService = inject(AuthService);

  toast = inject(HotToastService);

  close() {
    this.dialogRef.close();
    this.router.navigate([], { relativeTo: this.route, queryParams: { auth: undefined } });
  }

  logout() {
    this.authService.logout();
    this.close();

    this.toast.success('Logout realizado com sucesso');
  }
}
