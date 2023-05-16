import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VendorService } from '../_services/vendor/vendor.service';
import { TabBarComponent } from '../_components/tab-bar/tab-bar.component';
import { AuthService } from '../_services/auth/auth.service';
import { LoaderComponent } from '../_components/loader/loader.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,RouterLink,CommonModule,FormsModule, TabBarComponent , LoaderComponent],
})
export class HomePage implements OnInit {
  constructor(private router: Router, private vendorService: VendorService, private authService: AuthService) {}

  stores : any = [];
  user : any;
  isUser = true;
  pageLoading = true;


  ngOnInit(){
    this.vendorService.getVendors().subscribe(async (result : any) => {
      this.stores = await result;
    })

    this.authService.currentData.subscribe(async data  =>{
      if(data == null){
        this.router.navigateByUrl('/login');
      }
    })

    setTimeout (() => {
      this.pageLoading = false;
    },600)
  }
}
