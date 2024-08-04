import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule } from '@angular/common';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailComponent implements OnInit {
  product: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private translocoService: TranslocoService
  ) {}

  // Transloco code
  changeLang(event: Event) {
    const lang = (event.target as HTMLInputElement).value;
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('preferredLang', lang);
  }

  // Product check
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = Number(params.get('id'));
      this.productService.getProductById(productId).subscribe(
        (product) => {
          if (product) {
            this.product = product;
          } else {
            this.router.navigate(['/notfound']);
          }
        },
        (error) => {
          console.error('Error fetching product:', error);
          this.router.navigate(['/notfound']);
        }
      );
    });
  }
}
