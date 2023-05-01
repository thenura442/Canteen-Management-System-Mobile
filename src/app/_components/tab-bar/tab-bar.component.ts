import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';


@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.scss'],
  standalone: true,
  imports: [IonicModule,RouterLink,CommonModule,FormsModule, RouterModule]
})
export class TabBarComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
