import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VendorService } from '../_services/vendor/vendor.service';
import { TabBarComponent } from '../_components/tab-bar/tab-bar.component';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,RouterLink,CommonModule,FormsModule, TabBarComponent],
})
export class HomePage {
  constructor(private router: Router, private vendorService: VendorService, private authService: AuthService) {}

  // originalVendorForm: Vendor = {
  //   vendor_name: "",
  //   email: "",
  //   description: "",
  //   url: "",
  //   mobile_no: "",
  //   access: ""
  // };

  // vendorForm: Vendor = {...this.originalVendorForm}

  stores : any = [];
  user : any;
  isUser = true;


  ionViewWillEnter(){
    this.vendorService.getVendors().subscribe((result : any) => {
      this.stores = result;
    })

    this.authService.currentData.subscribe(data  =>{
      if(data == null){
        this.router.navigateByUrl('/login');
      }
    })

  }
}
