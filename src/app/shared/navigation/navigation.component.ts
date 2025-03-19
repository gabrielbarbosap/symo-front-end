import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  router = inject(Router);

  menuItems = [
    { label: 'Sorteios', icon: '/assets/icons/sorteio-nav.svg' },
    { label: 'Ganhadores', icon: '/assets/icons/calice-nav.svg' },
    { label: 'Meus Títulos', icon: '/assets/icons/titulo.svg' },
    { label: 'Seja Nosso Parceiro', icon: '/assets/icons/hand.svg' },
    { label: 'Atendimento', icon: '/assets/icons/fone.svg' },
  ];

  changeRoute(idRota: number) {
    switch (idRota) {
      case 0:
        this.router.navigate(['/prize-draw']);
        break;
      case 1:
        this.router.navigate(['/winners']);
        break;
    }
  }
}
