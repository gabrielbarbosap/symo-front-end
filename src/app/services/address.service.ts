import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Address {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export interface State {
  id: number;
  uf: string;
  name: string;
}

export interface City {
  id: number;
  name: string;
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
      localidade: 'São Paulo',
      uf: 'SP',
      ibge: '3550308',
      gia: '1004',
      ddd: '11',
      siafi: '7107',
    };

    return of(mockAddress).pipe(delay(1000));
  }

  getStates(): Observable<State[]> {
    // return this.http.get<Estado[]>(this.apiEstados);

    const states: State[] = [
      { id: 1, uf: 'AC', name: 'Acre' },
      { id: 2, uf: 'AL', name: 'Alagoas' },
      { id: 3, uf: 'AM', name: 'Amazonas' },
      { id: 4, uf: 'AP', name: 'Amapá' },
      { id: 5, uf: 'BA', name: 'Bahia' },
      { id: 6, uf: 'CE', name: 'Ceará' },
      { id: 7, uf: 'DF', name: 'Distrito Federal' },
      { id: 8, uf: 'ES', name: 'Espírito Santo' },
      { id: 9, uf: 'GO', name: 'Goiás' },
      { id: 10, uf: 'MA', name: 'Maranhão' },
      { id: 11, uf: 'MG', name: 'Minas Gerais' },
      { id: 12, uf: 'MS', name: 'Mato Grosso do Sul' },
      { id: 13, uf: 'MT', name: 'Mato Grosso' },
      { id: 14, uf: 'PA', name: 'Pará' },
      { id: 15, uf: 'PB', name: 'Paraíba' },
      { id: 16, uf: 'PE', name: 'Pernambuco' },
      { id: 17, uf: 'PI', name: 'Piauí' },
      { id: 18, uf: 'PR', name: 'Paraná' },
      { id: 19, uf: 'RJ', name: 'Rio de Janeiro' },
      { id: 20, uf: 'RN', name: 'Rio Grande do Norte' },
      { id: 21, uf: 'RO', name: 'Rondônia' },
      { id: 22, uf: 'RR', name: 'Roraima' },
      { id: 23, uf: 'RS', name: 'Rio Grande do Sul' },
      { id: 24, uf: 'SC', name: 'Santa Catarina' },
      { id: 25, uf: 'SE', name: 'Sergipe' },
      { id: 26, uf: 'SP', name: 'São Paulo' },
      { id: 27, uf: 'TO', name: 'Tocantins' },
    ];

    return of(states).pipe(delay(500));
  }

  getCitiesByState(uf: string): Observable<City[]> {
    // return this.http.get<Cidade[]>(`${this.apiCidades}/${uf}`);

    const stateId = this.getStateIdByUf(uf);

    const cities = this.generateCitiesMock(stateId);

    return of(cities).pipe(delay(1000));
  }

  private getStateIdByUf(uf: string): number {
    const data: { [key: string]: number } = {
      AC: 1,
      AL: 2,
      AM: 3,
      AP: 4,
      BA: 5,
      CE: 6,
      DF: 7,
      ES: 8,
      GO: 9,
      MA: 10,
      MG: 11,
      MS: 12,
      MT: 13,
      PA: 14,
      PB: 15,
      PE: 16,
      PI: 17,
      PR: 18,
      RJ: 19,
      RN: 20,
      RO: 21,
      RR: 22,
      RS: 23,
      SC: 24,
      SE: 25,
      SP: 26,
      TO: 27,
    };

    return data[uf] || 0;
  }

  private generateCitiesMock(stateId: number): City[] {
    const citiesByState: { [key: number]: City[] } = {
      26: [
        { id: 1, name: 'São Paulo', state_id: 26 },
        { id: 2, name: 'Campinas', state_id: 26 },
        { id: 3, name: 'Santos', state_id: 26 },
        { id: 4, name: 'Ribeirão Preto', state_id: 26 },
        { id: 5, name: 'São José dos Campos', state_id: 26 },
      ],
      19: [
        { id: 6, name: 'Rio de Janeiro', state_id: 19 },
        { id: 7, name: 'Niterói', state_id: 19 },
        { id: 8, name: 'Petrópolis', state_id: 19 },
        { id: 9, name: 'Volta Redonda', state_id: 19 },
        { id: 10, name: 'Duque de Caxias', state_id: 19 },
      ],
      11: [
        { id: 11, name: 'Belo Horizonte', state_id: 11 },
        { id: 12, name: 'Uberlândia', state_id: 11 },
        { id: 13, name: 'Contagem', state_id: 11 },
        { id: 14, name: 'Juiz de Fora', state_id: 11 },
        { id: 15, name: 'Betim', state_id: 11 },
      ],
    };

    return citiesByState[stateId] || [];
  }
}
