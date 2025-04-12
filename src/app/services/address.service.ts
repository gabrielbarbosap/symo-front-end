import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Address {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  ponto_referencia: string;
  uf: number;
  cidade: number;
}

export interface State {
  id: number;
  uf: string;
  nome: string;
}

export interface City {
  id: number;
  nome: string;
  state_id: number;
}

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private http = inject(HttpClient);

  private apiCep = 'https://viacep.com.br/ws';
  private apiStates = '/api/estados';
  private apiCities = '/api/cidades';

  getAddessByCep(cep: string): Observable<Address> {
    // return this.http.get<Address>(`${this.apiCep}/${cep}/json`);

    const mockAddress: Address = {
      cep: cep,
      logradouro: 'Avenida Paulista',
      complemento: '',
      bairro: 'Bela Vista',
      uf: 1,
      cidade: 1,
      numero: 'S/N',
      ponto_referencia: '',
    };

    return of(mockAddress).pipe(delay(1000));
  }

  getStates(): Observable<State[]> {
    // return this.http.get<Estado[]>(this.apiEstados);

    const states: State[] = [
      { id: 1, uf: 'AC', nome: 'Acre' },
      { id: 2, uf: 'AL', nome: 'Alagoas' },
      { id: 3, uf: 'AM', nome: 'Amazonas' },
      { id: 4, uf: 'AP', nome: 'Amapá' },
      { id: 5, uf: 'BA', nome: 'Bahia' },
      { id: 6, uf: 'CE', nome: 'Ceará' },
      { id: 7, uf: 'DF', nome: 'Distrito Federal' },
      { id: 8, uf: 'ES', nome: 'Espírito Santo' },
      { id: 9, uf: 'GO', nome: 'Goiás' },
      { id: 10, uf: 'MA', nome: 'Maranhão' },
      { id: 11, uf: 'MG', nome: 'Minas Gerais' },
      { id: 12, uf: 'MS', nome: 'Mato Grosso do Sul' },
      { id: 13, uf: 'MT', nome: 'Mato Grosso' },
      { id: 14, uf: 'PA', nome: 'Pará' },
      { id: 15, uf: 'PB', nome: 'Paraíba' },
      { id: 16, uf: 'PE', nome: 'Pernambuco' },
      { id: 17, uf: 'PI', nome: 'Piauí' },
      { id: 18, uf: 'PR', nome: 'Paraná' },
      { id: 19, uf: 'RJ', nome: 'Rio de Janeiro' },
      { id: 20, uf: 'RN', nome: 'Rio Grande do Norte' },
      { id: 21, uf: 'RO', nome: 'Rondônia' },
      { id: 22, uf: 'RR', nome: 'Roraima' },
      { id: 23, uf: 'RS', nome: 'Rio Grande do Sul' },
      { id: 24, uf: 'SC', nome: 'Santa Catarina' },
      { id: 25, uf: 'SE', nome: 'Sergipe' },
      { id: 26, uf: 'SP', nome: 'São Paulo' },
      { id: 27, uf: 'TO', nome: 'Tocantins' },
    ];

    return of(states).pipe(delay(500));
  }

  getCitiesByState(uf: number): Observable<City[]> {
    // return this.http.get<Cidade[]>(`${this.apiCidades}/${uf}`);
    const cities = this.generateCitiesMock(uf);

    return of(cities).pipe(delay(1000));
  }

  private generateCitiesMock(stateId: number): City[] {
    const citiesByState: { [key: number]: City[] } = {
      26: [
        { id: 1, nome: 'São Paulo', state_id: 26 },
        { id: 2, nome: 'Campinas', state_id: 26 },
        { id: 3, nome: 'Santos', state_id: 26 },
        { id: 4, nome: 'Ribeirão Preto', state_id: 26 },
        { id: 5, nome: 'São José dos Campos', state_id: 26 },
      ],
      19: [
        { id: 6, nome: 'Rio de Janeiro', state_id: 19 },
        { id: 7, nome: 'Niterói', state_id: 19 },
        { id: 8, nome: 'Petrópolis', state_id: 19 },
        { id: 9, nome: 'Volta Redonda', state_id: 19 },
        { id: 10, nome: 'Duque de Caxias', state_id: 19 },
      ],
      11: [
        { id: 11, nome: 'Belo Horizonte', state_id: 11 },
        { id: 12, nome: 'Uberlândia', state_id: 11 },
        { id: 13, nome: 'Contagem', state_id: 11 },
        { id: 14, nome: 'Juiz de Fora', state_id: 11 },
        { id: 15, nome: 'Betim', state_id: 11 },
      ],
    };

    return citiesByState[stateId] || [];
  }
}
