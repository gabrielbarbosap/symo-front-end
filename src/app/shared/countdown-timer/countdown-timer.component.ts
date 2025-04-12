import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.css'],
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input() endDate!: string; // Data final como string (Formato: "YYYY-MM-DD HH:mm:ss")
  @Output() countdownFinished = new EventEmitter<void>(); // Evento emitido quando o tempo acabar

  days: number = 0;
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;

  private timerInterval: any;

  ngOnInit() {
    if (!this.isValidDate(this.endDate)) {
      console.error('Data final inválida:', this.endDate);
      return;
    }

    this.startCountdown();
  }

  ngOnDestroy() {
    this.clearTimer();
  }

  startCountdown() {
    this.updateTime(); // Atualiza imediatamente

    this.timerInterval = setInterval(() => {
      this.updateTime();
    }, 1000);
  }

  updateTime() {
    const now = new Date().getTime();
    const targetTime = new Date(this.endDate).getTime();
    const timeDiff = targetTime - now;

    if (timeDiff <= 0) {
      this.clearTimer();
      this.days = this.hours = this.minutes = this.seconds = 0;
      this.countdownFinished.emit(); // Emite evento ao finalizar
      return;
    }

    this.days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    this.seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
  }

  clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }
}
