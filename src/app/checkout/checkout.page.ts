import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IPayPalConfig, ICreateOrderRequest, NgxPayPalModule } from 'ngx-paypal';

import { CartService } from '../_services/cart/cart.service';
import { Vendor } from '../_interfaces/vendor';
import { VendorService } from '../_services/vendor/vendor.service';
import { Order } from '../_interfaces/order';
import { OrderService } from '../_services/order/order.service';
import { AuthService } from '../_services/auth/auth.service';
import { UserService } from '../_services/user/user.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../_components/loader/loader.component';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule , NgxPayPalModule , LoaderComponent],
  providers: [
    DatePipe
  ]
})
export class CheckoutPage implements OnInit{

  public payPalConfig ? : IPayPalConfig;

  private async initConfig(merchant : any) {
    let merchant_id : string = merchant;
    this.payPalConfig = {
    currency: 'USD',
    clientId: merchant_id,
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.orderForm.total,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.orderForm.total
              }
            }
          }
        }
      ],
      application_context: { shipping_preference: "NO_SHIPPING", }
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details : any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: async(data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      if(data.status === "COMPLETED"){
        this.orderForm.payment_type = "card";
        this.orderService.createOrder(this.orderForm).subscribe((result:any) => {
          console.log(result)
          if(result.id != null && result.id != undefined && result.id != "")
          {
            this.router.navigateByUrl('/order-confirmed');
          }
        })
        this.router.navigateByUrl('/order-confirmed');
      }
      else{
        const toast = await this.toastController.create({
          message: 'Payment Could not be Completed!',
          duration: 1500,
          position: "bottom",
          cssClass : "toast-info"
        });

        await toast.present();
        return
      }
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

  constructor(private toastController : ToastController , private router : Router ,private authService: AuthService, private orderService : OrderService, private datePipe: DatePipe, private cartService: CartService, private vendorService: VendorService , private userService : UserService) {}

  originalOrderForm: Order = {
    id: "",
    customer_email: "",
    customer_name: "",
    store_name: "",
    store_url: "",
    store_email: "",
    sub_total: "",
    payment_type: "cash",
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

  pageLoading = true;
  Total : String = "0";

  ngOnInit(): void {
    let email = '';
    this.authService.currentData.subscribe(data => {
      email = data.email;
    })

    this.cartService.getCart({customer_email: email}).subscribe(async(result:any) => {
      this.orderForm = await result;

      if(!result?.customer_email){
        const toast = await this.toastController.create({
          message: 'Something Went Wrong Try Again Later!',
          duration: 1500,
          position: "bottom",
          cssClass : "toast-info"
        });

        await toast.present();
        return
      }

      this.orderForm.customer_email = result.customer_email;
      let total = Number(result.sub_total) - 0;
      this.orderForm.total = total.toString();

      let date = this.datePipe.transform((new Date), 'MM/dd/yyyy');
      let time = this.datePipe.transform((new Date), 'h:mm:ss');
      this.orderForm.date = date?.toString();
      this.orderForm.time = time?.toString();
      this.orderForm.payment_type = "cash";
      this.orderForm.discount = "0";
      this.orderForm.status = "pending";
      let Total = String(Number(this.orderForm.total)/200)
      this.Total = String(Number(Total)*1.1)

      let merchant = ""
      this.vendorService.getVendor({email : result.store_email}).subscribe(async(vendor:any) => {
        console.log(vendor)
        this.vendorForm = await vendor;
        this.orderForm.store_name = vendor.vendor_name;
        this.orderForm.store_url = vendor.url;
      })

      this.vendorService.getVendorMerchant({email : result.store_email}).subscribe(async(merchant:any) => {
        merchant = merchant.merchant_id;
        this.initConfig(merchant)
      })

      this.userService.getUser({email: email}).subscribe(async(user : any) => {
        this.orderForm.customer_name = await user.first_name;
      })
    })



    setTimeout(() => {
      this.pageLoading = false;
    },800)
  }

  confirm(){
    this.orderService.createOrder(this.orderForm).subscribe((result:any) => {
      console.log(result)
      if(result.id != null && result.id != undefined && result.id != "")
      {
        this.router.navigateByUrl('/order-confirmed');
      }
    })
  }
}
