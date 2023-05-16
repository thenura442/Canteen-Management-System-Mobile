import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabBarComponent } from '../_components/tab-bar/tab-bar.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';
import { UserService } from '../_services/user/user.service';
import { LoaderComponent } from '../_components/loader/loader.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule , TabBarComponent , RouterLink , LoaderComponent]
})
export class ProfilePage implements OnInit {

  constructor(private router : Router, private authService: AuthService, private userService : UserService ,  private toastController: ToastController) { }

  isEdit = false;
  email = "";
  pageLoading = true;

  orginalUser: any = {};
  user : any = {...this.orginalUser};

  ngOnInit() {
    let email = '';
    this.authService.currentData.subscribe(data => {
      this.email = data.email;
      email = data.email;
    })

    this.userService.getUser({email : email}).subscribe(async(user : any) => {
      console.log(user)
      this.user = await user;
    })
    setTimeout (() => {
      this.pageLoading = false;
    },500)
  }

  edit(){
    this.isEdit = true;
  }

  Update(){
    this.userService.updateMobile({email : this.email , mobile_no : this.user.mobile_no}).subscribe(async (update: any) => {
      if(update?.message != "success"){
        const toast = await this.toastController.create({
          message: ' Something Went Wrong Try Again Later! ',
          duration: 1500,
          position: "bottom",
          cssClass : "toast-info"
        });
        await toast.present();
        return
      }

      this.isEdit = false;
      this.router.navigateByUrl('/updated-profile');
    })
  }

  async Cancel(){
    this.isEdit = false;

    const toast = await this.toastController.create({
      message: ' Cancelled Profile Update! ',
      duration: 1500,
      position: "bottom",
      cssClass : "toast-failure"
    });
    await toast.present();
  }
}
