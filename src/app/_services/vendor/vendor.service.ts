import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:5500/';
const PATH = 'api/vendor/';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }

  getVendors():any{
    return this.http.get(URL+PATH+'get/access');
  }

  getVendor(email: any):any{
    return this.http.post(URL+PATH+'get/id/access',email);
  }

  getVendorMerchant(email: any):any{
    return this.http.post(URL+PATH+'get/id/merchant',email);
  }

  getAllVendors():any{
    return this.http.get(URL+PATH+'get');
  }


  getVendorDetail(email: any):any{
    return this.http.post(URL+PATH+'get/id',email);
  }
}
