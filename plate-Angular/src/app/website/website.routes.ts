import { Routes } from '@angular/router';
import { WebsiteComponent } from './website.component';
import { ProductsComponent } from './pages/products/products.component';
import { DetailComponent } from './pages/detail/detail.component';
import { LoginComponent } from '../login/login.component';
import { AdminComponent } from '../admin/admin.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const WebsiteRouts: Routes = [
  { path: '', component: WebsiteComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'products/:id', component: DetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: NotfoundComponent },
];
