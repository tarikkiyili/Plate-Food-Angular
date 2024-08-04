import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';

interface Product {
  id: number;
  name: string;
  price: number;
  Description: string;
  image: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, TranslocoModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private translocoService: TranslocoService
  ) {}

  changeLang(event: Event) {
    const lang = (event.target as HTMLInputElement).value;
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('preferredLang', lang);
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.http.get<Product[]>('http://localhost:3000/products').subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  viewDetails(id: number): void {
    this.router.navigate(['/products', id]);
  }
}
