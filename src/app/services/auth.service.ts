import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of, tap, throwError } from 'rxjs';
import { ENVIRONMENT } from '../../environments/environment.token';

export interface Registration {
  user: {
    cpf: string;
    email: string;
    celular: string;
    data_nascimento: string;
    senha: string;
  };
  endereco?: {
    cep?: string;
    logradouro?: string;
    numero?: string;
    complemento?: string;
    bairro?: string;
    ponto_referencia?: string;
    uf?: number;
    cidade?: number;
  };
}

interface RegistrationResponse {
  cpf: string;
  email: string;
  celular: string;
  dataNascimento: string;
}

interface Login {
  identifier: string;
}

interface LoginResponse {
  type: string;
  name: string;
  token: string;
  abilities: string[];
  lastUsedAt: string;
  expiresAt: string;
}

// TODO: Modificar response
interface ProfileResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  cpf: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private environment = inject(ENVIRONMENT);

  public isFromRegister = signal(false);
  public phone = signal('');
  public password = signal('');

  public profile = signal<ProfileResponse | null>(null);
  public isLoggedIn = signal(false);

  signup(registration: Registration): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.environment.apiUrl}/signup`, registration);
  }

  signin(auth: Login): Observable<LoginResponse> {
    return of({
      type: 'Bearer',
      name: 'John Doe',
      token: '1234567890',
      abilities: ['read', 'write'],
      lastUsedAt: '2021-01-01 12:00:00',
      expiresAt: '2021-01-01 12:00:00',
    }).pipe(
      delay(2000),
      tap((response) => {
        localStorage.setItem('token', response.token);
      })
    );

    return this.http.post<LoginResponse>(`${this.environment.apiUrl}/auth`, auth).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  getProfile(): Observable<ProfileResponse> {
    if (localStorage.getItem('token')) {
      return of({
        id: 1,
        nome: 'John Doe',
        email: 'john.doe@example.com',
        telefone: '1234567890',
        dataNascimento: '2021-01-01',
        cpf: '1234567890',
      }).pipe(
        delay(2000),
        tap((response) => {
          this.profile.set(response);
          this.isLoggedIn.set(true);
        })
      );
    }

    return throwError(() => new Error('Token not found'));

    return this.http.get<ProfileResponse>(`${this.environment.apiUrl}/profile`).pipe(
      tap((response) => {
        this.profile.set(response);
        this.isLoggedIn.set(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.profile.set(null);
  }
}
