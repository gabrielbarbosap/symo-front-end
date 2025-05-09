import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileFormComponent } from '../../components/profile/profile-form/profile-form.component';
import { NgIf } from '@angular/common';
import { PurchasesComponent } from '../../components/profile/purchases/purchases.component';
import { SecurityPrivacyComponent } from '../../components/profile/security-form/security-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [ProfileFormComponent, NgIf, SecurityPrivacyComponent, PurchasesComponent],
})
export class ProfileComponent implements OnInit, OnDestroy {
  activeTab: string = 'orders'; // Definir a aba inicial como "Minha conta"

  constructor() {}

  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.checkScreenSize.bind(this));
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  private checkScreenSize(): void {
    // Implementar comportamento responsivo se necessário
  }
}
