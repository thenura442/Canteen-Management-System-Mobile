import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

import { VendorService } from '../_services/vendor/vendor.service';
import { ActivatedRoute } from '@angular/router';
import { ItemService } from '../_services/item/item.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class StorePage {

  store_email = "";

  constructor(private vendorService : VendorService, private activatedRoute : ActivatedRoute, private itemService: ItemService) {
    this.activatedRoute.params.subscribe(parameter => {
      this.store_email = parameter['id']
    })
   }

  ionViewWillEnter(){
    this.vendorService.getVendor({email: this.store_email}).subscribe((result : any) => {
      console.log(result);
      this.stores = result;
    })

    this.itemService.getItems({email: this.store_email}).subscribe((result : any) => {
      console.log(result);
      this.items = result;
    })
  }

  stores : any = [];
  items : any = [];
  starter: any = [];
  main: any = [];
  desserts: any = [];
}
