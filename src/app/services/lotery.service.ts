import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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

  generateOrder(bodyOrder: any): Observable<any> {
    const body = {
      id_rifa: bodyOrder.idRifa,
      quantidade: bodyOrder.quantidade,
      user_id: bodyOrder.userId || null,
    };

    return this.http.post(`${this.environment.apiUrl}/user/rifa/comprar/cota`, body).pipe(
      catchError((error) => {
        console.error('Erro no serviço generateOrder', error);
        return throwError(() => error);
      })
    );
  }

  paymentManual(idRifa: number, idPedido: number): Observable<any> {
    return this.http.post(`${this.environment.apiUrl}/resale/order/buy/confirm`, {
      rifa_id: idRifa,
      pedido_id: idPedido,
    });
  }

  updateOrder(pedidoId: number, quantidade: number, userId?: number): Observable<any> {
    const body = {
      quantidade_cota: quantidade,
      usu_id: userId,
    };

    return this.http.put(`${this.environment.apiUrl}/user/rifa/pedido/${pedidoId}`, body);
  }

  getQrCode(idRifa: number, idPedido: number): Observable<any> {
    return this.http.get(`${this.environment.apiUrl}/user/rifa/${idRifa}/pedido/${idPedido}/qrcode`);
  }

  getQuotasUser(): Observable<any> {
    return this.http.get(`${this.environment.apiUrl}/user/rifa/pedido`);
  }

  getResaleUsers(identifier: string): Observable<any> {
    const url = `${this.environment.apiUrl}/resale/get-users?identifier=${identifier}`;
    return this.http.get(url);
  }

  verifyPayment(idPedido: number): Observable<any> {
    return this.http.get(`${this.environment.apiUrl}/user/rifa/pedido/${idPedido}/pago`);
  }

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
