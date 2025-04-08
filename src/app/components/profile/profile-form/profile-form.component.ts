import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
})
export class ProfileFormComponent {
  profile = {
    name: '',
    cpf: '',
    birthDate: '',
    email: '',
    phone: '',
    confirmPhone: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    reference: '',
    state: '',
    city: '',
  };
}
