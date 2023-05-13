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

  image: any = [];
  path = "";
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


  selectImage(fileInput: any) {
    this.image = fileInput.target.files;

    if(this.image[0] == undefined) {
      return
    }

    if(this.image[0] != undefined) {
      const formData: any = new FormData();
      formData.append('url',this.image[0])
      // try{
      //     this.uploadService.postFiles(formData).subscribe((result: any) => {
      //     console.log(result.path);
      //     console.log('hello')
      //     this.path = result.path;
      //     this.userService.updatePicture({email : this.user.email, url : this.path}).subscribe((pic:any) => {
      //       console.log(pic);
      //       this.user.url = pic.url;
      //     })
      //   })
      // }
      // catch(e) {
      //   console.log(e);
      // }
    }
  }

  logout(){
    this.authService.logOut().subscribe((logout: any) => {
      console.log(logout);
    })
    this.router.navigateByUrl('/login');
  }
}
