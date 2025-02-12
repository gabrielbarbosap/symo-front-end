import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-prize-draw',
  imports: [NgClass],
  templateUrl: './btn-prize-draw.component.html',
  styleUrl: './btn-prize-draw.component.css',
})
export class BtnPrizeDrawComponent {
  @Input()
  text: string = '';
  size: string = 'w-full';
  @Input()
  styleBtn: string = '';
  @Input()
  styleContainer: string = '';
  @Input()
  disabled: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  v = '100px';

  @Input() set getSize(value: 'xs' | 'sm' | 'md' | 'lg') {
    switch (value) {
      case 'xs':
        this.size = 'w-[6.5rem]';
        break;
      case 'sm':
        this.size = 'w-90';
        break;
      case 'md':
        this.size = 'w-md';
        break;
      case 'lg':
        this.size = 'w-[90%]';
        break;
    }
  }

  get buttonClasses() {
    return {
      [this.styleBtn]: true, // Garante que a classe do botão sempre seja aplicada
      'px-6': this.size !== 'w-[6.5rem]', // Adiciona px-6 apenas quando não for 'w-[6.5rem]'
      'py-2': this.size !== 'w-[6.5rem]',
      'text-sm': this.size === 'w-[6.5rem]',
      'px-1': this.size === 'w-[6.5rem]',
    };
  }
}
