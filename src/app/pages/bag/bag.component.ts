import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { TicketsComponent } from '../../shared/tickets/tickets.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-bag',
  imports: [BreadcrumbComponent, TicketsComponent, ButtonComponent],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.css',
})
export class BagComponent {}
