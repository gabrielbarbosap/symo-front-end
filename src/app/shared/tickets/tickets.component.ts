import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-tickets',
  imports: [NgFor, ButtonComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css',
})
export class TicketsComponent {
  @Input() tickets: { id: string; numbers: string[] }[] = [
    { id: '124564845', numbers: ['04059694', '04059694', '04059694'] },
    { id: '124564846', numbers: ['04059694', '04059694', '04059694', '04059694'] },
    { id: '124564847', numbers: ['04059694', '04059694', '04059694', '04059694', '04059694'] },
    { id: '124564848', numbers: ['04059694', '04059694', '04059694', '04059694', '04059694', '04059694'] },
    { id: '124564849', numbers: ['04059694', '04059694', '04059694', '04059694', '04059694', '04059694', '04059694'] },
    { id: '124564849', numbers: ['04059694', '04059694', '04059694', '04059694', '04059694', '04059694', '04059694'] },
  ];
}
