import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'http://localhost:5500/';
const PATH = 'api/cart/';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getCart(cart : any):Observable<any>{
    return this.http.post(URL+PATH+'get',cart);
  }

  addToCart(cart : any):any{
    return this.http.post(URL+PATH+'create',cart);
  }

  updateCart(cart : any):any{
    return this.http.post(URL+PATH+'update',cart);
  }

  deleteItem(id : any):any{
    return this.http.post(URL+PATH+'delete/item',id);
  }
}
