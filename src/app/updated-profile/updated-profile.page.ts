import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-updated-profile',
  templateUrl: './updated-profile.page.html',
  styleUrls: ['./updated-profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule , RouterLink]
})
export class UpdatedProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
