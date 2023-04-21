import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ItemService } from '../_services/item/item.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../_services/cart/cart.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ItemPage {

  item_code = "";
  item: any = "";

  constructor(private itemService : ItemService, private activatedRoute : ActivatedRoute, private cartService: CartService) {
    this.activatedRoute.params.subscribe(parameter => {
      this.item_code = parameter['id']
      console.log(this.item_code)
    })
   }

   ionViewWillEnter(){
    this.itemService.getItem({id: this.item_code}).subscribe((result : any) => {
      console.log(result);

    })
  }

}
