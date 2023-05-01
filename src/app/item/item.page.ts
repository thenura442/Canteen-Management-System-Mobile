import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Location } from "@angular/common";

import { ItemService } from '../_services/item/item.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../_services/cart/cart.service';
import { Item } from '../_interfaces/item';
import { AuthService } from '../_services/auth/auth.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class ItemPage implements OnInit {

  item_code = "";
  item: any = "";
  added: boolean = false;
  sameCart: boolean = true;

  originalItemForm: Item = {
    customer_email: "thenura114@gmail.com",
    store_email: "",
    sub_total: "",
    products: [{
      id: "",
      item_name: "",
      price: "",
      quantity: "1",
      url: "",
      product_total: ""
    }]
  };

  itemForm: Item = {...this.originalItemForm}


  constructor(private authService: AuthService, private itemService : ItemService, private location: Location , private activatedRoute : ActivatedRoute, private cartService: CartService) {
    this.activatedRoute.params.subscribe(parameter => {
      this.item_code = parameter['id']
    })
   }

  ngOnInit(): void {
  }

   ionViewWillEnter(){

    let email = '';

    this.itemService.getItem({id: this.item_code}).subscribe((result : any) => {
      this.item = result;
      this.itemForm.products[0].id = result.id;
      this.itemForm.products[0].item_name = result.item_name;
      this.itemForm.products[0].price = result.price;
      this.itemForm.products[0].url = result.url;
      this.itemForm.products[0].product_total = result.price;
      this.itemForm.store_email = result.vendor;

      this.authService.currentData.subscribe(data => {
        email = data.email;
      })

      this.cartService.getCart({customer_email: email}).subscribe((cart : any) => {
        if(cart?.customer_email){
          for (let i = 0; i < cart.products.length; i++) {
            if(cart.products[i].id == this.item_code){
              this.added = true;
            }
          }
        }

        if(cart.store_email != this.itemForm.store_email){
          this.sameCart = false;
        }
      })

    })
  }

  minus(){
    let quantity = Number(this.itemForm.products[0].quantity) - 1;
    this.itemForm.products[0].quantity = quantity.toString();
    let product_total = Number(this.itemForm.products[0].product_total) - Number(this.itemForm.products[0].price);
    this.itemForm.products[0].product_total = product_total.toString();
  }

  add(){
    let quantity = Number(this.itemForm.products[0].quantity) + 1
    this.itemForm.products[0].quantity = quantity.toString();
    let product_total = Number(this.itemForm.products[0].product_total) + Number(this.itemForm.products[0].price);
    this.itemForm.products[0].product_total = product_total.toString();
  }


  AddToCart(){
    this.itemForm.sub_total = this.itemForm.products[0].product_total;

    this.cartService.addToCart(this.itemForm).subscribe((result : any) => {
      this.location.back();
    })
  }

}
