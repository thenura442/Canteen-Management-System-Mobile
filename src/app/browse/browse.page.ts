import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabBarComponent } from '../_components/tab-bar/tab-bar.component';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabBarComponent]
})
export class BrowsePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
