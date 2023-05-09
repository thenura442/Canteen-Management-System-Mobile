import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabBarComponent } from '../_components/tab-bar/tab-bar.component';
import { OrderService } from '../_services/order/order.service';
import { AuthService } from '../_services/auth/auth.service';
import { VendorService } from '../_services/vendor/vendor.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabBarComponent]
})
export class OrdersPage implements OnInit {

  constructor(private vendorService: VendorService, private orderService: OrderService , private authService: AuthService) { }

  email = "";

  completedOrders : any = [];

  ongoingOrders : any = [];

  ngOnInit() {
    let email = '';
    this.authService.currentData.subscribe(data =>{
      email = data.email;
      this.email = data.email;
    })

    this.orderService.getOrders({email : email}).subscribe((orders : any) =>{
      console.log(orders)
      for(let i = 0; i < orders.length; i++){
        if(orders[i].status === 'completed' || orders[i].status === 'rejected' || orders[i].status === 'cancelled'){
          this.completedOrders.push(orders[i]);
        }
        if(orders[i].status === 'pending' || orders[i].status === 'in progress' || orders[i].status === 'pick up'){
          this.ongoingOrders.push(orders[i]);
        }
      }
    })
  }

}
