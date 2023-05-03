import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'loading',
    loadComponent: () => import('./loading/loading.page').then( m => m.LoadingPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'browse',
    loadComponent: () => import('./browse/browse.page').then( m => m.BrowsePage)
  },
  {
    path: 'store/:id',
    loadComponent: () => import('./store/store.page').then( m => m.StorePage)
  },
  {
    path: 'item/:id',
    loadComponent: () => import('./item/item.page').then( m => m.ItemPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./cart/cart.page').then( m => m.CartPage)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./checkout/checkout.page').then( m => m.CheckoutPage)
  },
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.page').then( m => m.OrdersPage)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'orders',
    loadComponent: () => import('./orders/orders.page').then( m => m.OrdersPage)
  },



];
