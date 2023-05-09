import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabBarComponent } from '../_components/tab-bar/tab-bar.component';
import { ItemService } from '../_services/item/item.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.page.html',
  styleUrls: ['./browse.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, TabBarComponent , RouterLink]
})
export class BrowsePage {

  constructor(private itemService : ItemService) { }

  ionViewWillEnter() {

  }

  search() {
    if(this.searchText === ""){
      this.isSearch = false;
      return
    }
    else {
      this.isSearch = true;
    }
    this.itemService.searchItemList({search : this.searchText}).subscribe((items : any) =>{
      console.log(items)
      this.isSearch = true;
      this.Items = items;
    })
  }

  display() {
    if(this.searchText === ""){
      this.isSearch = false;
      this.searchText = '';
      this.onEnter = false;
      this.displayItems = [];
      this.Items = [];
    }
    if(this.searchText !== ""){
      this.displayItems = this.Items;
      this.onEnter = true;
      this.isSearch = false;
    }
  }

  isSearch = false;
  searchText = "";
  Items : any  = [];
  displayItems : any = [];
  onEnter = false;

}
