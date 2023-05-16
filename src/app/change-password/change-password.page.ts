import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../_services/auth/auth.service';
import { UserService } from '../_services/user/user.service';
import { Router } from '@angular/router';
import { LoaderComponent } from '../_components/loader/loader.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule , LoaderComponent ]
})
export class ChangePasswordPage implements OnInit {

  constructor(private router :Router, private authService: AuthService, private userService : UserService , private toastController: ToastController) { }

  isEdit = false;
  email = "";
  pageLoading = true;

  orginalUser: any = {};
  user : any = {...this.orginalUser};

  orginalPass = {
    email: "",
    old_password: "",
    new_password: "",
    retype_new_password: "",
  }

  pass = {...this.orginalPass}

  ngOnInit() {
    let email = '';
    this.authService.currentData.subscribe(data => {
      this.email = data.email;
      email = data.email;
      this.pass.email = data.email;
    })

    this.userService.getUser({email : email}).subscribe((user : any) => {
      this.user =  user;
    })
    setTimeout (() => {
      this.pageLoading = false;
    },500)

  }

  edit(){
    this.isEdit = true;
  }

  Update(){
    if(this.pass.new_password === this.pass.retype_new_password){
      this.userService.updatePass(this.pass).subscribe(async(update:any) => {
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
