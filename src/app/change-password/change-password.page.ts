import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../_services/auth/auth.service';
import { UserService } from '../_services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ChangePasswordPage implements OnInit {

  constructor(private router :Router, private authService: AuthService, private userService : UserService) { }

  isEdit = false;
  email = "";

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
  }

  edit(){
    this.isEdit = true;
  }

  Update(){
    if(this.pass.new_password === this.pass.retype_new_password){
      this.userService.updatePass(this.pass).subscribe(update => {
        console.log(update);
        this.isEdit = false;
        this.router.navigateByUrl('/updated-profile');
      })
    }
  }

  Cancel(){
    this.isEdit = false;
  }


}
