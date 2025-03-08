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

  registrationForm: FormGroup;
  photoPreview = signal<string | null>(null);
  isLoadingZipCode = signal(false);
  isLoadingCities = signal(false);
  states = signal<State[]>([]);
  cities = signal<City[]>([]);

  showPassword = false;
  showConfirmPassword = false;

  isSubmitting = signal(false);

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
      addressInfo: this.fb.group({
        zipCode: ['', [Validators.required]],
        street: ['', [Validators.required]],
        number: ['', [Validators.required]],
        complement: [''],
        neighborhood: ['', [Validators.required]],
        reference: [''],
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
      }),
      termsAgreed: [false, [Validators.requiredTrue]],
      marketingOptIn: [false],
    });

    this.loadStates();

    this.registrationForm.get('addressInfo.zipCode')?.valueChanges.subscribe((zipCode) => {
      if (zipCode && zipCode.length >= 8) {
        this.searchAddressByZipCode(zipCode);
      }
    });

    this.registrationForm.get('addressInfo.state')?.valueChanges.subscribe((state) => {
      if (state) {
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
              city: address.localidade,
            });

            this.loadCities(address.uf);
          }
        },
        error: (error) => {
          console.error('Error fetching address:', error);
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
      },
    });
  }

  loadCities(state: string): void {
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
        },
      });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Form valid', this.registrationForm.value);
    } else {
      Object.keys(this.registrationForm.controls).forEach((key) => {
        const control = this.registrationForm.get(key);
        control?.markAsTouched();

        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach((childKey) => {
            control.get(childKey)?.markAsTouched();
          });
        }
      });

      console.log('Form invalid');
    }
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
}
