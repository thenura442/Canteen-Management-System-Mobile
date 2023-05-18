import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabBarComponent } from '../_components/tab-bar/tab-bar.component';
import { OrderService } from '../_services/order/order.service';
import { AuthService } from '../_services/auth/auth.service';
import { VendorService } from '../_services/vendor/vendor.service';
import { LoaderComponent } from '../_components/loader/loader.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabBarComponent , LoaderComponent]
})
export class OrdersPage implements OnInit {

  constructor(private vendorService: VendorService, private orderService: OrderService , private authService: AuthService , private toastController : ToastController) { }

  email = "";
  pageLoading = true;

  completedOrders : any = [];
  empty = false;

  ongoingOrders : any = [];

  ngOnInit() {
    let email = '';
    this.authService.currentData.subscribe(data =>{
      email = data.email;
      this.email = data.email;
    })

    this.reload(email);
  }

  Cancel(ID : any) {

    this.orderService.updateStatus({ id : ID ,  status : "cancelled"}).subscribe(async(data:any)=> {
      console.log(data)
      if(data.message === "success"){
        const toast = await this.toastController.create({
          message: ' Order Updated! ',
          duration: 1500,
          position: "bottom",
          cssClass : "toast-success"
        });
        await toast.present();
        this.reload(this.email)
        return
      }

      if(data.message === "success"){
        const toast = await this.toastController.create({
          message: 'Something Went Wrong Try Again Later! ',
          duration: 1500,
          position: "bottom",
          cssClass : "toast-info"
        });
        await toast.present();
        this.reload(this.email)
        return
      }
    })
  }

  reload(email : any){
    this.pageLoading = true;
    this.orderService.getOrders({email : email}).subscribe((orders : any) =>{
      if(orders.length === 0){
        this.empty = true;
        this.pageLoading = false;
        return;
      }
      if(orders.length > 0){
        this.empty = false;
      }
      for(let i = 0; i < orders.length; i++){
        if(orders[i].status === 'completed' || orders[i].status === 'rejected' || orders[i].status === 'cancelled'){
          this.completedOrders.push(orders[i]);
        }
        if(orders[i].status === 'pending' || orders[i].status === 'in progress' || orders[i].status === 'pick up'){
          this.ongoingOrders.push(orders[i]);
        }
      }
      setTimeout(() => {
        this.pageLoading = false;
      },500)
    })
  }

}
