import { Component, OnInit } from '@angular/core';
import { CommonModule , Location} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private location : Location, private toastController: ToastController , private router : Router) { }

  ngOnInit() {
  }

  orginalLoginForm: any = {
    email : "",
    password : ""
  }

  loginForm : any = {...this.orginalLoginForm}

  async login(){
    if(this.loginForm.email === "" && this.loginForm.password === ""){
      const toast = await this.toastController.create({
        message: ' Email and Password Should not be Empty!',
        duration: 1500,
        position: "bottom",
        cssClass : "toast-failure"
      });

      await toast.present();
      return
    }
    this.authService.login(this.loginForm).subscribe(async (result: any) => {
      if(result.email != null || result.email != undefined){
        const toast = await this.toastController.create({
          message: ' Welcome Back '+result.first_name,
          duration: 1500,
          position: "bottom",
          cssClass : "toast-success"
        });

        await toast.present();

        this.router.navigateByUrl('/home')
        return
      }
      if(result.Error === "Email or Password is Incorrect"){
        const toast = await this.toastController.create({
          message: result.Error+'!',
          duration: 1500,
          position: "bottom",
          cssClass : "toast-failure"
        });

        await toast.present();
        return
      }

      if(result.Error === '"email" must be a valid email'){
        const toast = await this.toastController.create({
          message: 'Please Enter a Valid Email!',
          duration: 1500,
          position: "bottom",
          cssClass : "toast-failure"
        });

        await toast.present();
        return
      }

      if(result.Error != "Email or Password is Incorrect" || result.Error != '"email" must be a valid email'){
        const toast = await this.toastController.create({
          message: 'Something Went Wrong Try Again Later!',
          duration: 1500,
          position: "bottom",
          cssClass : "toast-info"
        });

        await toast.present();
        return
      }
    })

    // this.authService.logOut().subscribe(async (result: any) => {
    //   if(result.email != null || result.email != undefined){
    //     this.location.back();
    //   }
    // })
  }

}
