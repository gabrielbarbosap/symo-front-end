import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() styleType: 'primary' | 'secondary' | 'tertiary' = 'primary';
  @Input() disabled: boolean = false;
  @Input() context: 'hero' | 'default' = 'default';

  getButtonClass() {
    const baseClass = 'text-center text-xs sm:text-sm md:text-base p-2 rounded-xl w-full';

    const sizeClass = this.context === 'hero' ? 'h-[56px] md:h-[137px]' : 'h-[56px]';

    if (this.disabled) {
      return `bg-gray-300 text-gray-600 cursor-not-allowed`;
    }

    switch (this.styleType) {
      case 'primary':
        return `${baseClass} ${sizeClass} bg-[#8C6BFA] text-white hover:bg-[#764BE9]`;
      case 'secondary':
        return `${baseClass} ${sizeClass} border-2 border-[#8C6BFA] text-[#8C6BFA]`;
      case 'tertiary':
        return `${baseClass} h-[32px] bg-[#12D1DE] text-[#2E2170] hover:bg-[#0FA5B0]`;
      default:
        return `${baseClass} ${sizeClass}`;
    }
  }
}
