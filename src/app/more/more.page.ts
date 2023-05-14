import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabBarComponent } from '../_components/tab-bar/tab-bar.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.page.html',
  styleUrls: ['./more.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabBarComponent , RouterLink ]
})
export class MorePage implements OnInit {

  constructor(private authService : AuthService , private router: Router  , private userService : UserService) { }
  email = "";

  orginalUser: any = {};
  user : any = {...this.orginalUser};

  ngOnInit() {
    let email = '';
    this.authService.currentData.subscribe(data => {
      this.email = data.email;
      email = data.email;
    })

    this.userService.getUser({email : email}).subscribe((user : any) => {
      console.log(user)
      this.user =  user;
    })
  }

  logout(){
    this.authService.logOut().subscribe((logout: any) => {
      console.log(logout);
    })
    this.router.navigateByUrl('/login');
  }
}
