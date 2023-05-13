import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabBarComponent } from '../_components/tab-bar/tab-bar.component';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../_services/auth/auth.service';
import { UserService } from '../_services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule , TabBarComponent , RouterLink]
})
export class ProfilePage implements OnInit {

  constructor(private router : Router, private authService: AuthService, private userService : UserService) { }

  isEdit = false;
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

  edit(){
    this.isEdit = true;
  }

  Update(){
    this.userService.updateMobile({email : this.email , mobile_no : this.user.mobile_no}).subscribe(update => {
      console.log(update);
      this.isEdit = false;
      this.router.navigateByUrl('/updated-profile');
    })
  }

  Cancel(){
    this.isEdit = false;
  }
}
