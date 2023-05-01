import { Component, OnInit } from '@angular/core';
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
export class StorePage implements OnInit{

  store_email = "";

  constructor(private vendorService : VendorService, private activatedRoute : ActivatedRoute, private itemService: ItemService) {
    this.activatedRoute.params.subscribe(parameter => {
      this.store_email = parameter['id']
    })
   }

  ngOnInit(){
    this.vendorService.getVendor({email: this.store_email}).subscribe((result : any) => {
      this.stores = result;
    })

    this.itemService.getItems({email: this.store_email}).subscribe((result : any) => {
      for(let i = 0; i < result.length; i++){
        if(result[i].type === 'item' && result[i].meal_type === 'snack'){
          this.snack.push(result[i]);
        }
        if(result[i].type === 'item' && result[i].meal_type === 'starter'){
          this.starter.push(result[i]);
        }
        if(result[i].type === 'item' && result[i].meal_type === 'main'){
          this.main.push(result[i]);
        }
        if(result[i].type === 'item' && result[i].meal_type === 'dessert'){
          this.dessert.push(result[i]);
        }
        if(result[i].type === 'item' && result[i].meal_type === 'beverage'){
          this.beverage.push(result[i]);
        }
        if(result[i].type === 'special'){
          this.specialItems.push(result[i]);
        }
      }
    })
  }

  stores : any = [];

  specialItems : any = [];
  snack: any = [];
  starter: any = [];
  main: any = [];
  beverage : any = [];
  dessert: any = [];
}
