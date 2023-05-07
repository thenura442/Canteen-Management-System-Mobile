import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-order-confirmed',
  templateUrl: './order-confirmed.page.html',
  styleUrls: ['./order-confirmed.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class OrderConfirmedPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
