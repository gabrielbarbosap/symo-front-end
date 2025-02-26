import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-count-down',
  imports: [],
  templateUrl: './count-down.component.html',
  styleUrl: './count-down.component.css',
})
export class CountDownComponent implements OnInit {
  days: number = 12;
  hours: number = 12;
  minutes: number = 34;
  seconds: number = 3;

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        this.seconds = 59;
        if (this.minutes > 0) {
          this.minutes--;
        } else {
          this.minutes = 59;
          if (this.hours > 0) {
            this.hours--;
          } else {
            this.hours = 23;
            if (this.days > 0) {
              this.days--;
            }
          }
        }
      }
    }, 1000);
  }
}
