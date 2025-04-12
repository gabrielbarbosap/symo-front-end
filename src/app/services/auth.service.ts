import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private environment = inject(ENVIRONMENT);

  public isFromRegister = signal(false);
  public phone = signal('');
  public password = signal('');

  signup(registration: Registration): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.environment.apiUrl}/signup`, registration);
  }

  signin(auth: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.environment.apiUrl}/auth`, auth);
  }
}
