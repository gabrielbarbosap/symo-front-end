import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

interface BreadcrumbItem {
  label: string;
  url: string;
}

@Component({
  imports: [RouterModule, NgFor, NgIf],
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
})
export class BreadcrumbComponent {
  @Input() breadcrumbs: BreadcrumbItem[] = [];
}
