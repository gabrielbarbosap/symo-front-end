import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ENVIRONMENT } from '../../environments/environment.token';

export interface LoteryUser {
  id: number;
  email: string;
  cpf: string;
  celular: string;
  dataNascimento: string;
  createdAt: string;
  senha: string;
  cliId: string;
  nome: string | null;
}

export interface LoteryPrizeNumber {
  id: number;
  rifaId: number;
  numero: number;
  descricao: string;
  usuId: number | null;
  user: LoteryUser | null;
}

export interface LoteryImage {
  id: number;
  rifaId: number;
  img: string;
  position: number | null;
}

export interface LoteryItem {
  id: number;
  descricao: string;
  numeroInicial: number;
  numeroFinal: number;
  status: string;
  valor: number;
  ativo: string;
  dataSorteio: string | null;
  createdAt: string;
  updatedAt: string;
  cliId: number;
  posicao: number | null;
  imagens: LoteryImage[];
  numeros_premiado: LoteryPrizeNumber[];
}

export interface LoteryMeta {
  total: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  firstPage: number;
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
}

export interface LoteryResponse {
  meta: LoteryMeta;
  data: LoteryItem[];
}

@Injectable({
  providedIn: 'root',
})
export class LoteryService {
  private http = inject(HttpClient);
  private environment = inject(ENVIRONMENT);

  public loteries = signal<LoteryItem[]>([]);
  public isLoading = signal(false);

  getLoteries(page: number = 1): Observable<LoteryResponse> {
    this.isLoading.set(true);

    return new Observable((observer) => {
      this.http.get<LoteryResponse>(`${this.environment.apiUrl}/user/rifa/?page=${page}`).subscribe({
        next: (response) => {
          this.loteries.set(response.data);
          this.isLoading.set(false);
          observer.next(response);
          observer.complete();
        },
        error: (error) => {
          this.isLoading.set(false);
          observer.error(error);
        },
      });
    });
  }
}
