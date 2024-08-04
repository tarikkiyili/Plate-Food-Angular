import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './website/components/navbar/navbar.component';
import { FooterComponent } from './website/components/footer/footer.component';
import { WebsiteComponent } from './website/website.component';
import { DarkComponent } from './website/components/dark/dark.component';
import { ProductsComponent } from './website/pages/products/products.component';
import { RouterOutlet } from '@angular/router';
import {
  TranslocoModule,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  TranslocoService,
} from '@jsverse/transloco';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoHttpLoader } from './transloco-loader';
import { LoadingComponent } from './website/components/loading/loading.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    NavbarComponent,
    FooterComponent,
    WebsiteComponent,
    DarkComponent,
    ProductsComponent,
    RouterOutlet,
    HttpClientModule,
    TranslocoModule,
    LoadingComponent,
    CommonModule,
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: {
        availableLangs: ['en', 'tr', 'ar'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: true,
      },
    },
    {
      provide: TRANSLOCO_LOADER,
      useClass: TranslocoHttpLoader,
    },
  ],
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Home';
  isLoading = false;

  constructor(
    private router: Router,
    private translocoService: TranslocoService
  ) {
    const savedLang = localStorage.getItem('preferredLang') || 'en';
    this.translocoService.setActiveLang(savedLang);

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
        console.log(this.isLoading); // isLoading değerini kontrol et
      } else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.isLoading = false;
          console.log(this.isLoading); // isLoading değerini kontrol et
        }, 500); // Minimum gösterim süresi (ms cinsinden)
      }
    });
  }

  // Login check
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (
          event.url === '/admin' &&
          localStorage.getItem('isLoggedIn') !== 'true'
        ) {
          localStorage.setItem('redirectUrl', event.url);
          this.router.navigate(['/login']);
        }
      }
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }
}
