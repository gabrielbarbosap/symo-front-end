import { Component } from '@angular/core';
import { ExtractComponent } from '../../shared/extract/extract.component';
import { ButtonComponent } from '../../shared/button/button.component';

@Component({
  selector: 'app-wallet',
  imports: [ExtractComponent, ButtonComponent],
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
})
export class WalletComponent {}
