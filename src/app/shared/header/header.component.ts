import { Component, inject, OnInit } from '@angular/core';
import { TopBannerComponent } from '../top-banner/top-banner.component';
import { LoginComponent } from '../../components/auth/login/login.component';
import { NgpDialogManager } from 'ng-primitives/dialog';
import { RegisterComponent } from '../../components/auth/register/register.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  imports: [TopBannerComponent, LoginComponent, ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private dialogManager = inject(NgpDialogManager);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

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
}
