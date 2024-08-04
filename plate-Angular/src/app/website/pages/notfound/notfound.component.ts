import { Component, OnInit, Renderer2 } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css',
})
export class NotfoundComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    private translocoService: TranslocoService
  ) {}

  // Transloco Code
  changeLang(event: Event) {
    const lang = (event.target as HTMLInputElement).value;
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('preferredLang', lang);
  }

  // When NotFound Page is loaded Hide everything
  ngOnInit(): void {
    // Bileşenleri gizle
    this.hideElements();
  }

  hideElements(): void {
    const navbar = document.querySelector('app-navbar');
    const footer = document.querySelector('app-footer');
    const dark = document.querySelector('app-dark');

    if (navbar) {
      this.renderer.setStyle(navbar, 'display', 'none');
    }
    if (footer) {
      this.renderer.setStyle(footer, 'display', 'none');
    }
    if (dark) {
      this.renderer.setStyle(dark, 'display', 'none');
    }
  }

  // When NotFound Page is destroyed Show everything again
  ngOnDestroy(): void {
    // Bileşenleri tekrar göster
    this.showElements();
  }

  showElements(): void {
    const navbar = document.querySelector('app-navbar');
    const footer = document.querySelector('app-footer');
    const dark = document.querySelector('app-dark');

    if (navbar) {
      this.renderer.removeStyle(navbar, 'display');
    }
    if (footer) {
      this.renderer.removeStyle(footer, 'display');
    }
    if (dark) {
      this.renderer.removeStyle(dark, 'display');
    }
  }
}
