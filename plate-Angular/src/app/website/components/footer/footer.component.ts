import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FooterComponent {
  constructor(private translocoService: TranslocoService) {}

  changeLang(event: Event) {
    const lang = (event.target as HTMLInputElement).value;
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('preferredLang', lang);
  }
}
