import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL = 'http://localhost:5500/';
const PATH = 'api/item/';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private http: HttpClient) { }

  getItems(vendor : any):any{
    return this.http.post(URL+PATH+'get',vendor);
  }

  searchItemList(search : any):any{
    return this.http.post(URL+PATH+'get/search/list', search);
  }

  getItem(id: any):any{
    return this.http.post(URL+PATH+'get/id/',id);
  }

}
