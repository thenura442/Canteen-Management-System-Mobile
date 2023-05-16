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
import { LoaderComponent } from '../_components/loader/loader.component';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink , LoaderComponent]
})
export class ItemPage implements OnInit {

  item_code = "";
  item: any = "";
  added: boolean = false;
  sameCart: boolean = true;
  pageLoading = true;

  originalItemForm: Item = {
    customer_email: "",
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


  constructor(private authService: AuthService, private itemService : ItemService, private location: Location , private activatedRoute : ActivatedRoute, private cartService: CartService , private toastController : ToastController) {
    this.activatedRoute.params.subscribe(parameter => {
      let item_code = parameter['id']
      this.item_code = item_code;

    })
   }

   ngOnInit(){

    let email = '';

    this.itemService.getItem({id: this.item_code}).subscribe(async(result : any) => {
      this.item = await result;
      this.itemForm.products[0].id = result.id;
      this.itemForm.products[0].item_name = result.item_name;
      this.itemForm.products[0].price = result.price;
      this.itemForm.products[0].url = result.url;
      this.itemForm.products[0].product_total = result.price;
      this.itemForm.store_email = result.vendor;

      this.authService.currentData.subscribe(data => {
        email = data.email;
        this.itemForm.customer_email = email;
      })

      this.cartService.getCart({customer_email: email}).subscribe(async(cart : any) => {
        if(cart == null){
          return;
        }
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

    setTimeout(() => {
      this.pageLoading = false;
    }, 800)
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
    this.cartService.addToCart(this.itemForm).subscribe(async(result : any) => {
      if(result.message === "success"){
        this.location.back();
        const toast = await this.toastController.create({
          message: 'Item Added to Cart!',
          duration: 1500,
          position: "bottom",
          cssClass : "toast-success"
        });

        await toast.present();
        return
      }

      if(result.message != "success"){
        this.location.back();
        const toast = await this.toastController.create({
          message: 'Something Went Wrong Try Again Later!',
          duration: 1500,
          position: "bottom",
          cssClass : "toast-info"
        });

        await toast.present();
        return
      }
    })
  }

}
