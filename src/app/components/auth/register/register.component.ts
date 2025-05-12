import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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
  bootstrapX,
  bootstrapPerson,
  bootstrapEyeFill,
  bootstrapEyeSlashFill,
  bootstrapCalendar,
  bootstrapChevronDown,
} from '@ng-icons/bootstrap-icons';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { NgpInput } from 'ng-primitives/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { AddressService, State, City, Address } from '../../../services/address.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngxpert/hot-toast';
import { AuthService, Registration } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NgpDialog,
    NgpDialogTitle,
    NgpDialogDescription,
    NgpDialogOverlay,
    NgpInput,
    NgpButton,
    NgIcon,
    // NgpSelect,
    SpinnerComponent,
    NgxMaskDirective,
    CommonModule,
  ],
  viewProviders: [
    provideIcons({
      bootstrapX,
      bootstrapPerson,
      bootstrapEyeFill,
      bootstrapEyeSlashFill,
      bootstrapCalendar,
      bootstrapChevronDown,
    }),
  ],
  providers: [provideNgxMask()],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private addressService = inject(AddressService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  protected readonly dialogRef = injectDialogRef<string>();
  private authService = inject(AuthService);

  protected readonly TOGGLE_API_ADDRRES_SEARCH = false;

  registrationForm: FormGroup;
  photoPreview = signal<string | null>(null);
  isLoadingZipCode = signal(false);
  isLoadingCities = signal(false);
  states = signal<State[]>([]);
  cities = signal<City[]>([]);

  showPassword = false;
  showConfirmPassword = false;

  isSubmitting = signal(false);

  toast = inject(HotToastService);

  constructor() {
    this.registrationForm = this.fb.group({
      personalInfo: this.fb.group({
        fullName: ['', [Validators.required]],
        cpf: ['', [Validators.required]],
        birthDate: ['', [Validators.required]],
        photo: [null],
      }),
      contactInfo: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required]],
        phoneConfirmation: ['', [Validators.required]],
      }),
      accessInfo: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        passwordConfirmation: ['', [Validators.required]],
      }),
      // Validators.required
      addressInfo: this.fb.group({
        zipCode: ['', []],
        street: ['', []],
        number: ['', []],
        complement: [''],
        neighborhood: ['', []],
        reference: [''],
        state: [null, []],
        city: [null, []],
      }),
      termsAgreed: [false, [Validators.requiredTrue]],
      marketingOptIn: [false],
    });

    // this.loadStates();

    this.registrationForm.get('addressInfo.zipCode')?.valueChanges.subscribe((zipCode) => {
      if (zipCode && zipCode.length >= 8 && this.TOGGLE_API_ADDRRES_SEARCH) {
        this.searchAddressByZipCode(zipCode);
      }
    });

    this.registrationForm.get('addressInfo.state')?.valueChanges.subscribe((state) => {
      if (state && this.TOGGLE_API_ADDRRES_SEARCH) {
        this.loadCities(state);
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.registrationForm.get('personalInfo.photo')?.setValue(file);

      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview.set(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  searchAddressByZipCode(zipCode: string): void {
    const cleanZipCode = zipCode.replace(/\D/g, '');

    if (cleanZipCode.length !== 8) return;

    this.isLoadingZipCode.set(true);

    this.addressService
      .getAddessByCep(zipCode)
      .pipe(finalize(() => this.isLoadingZipCode.set(false)))
      .subscribe({
        next: (address: Address) => {
          const addressGroup = this.registrationForm.get('addressInfo');
          if (addressGroup) {
            addressGroup.patchValue({
              street: address.logradouro,
              neighborhood: address.bairro,
              state: address.uf,
              city: address.cidade,
            });

            this.loadCities(address.uf);
          }
        },
        error: (error) => {
          console.error('Error fetching address:', error);
          this.toast.error('Ocorreu um erro ao buscar os dados, tente novamente mais tarde.');
        },
      });
  }

  loadStates(): void {
    this.addressService.getStates().subscribe({
      next: (states: State[]) => {
        this.states.set(states);
      },
      error: (error) => {
        console.error('Error loading states:', error);
        this.toast.error('Ocorreu um erro ao carregar os estados, tente novamente mais tarde.');
      },
    });
  }

  loadCities(state: number): void {
    this.isLoadingCities.set(true);

    this.addressService
      .getCitiesByState(state)
      .pipe(finalize(() => this.isLoadingCities.set(false)))
      .subscribe({
        next: (cities: City[]) => {
          this.cities.set(cities);
        },
        error: (error) => {
          console.error('Error loading cities:', error);
          this.toast.error('Ocorreu um erro ao carregar as cidade, tente novamente mais tarde.');
        },
      });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.isSubmitting.set(true);

      const password = this.registrationForm.value.accessInfo.password;
      const confirmPassword = this.registrationForm.value.accessInfo.passwordConfirmation;

      if (password !== confirmPassword) {
        this.toast.info('As senhas não conferem');
        this.isSubmitting.set(false);
        return;
      }

      const phone = this.registrationForm.value.contactInfo.phone;
      const phoneConfirmation = this.registrationForm.value.contactInfo.phoneConfirmation;

      if (phone !== phoneConfirmation) {
        this.toast.info('Os telefones não conferem');
        this.isSubmitting.set(false);
        return;
      }

      const formDate = this.registrationForm.value.personalInfo.birthDate;
      const date = formDate.replace(/(\d{2})(\d{2})(\d{4})/, '$3-$2-$1');
      const typeUser = localStorage.getItem('type_user') || 'U';

      const payload: Registration = {
        user: {
          nome: this.registrationForm.value.personalInfo.fullName,
          celular: this.registrationForm.value.contactInfo.phone,
          cpf: this.registrationForm.value.personalInfo.cpf,
          data_nascimento: date,
          email: this.registrationForm.value.contactInfo.email,
          senha: this.registrationForm.value.accessInfo.password,
          tipo: typeUser,
        },
      };

      if (this.registrationForm.value.addressInfo.zipCode) {
        payload['endereco'] = {
          bairro: this.registrationForm.value.addressInfo.neighborhood,
          cep: this.registrationForm.value.addressInfo.zipCode,
          cidade: this.registrationForm.value.city,
          uf: this.registrationForm.value.state,
          complemento: this.registrationForm.value.complement,
          ponto_referencia: this.registrationForm.value.reference,
          logradouro: this.registrationForm.value.street,
          numero: this.registrationForm.value.number,
        };
      }

      this.authService.signup(payload).subscribe({
        next: () => {
          this.isSubmitting.set(false);

          this.authService.phone.set(this.registrationForm.value.contactInfo.phone);
          this.authService.isFromRegister.set(true);

          this.toast.success('Cadastro realizado com sucesso');

          this.goToLogin();
        },
        error: (err) => {
          this.isSubmitting.set(false);
          console.error('Error registering', err);
          this.toast.error('Ocorreu um erro ao fazer o cadastro. Por favor tente novamente mais tarde');
        },
      });

      return;
    }

    Object.keys(this.registrationForm.controls).forEach((key) => {
      const control = this.registrationForm.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((childKey) => {
          control.get(childKey)?.markAsTouched();
        });
      }
    });

    this.toast.info('Formulário inválido. Verfique se os dados estão corretos');
  }

  togglePasswordVisibility(type: 'password' | 'confirm_password' = 'password'): void {
    if (type === 'password') {
      this.showPassword = !this.showPassword;
      return;
    }

    this.showConfirmPassword = !this.showConfirmPassword;
  }

  close() {
    this.dialogRef.close();
    this.router.navigate([], { relativeTo: this.route, queryParams: { auth: undefined } });
  }

  goToLogin() {
    this.dialogRef.close();
    this.router.navigate([], { relativeTo: this.route, queryParams: { auth: 'login' } });
  }
}
