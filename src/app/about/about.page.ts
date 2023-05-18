import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoaderComponent } from '../_components/loader/loader.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule , LoaderComponent]
})
export class AboutPage implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.pageLoading = false;
    },500)
  }

  pageLoading = true;

}
