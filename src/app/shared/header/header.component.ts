import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { TopBannerComponent } from '../top-banner/top-banner.component';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-header',
  imports: [TopBannerComponent, LoginComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  menuOpen = false;

  @ViewChild('profileMenu') profileMenu: ElementRef | undefined;
  @ViewChild('profileIcon') profileIcon: ElementRef | undefined;

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.menuOpen = !this.menuOpen;
    console.log('Open', this.menuOpen);
  }

  @HostListener('document:click', ['$event'])
  closeMenu(event: MouseEvent) {
    const clickedOutsideMenu =
      this.profileMenu?.nativeElement.contains(event.target) === false &&
      this.profileIcon?.nativeElement.contains(event.target) === false;

    if (clickedOutsideMenu) {
      this.menuOpen = false;
    }
  }
}
