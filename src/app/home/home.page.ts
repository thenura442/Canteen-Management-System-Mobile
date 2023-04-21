import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VendorService } from '../_services/vendor/vendor.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule,RouterLink,CommonModule,FormsModule],
})
export class HomePage {
  constructor(private vendorService: VendorService) {}

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


  ionViewWillEnter(){
    this.vendorService.getVendors().subscribe((result : any) => {
      console.log(result);
      this.stores = result;
    })
  }


  // onSubmit(form: NgForm) {
  //   console.log('in on submit : '+ form.valid);
  //   if(form.valid && this.vendorForm.access != 'Set Access') {
  //     if(this.image[0] == undefined) {
  //       this.onHttpError('Please Select an Store Image');
  //       return
  //     }
  //     this.messages();
  //     this.vendorService.postVendorForm(this.vendorForm).subscribe((result : any) => {
  //       console.log(result);
  //       if(Object.hasOwn(result,'Error')){
  //         const status = Object.getOwnPropertyDescriptor(result, 'Status');
  //         const error = Object.getOwnPropertyDescriptor(result, 'Error');

  //         if(status?.value === "400") {
  //           this.onHttpError(error?.value)
  //         }
  //         else {
  //           this.onHttpError("Something went Wrong with the Server try again later,.. If the Issue Persists please Contact Support!");
  //           console.log(result)
  //         }
  //       }
  //       else {
  //         this.postError = false;
  //         this.postSuccess = true;
  //         this.postSuccessMessage = result.email + "- Successfully Registered";
  //         this.vendorForm = this.originalVendorForm;
  //         this.image = this.originalImage;
  //       }
  //     });
  //   }
  // }
}
