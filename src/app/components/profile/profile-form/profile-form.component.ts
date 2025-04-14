import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HotToastService } from '@ngxpert/hot-toast';
import { finalize } from 'rxjs';
import { AddressService, State, City, Address } from '../../../services/address.service';
import { AuthService, UpdateProfile } from '../../../services/auth.service';
import { SpinnerComponent } from '../../../shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { NgpButton } from 'ng-primitives/button';
import { NgpInput } from 'ng-primitives/input';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import {
  bootstrapX,
  bootstrapPerson,
  bootstrapCalendar,
  bootstrapChevronDown,
  bootstrapChevronLeft,
} from '@ng-icons/bootstrap-icons';
import { NgpDialogManager } from 'ng-primitives/dialog';
import { LogoutComponent } from '../../auth/logout/logout.component';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css'],
  imports: [
    SpinnerComponent,
    ReactiveFormsModule,
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
      bootstrapCalendar,
      bootstrapChevronDown,
      bootstrapChevronLeft,
    }),
  ],
  providers: [provideNgxMask()],
})
export class ProfileFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private addressService = inject(AddressService);
  private authService = inject(AuthService);
  private dialogManager = inject(NgpDialogManager);

  protected readonly TOGGLE_API_ADDRRES_SEARCH = false;

  profileForm: FormGroup;
  photoPreview = signal<string | null>(null);
  isLoadingZipCode = signal(false);
  isLoadingCities = signal(false);
  states = signal<State[]>([]);
  cities = signal<City[]>([]);

  showPassword = false;
  showConfirmPassword = false;

  isSubmitting = signal(false);

  isFetchingProfile = signal(false);

  toast = inject(HotToastService);

  constructor() {
    this.profileForm = this.fb.group({
      personalInfo: this.fb.group({
        fullName: ['', [Validators.required]],
        cpf: [{ value: '', disabled: true }, [Validators.required]],
        birthDate: ['', [Validators.required]],
        photo: [null],
      }),
      contactInfo: this.fb.group({
        email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
        phone: [{ value: '', disabled: true }, [Validators.required]],
        phoneConfirmation: [{ value: '', disabled: true }, [Validators.required]],
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

    this.profileForm.get('addressInfo.zipCode')?.valueChanges.subscribe((zipCode) => {
      if (zipCode && zipCode.length >= 8 && this.TOGGLE_API_ADDRRES_SEARCH) {
        this.searchAddressByZipCode(zipCode);
      }
    });

    this.profileForm.get('addressInfo.state')?.valueChanges.subscribe((state) => {
      if (state && this.TOGGLE_API_ADDRRES_SEARCH) {
        this.loadCities(state);
      }
    });
  }

  ngOnInit(): void {
    this.isFetchingProfile.set(true);

    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.profileForm.patchValue({
          personalInfo: {
            fullName: profile.nome,
            cpf: profile.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') ?? '',
            birthDate: profile.dataNascimento.split('T')?.[0]?.split('-').reverse().join('/') ?? '',
          },
          contactInfo: {
            email: profile.email,
            phone: profile.celular,
            phoneConfirmation: profile.celular,
          },
        });

        this.isFetchingProfile.set(false);
      },
      error: (error) => {
        this.isFetchingProfile.set(false);
        console.error('Error fetching profile:', error);
        this.toast.error('Ocorreu um erro ao buscar os dados, tente novamente mais tarde.');
      },
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      this.profileForm.get('personalInfo.photo')?.setValue(file);

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
          const addressGroup = this.profileForm.get('addressInfo');
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
    if (this.profileForm.valid) {
      this.isSubmitting.set(true);

      /*
      const phone = this.profileForm.value.contactInfo.phone;
      const phoneConfirmation = this.profileForm.value.contactInfo.phoneConfirmation;

      if (phone !== phoneConfirmation) {
        this.toast.info('Os telefones não conferem');
        this.isSubmitting.set(false);
        return;
      }
        */

      const formDate = this.profileForm.value.personalInfo.birthDate;
      let date = formDate.replace(/(\d{2})(\d{2})(\d{4})/, '$3-$2-$1');

      if (formDate.includes('/')) {
        date = formDate.split('/').reverse().join('-');
      }

      const payload: UpdateProfile = {
        user: {
          nome: this.profileForm.value.personalInfo.fullName,
          // celular: this.profileForm.value.contactInfo.phone,
          // cpf: this.profileForm.value.personalInfo.cpf,
          data_nascimento: date,
          // email: this.profileForm.value.contactInfo.email,
        },
      };

      if (this.profileForm.value.addressInfo.zipCode) {
        payload['endereco'] = {
          bairro: this.profileForm.value.addressInfo.neighborhood,
          cep: this.profileForm.value.addressInfo.zipCode,
          cidade: this.profileForm.value.city,
          uf: this.profileForm.value.state,
          complemento: this.profileForm.value.complement,
          ponto_referencia: this.profileForm.value.reference,
          logradouro: this.profileForm.value.street,
          numero: this.profileForm.value.number,
        };
      }

      this.authService.updateProfile(payload).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          this.toast.success('Dados alterados com sucesso');
        },
        error: (err) => {
          this.isSubmitting.set(false);
          console.error('Error updating profile', err);
          this.toast.error('Ocorreu um erro ao alterar os dados. Por favor tente novamente mais tarde');
        },
      });

      return;
    }

    Object.keys(this.profileForm.controls).forEach((key) => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();

      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach((childKey) => {
          control.get(childKey)?.markAsTouched();
        });
      }
    });

    this.toast.info('Formulário inválido. Verfique se os dados estão corretos');
  }

  logout() {
    this.dialogManager.open(LogoutComponent);
  }
}
