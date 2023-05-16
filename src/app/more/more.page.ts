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
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabBarComponent , RouterLink , LoaderComponent ]
})
export class MorePage implements OnInit {

  constructor(private authService : AuthService , private router: Router  , private userService : UserService , private toastController: ToastController) { }
  email = "";

  orginalUser: any = {};
  user : any = {...this.orginalUser};
  pageLoading = true;

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

  async logout(){
    const toast = await this.toastController.create({
      message: ' Logged Out Successfully! ',
      duration: 1500,
      position: "bottom",
      cssClass : "toast-success"
    });
    await toast.present();

    this.authService.logOut().subscribe(async(logout: any) => {
      console.log(logout);
    })

    this.router.navigateByUrl('/login');
  }
}
