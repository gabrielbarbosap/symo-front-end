import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { WinnersComponent } from '../../shared/winners/winners.component';

@Component({
  selector: 'app-winners-page',
  imports: [BreadcrumbComponent, WinnersComponent],
  templateUrl: './winners-page.component.html',
  styleUrl: './winners-page.component.css',
})
export class WinnersPageComponent {}
