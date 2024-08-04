import { Component, HostListener, ElementRef } from '@angular/core';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  /* STICKY NAVBAR */
  private readonly stickyThreshold: number = 50;
  navbarOpen = false;

  constructor(
    private el: ElementRef<HTMLElement>,
    private translocoService: TranslocoService
  ) {}

  // Transloco code
  changeLang(event: Event) {
    const lang = (event.target as HTMLInputElement).value;
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('preferredLang', lang);
  }

  // Navbar button
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  // Fixed navbar code
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const navbar = this.el.nativeElement.querySelector('.header_container');
    const isPastThreshold = window.pageYOffset > this.stickyThreshold;
    if (navbar) {
      if (isPastThreshold) {
        navbar.classList.add('fixed');
      } else {
        navbar.classList.remove('fixed');
      }
    }
  }
}
