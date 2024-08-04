import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslocoService, TranslocoModule } from '@jsverse/transloco';

interface Product {
  id: number | null;
  name: string;
  price: number | null;
  Description: string;
  image: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  imports: [CommonModule, HttpClientModule, FormsModule, TranslocoModule],
})
export class AdminComponent implements OnInit {
  products: Product[] = [];
  product: Product = {
    id: null,
    name: '',
    price: null,
    Description: '',
    image: '',
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private translocoService: TranslocoService
  ) {}

  // Transloco codes
  changeLang(event: Event) {
    const lang = (event.target as HTMLInputElement).value;
    this.translocoService.setActiveLang(lang);
    localStorage.setItem('preferredLang', lang);
  }

  // check login if true
  ngOnInit() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
      this.router.navigate(['/login']);
    } else {
      this.getProducts();
    }
  }

  // Connect to server
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

  selectedFile: File | null = null;
  fileName: string | null = null;

  // Get file to product
  triggerFileInput(): void {
    const fileInput = document.getElementById(
      'file-upload'
    ) as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileName = this.selectedFile.name;
    } else {
      this.fileName = null;
    }
  }

  // Check if all files are selected and post it to server
  onSubmit(): void {
    if (
      !this.product.name ||
      this.product.price === null ||
      !this.product.Description ||
      !this.selectedFile
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('Description', this.product.Description);
    formData.append('image', this.selectedFile);

    if (this.product.id !== null) {
      this.http
        .put(`http://localhost:3000/products/${this.product.id}`, formData)
        .subscribe(() => {
          this.getProducts();
          this.resetForm();
        });
    } else {
      const maxId =
        this.products.length > 0
          ? Math.max(...this.products.map((p) => p.id ?? 0))
          : 0;
      this.product.id = maxId + 1;
      formData.append('id', this.product.id.toString());
      this.http
        .post('http://localhost:3000/products', formData)
        .subscribe(() => {
          this.getProducts();
          this.resetForm();
        });
    }
  }

  editProduct(product: Product): void {
    this.product = { ...product };
  }

  deleteProduct(id: number | null): void {
    // number | null türünde parametre kabul ediyor
    if (id !== null) {
      // null kontrolü
      this.http.delete(`http://localhost:3000/products/${id}`).subscribe(() => {
        this.getProducts();
      });
    }
  }

  clearPrice(): void {
    if (this.product.price === 0) {
      this.product.price = null;
    }
  }

  resetForm(): void {
    this.product = {
      id: null,
      name: '',
      price: null,
      Description: '',
      image: '',
    };
    this.selectedFile = null;
  }
}
