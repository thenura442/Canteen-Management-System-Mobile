import { Component, OnInit } from '@angular/core';
import { CommonModule , Location} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule,RouterLink]
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private location : Location) { }

  ngOnInit() {
  }

  orginalLoginForm: any = {
    email : "",
    password : ""
  }

  loginForm : any = {...this.orginalLoginForm}

  login(){
    this.authService.login(this.loginForm).subscribe((result: any) => {
      console.log(result);
      if(result.email != null || result.email != undefined){
        this.location.back();
      }
    })

    this.authService.logOut().subscribe((result: any) => {
      console.log(result);
      if(result.email != null || result.email != undefined){
        this.location.back();
      }
    })
  }

}
