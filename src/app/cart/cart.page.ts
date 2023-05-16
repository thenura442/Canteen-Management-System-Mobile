import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CartService } from '../_services/cart/cart.service';
import { Item } from '../_interfaces/item';
import { VendorService } from '../_services/vendor/vendor.service';
import { Vendor } from '../_interfaces/vendor';
import { Router } from '@angular/router';
import { TabBarComponent } from '../_components/tab-bar/tab-bar.component';
import { AuthService } from '../_services/auth/auth.service';
import { LoaderComponent } from '../_components/loader/loader.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabBarComponent , LoaderComponent]
})
export class CartPage{

  constructor(private authService: AuthService ,private router: Router, private cartService: CartService, private vendorService : VendorService , private toastController : ToastController) {}

  ngOnInit() {
  }

  changed: boolean = false;
  email = '';
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


  originalVendorForm: Vendor = {
    vendor_name: "",
    email: "",
    description: "",
    url: "",
    mobile_no: "",
    access: ""
  };

  vendorForm: Vendor = {...this.originalVendorForm}

  items: any = 0;
  categories: any = 0;

  ionViewWillEnter(){

    let email = '';

    this.authService.currentData.subscribe(data =>{
      email = data.email;
      this.email = data.email;
    })

    this.cartService.getCart({customer_email: email}).subscribe(async(result : any) => {
      if(result == null){
        this.itemForm = {...this.originalItemForm}
        return;
      }
      if(result?.customer_email){
        this.itemForm = await result;
        this.items = 0;
        this.categories = 0;
        for(let i = 0; i < result.products.length; i++){
          this.categories = this.categories + 1;
          this.items = this.items + Number(result.products[i].quantity)
        }
        this.vendorService.getVendor({email: result.store_email}).subscribe(async(vendor : any) => {
          this.vendorForm = await vendor;
        })
      }
    })
    setTimeout(() => {
      this.pageLoading = false;
    }, 800)
  }


  minus(item_id: any){
    this.changed = true;
    let sub_tot = 0;
    for (let i = 0; i < this.itemForm.products.length; i++) {
      if(this.itemForm.products[i].id == item_id){
        let quantity = Number(this.itemForm.products[i].quantity) - 1;
        this.itemForm.products[i].quantity = quantity.toString();
        let product_total = Number(this.itemForm.products[i].product_total) - Number(this.itemForm.products[i].price);
        this.itemForm.products[i].product_total = product_total.toString();
      }
      sub_tot = sub_tot + Number(this.itemForm.products[i].product_total);
    }
    this.itemForm.sub_total = sub_tot.toString();
  }

  add(item_id : any){
    this.changed = true;
    let sub_tot = 0;
    for (let i = 0; i < this.itemForm.products.length; i++) {
      if(this.itemForm.products[i].id == item_id){
        let quantity = Number(this.itemForm.products[i].quantity) + 1;
        this.itemForm.products[i].quantity = quantity.toString();
        let product_total = Number(this.itemForm.products[i].product_total) + Number(this.itemForm.products[i].price);
        this.itemForm.products[i].product_total = product_total.toString();
      }
      sub_tot = sub_tot + Number(this.itemForm.products[i].product_total);
    }
    this.itemForm.sub_total = sub_tot.toString();
  }


  remove(item_id : any){
    let id = item_id;
    this.cartService.deleteItem({id:id, customer_email: this.itemForm.customer_email}).subscribe(async(result : any) => {
      this.reload();
      if(result.message === "success"){
        this.reload();
        const toast = await this.toastController.create({
          message: 'Item Removed from Cart Successfully!',
          duration: 1500,
          position: "bottom",
          cssClass : "toast-success"
        });

        await toast.present();
        return
      }
      if(result.message != "success"){
        this.reload();
        const toast = await this.toastController.create({
          message: 'Something Went Wrong!',
          duration: 1500,
          position: "bottom",
          cssClass : "toast-info"
        });

        await toast.present();
        return
      }
    })
  }


  update(){
    this.changed = false;
    this.cartService.updateCart(this.itemForm).subscribe(async(result : any) => {
      if(result.sub_total === this.itemForm.sub_total){
        this.reload();
        const toast = await this.toastController.create({
          message: 'Cart Updated Successfully!',
          duration: 1500,
          position: "bottom",
          cssClass : "toast-success"
        });

        await toast.present();
        return
      }

      if(result.sub_total != this.itemForm.sub_total){
        this.reload();
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

  checkout(){
    this.router.navigateByUrl('/checkout')
  }


  reload(){
    this.cartService.getCart({customer_email: "thenura114@gmail.com"}).subscribe(async(result : any) => {
      if(result == null){
        this.itemForm = {...this.originalItemForm}
        return;
      }
      if(result?.customer_email){
        this.itemForm = result;
        this.items = 0;
        this.categories = 0;
        for(let i = 0; i < result.products.length; i++){
          this.categories = this.categories + 1;
          this.items = this.items + Number(result.products[i].quantity)
        }
      }

      if(result != null && !result?.customer_email){
        this.reload();
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
