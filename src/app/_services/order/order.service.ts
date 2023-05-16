import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'http://localhost:5500/';
const PATH = 'api/order/';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(order : any):any{
    return this.http.post(URL+PATH+'create',order);
  }

  getOrders(user : any) {
    return this.http.post(URL+PATH+'get/user/orders',user);
  }

  updateStatus(status : any) {
    return this.http.post(URL+PATH+'update/status',status);
  }
}
