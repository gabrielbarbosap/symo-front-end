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

  @Input()
  size = 'w-max';

  @Input()
  styleBtn: string = '';
  @Input()
  styleContainer: string = '';
  @Input()
  disabled: boolean = false;
  @Output() onClick: EventEmitter<any> = new EventEmitter<any>();

  get buttonClasses() {
    return {
      [this.styleBtn]: true,
    };
  }
}
