import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ENVIRONMENT } from '../../environments/environment.token';

export interface Registration {
  user: {
    nome: string;
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

export interface UpdateProfile {
  user: {
    nome: string;
    cpf: string;
    email: string;
    celular: string;
    data_nascimento: string;
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

interface ProfileResponse {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  cpf: string;
  celular: string;
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
    return this.http.post<LoginResponse>(`${this.environment.apiUrl}/auth`, auth).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
        this.phone.set('');
        this.password.set('');
      })
    );
  }

  getProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${this.environment.apiUrl}/user/profile`).pipe(
      tap((response) => {
        this.profile.set(response);
        this.isLoggedIn.set(true);
      })
    );
  }

  updateProfile(profile: UpdateProfile): Observable<ProfileResponse> {
    return this.http.put<ProfileResponse>(`${this.environment.apiUrl}/user/profile`, profile);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
    this.profile.set(null);
    this.phone.set('');
    this.password.set('');
  }
}
