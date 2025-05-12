import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [NgIf],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css',
})
export class ProgressComponent implements OnInit, OnDestroy {
  @Input() showProgress: boolean = true;
  @Input() dataSorteio: string | null = null;

  diasRestantes: number = 0;
  horas: string = '00';
  minutos: string = '00';
  segundos: string = '00';

  private intervalId: any;

  ngOnInit() {
    this.atualizarTempoRestante();
    this.intervalId = setInterval(() => {
      this.atualizarTempoRestante();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  private atualizarTempoRestante() {
    if (!this.dataSorteio) return;

    const agora = new Date();
    const sorteio = new Date(this.dataSorteio);
    const diffMs = sorteio.getTime() - agora.getTime();

    if (diffMs <= 0) {
      this.diasRestantes = 0;
      this.horas = this.minutos = this.segundos = '00';
      clearInterval(this.intervalId);
      return;
    }

    const totalSegundos = Math.floor(diffMs / 1000);
    const dias = Math.floor(totalSegundos / 86400);
    const horas = Math.floor((totalSegundos % 86400) / 3600);
    const minutos = Math.floor((totalSegundos % 3600) / 60);
    const segundos = totalSegundos % 60;

    this.diasRestantes = dias;
    this.horas = this.formatar(horas);
    this.minutos = this.formatar(minutos);
    this.segundos = this.formatar(segundos);
  }

  private formatar(valor: number): string {
    return valor < 10 ? '0' + valor : valor.toString();
  }
}
