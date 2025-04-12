import { Component } from '@angular/core';

@Component({
  selector: 'app-security-form',
  templateUrl: './security-form.component.html',
  styleUrls: ['./security-form.component.css'],
})
export class SecurityPrivacyComponent {
  email: string = 'nadja@siteemails.com.br';
  termsAccepted: boolean = false;
  promotionsAccepted: boolean = false;

  saveChanges() {
    console.log('Email:', this.email);
    console.log('Termos Aceitos:', this.termsAccepted);
    console.log('Promoções Aceitas:', this.promotionsAccepted);
  }
}
