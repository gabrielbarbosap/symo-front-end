import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  /**
   * Texto a ser exibido no botão.
   * Exemplo: "Cancelar"
   */
  @Input() label!: string;
}
