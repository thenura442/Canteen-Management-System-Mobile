import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoaderComponent } from '../_components/loader/loader.component';

@Component({
  selector: 'app-help-us',
  templateUrl: './help-us.page.html',
  styleUrls: ['./help-us.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule , LoaderComponent]
})
export class HelpUsPage implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.pageLoading = false;
    },500)
  }

  pageLoading = true;

}
