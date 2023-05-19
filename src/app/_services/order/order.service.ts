import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const URL = 'https://cms-backend-d9n7.onrender.com/';
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
