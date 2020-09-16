import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CartComponent} from './cart/cart.component';
import {ShoppingComponent} from './shopping/shopping.component';

const routes: Routes = [
  // { path: '', redirectTo: 'shopping', pathMatch: 'full'},
  // { path: 'shopping', loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingModule)},
  // { path: 'cart', loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)},
  {path: 'shopping', component: ShoppingComponent},
  {path: 'cart', component: CartComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
