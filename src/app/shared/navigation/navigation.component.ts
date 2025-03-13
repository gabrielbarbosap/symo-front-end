import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  imports: [NgFor, NgIf],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  menuItems = [
    { label: 'Sorteios', icon: '/assets/icons/sorteio-nav.svg' },
    { label: 'Ganhadores', icon: '/assets/icons/calice-nav.svg' },
    { label: 'Meus Títulos', icon: '/assets/icons/titulo.svg' },
    { label: 'Seja Nosso Parceiro', icon: '/assets/icons/hand.svg' },
    { label: 'Atendimento', icon: '/assets/icons/fone.svg' },
  ];
}
