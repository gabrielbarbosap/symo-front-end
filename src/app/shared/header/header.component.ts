import { Component, computed, inject, OnInit } from '@angular/core';
import { LoginComponent } from '../../components/auth/login/login.component';
import { NgpDialogManager } from 'ng-primitives/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { AuthService } from '../../services/auth.service';
import { LogoutComponent } from '../../components/auth/logout/logout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private dialogManager = inject(NgpDialogManager);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public authService = inject(AuthService);

  firstLetter = computed(() => {
    const profile = this.authService.profile();

    if (profile) {
      return (profile.nome.charAt(0) || profile.email.charAt(0)).toUpperCase();
    }

    return '';
  });

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['auth']) {
        switch (params['auth']) {
          case 'login':
          case 'reset_password':
            this.openLogin(params);
            break;
          case 'register':
            this.openRegister();
            break;
        }
      }
    });

    this.fetchProfile();
  }

  navigateTo(auth = 'login') {
    this.router.navigate([], { relativeTo: this.route, queryParams: { auth } });
  }

  openLogin(queryParams?: Params) {
    this.dialogManager.open(LoginComponent, { data: queryParams || {} });
  }

  openRegister() {
    this.dialogManager.open(RegisterComponent);
  }

  openProfile() {
    this.router.navigate(['/profile']);
  }

  openLogout() {
    this.dialogManager.open(LogoutComponent);
  }

  fetchProfile() {
    this.authService.getProfile().subscribe();
  }
}
