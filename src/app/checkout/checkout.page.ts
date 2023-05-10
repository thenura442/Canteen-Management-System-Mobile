import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CartService } from '../_services/cart/cart.service';
import { Vendor } from '../_interfaces/vendor';
import { VendorService } from '../_services/vendor/vendor.service';
import { Order } from '../_interfaces/order';
import { OrderService } from '../_services/order/order.service';
import { AuthService } from '../_services/auth/auth.service';
import { UserService } from '../_services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [
    DatePipe
  ]
})
export class CheckoutPage implements OnInit{

  constructor(private router : Router ,private authService: AuthService, private orderService : OrderService, private datePipe: DatePipe, private cartService: CartService, private vendorService: VendorService , private userService : UserService) {}

  originalOrderForm: Order = {
    id: "",
    customer_email: "thenura114@gmail.com",
    customer_name: "",
    store_name: "",
    store_url: "",
    store_email: "",
    sub_total: "",
    payment_type: "",
    discount: "",
    total: "",
    date: "",
    time: "",
    status: "",
    rejected_reasons: "",
    products: [{
      id: "",
      item_name: "",
      price: "",
      quantity: "1",
      url: "",
      product_total: ""
    }]
  };

  orderForm: Order = {...this.originalOrderForm}

  originalVendorForm: Vendor = {
    vendor_name: "",
    email: "",
    description: "",
    url: "",
    mobile_no: "",
    access: ""
  };

  vendorForm: Vendor = {...this.originalVendorForm}

  ngOnInit(): void {
    let email = '';
    this.authService.currentData.subscribe(data => {
      email = data.email;
    })

    this.cartService.getCart({customer_email: email}).subscribe((result:any) => {
      this.orderForm = result;
      let total = Number(result.sub_total) - 0;
      this.orderForm.total = total.toString();

      let date = this.datePipe.transform((new Date), 'MM/dd/yyyy');
      let time = this.datePipe.transform((new Date), 'h:mm:ss');
      this.orderForm.date = date?.toString();
      this.orderForm.time = time?.toString();
      this.orderForm.payment_type = "cash";
      this.orderForm.discount = "0";
      this.orderForm.status = "pending";

      this.vendorService.getVendor({email : result.store_email}).subscribe((vendor:any) => {
        this.vendorForm = vendor;
        this.orderForm.store_name = vendor.vendor_name;
        this.orderForm.store_url = vendor.url;
      })

      this.userService.getUser({email: email}).subscribe((user : any) => {
        this.orderForm.customer_name = user.first_name;
      })

    })
  }

  confirm(){
    this.orderService.createOrder(this.orderForm).subscribe((result:any) => {
      if(result.id != null && result.id != undefined && result.id != "")
      {
        this.router.navigateByUrl('/order-confirmed');
      }
      console.log(result);
    })
  }
}
