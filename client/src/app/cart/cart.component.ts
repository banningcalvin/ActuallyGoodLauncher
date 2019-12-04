import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = [];

  constructor(private cartService: CartService, private apiService: ApiService) { }

  ngOnInit() {
    this.items = this.cartService.getItems();
  }

  purchaseGames(){
    this.items.forEach((item) => {
      this.apiService.buyGame(item.title).subscribe((data) => {
        console.log("Bought successfully");
        console.log(data);
      }, (error) => {
        console.log("Error buying game (cart)");
        console.log(error);
      });
      this.apiService.buyGame(item.title).subscribe((data) => {
        console.log("Bought successfully");
        console.log(data);
      }, (error) => {
        console.log("Error buying game (cart)");
        console.log(error);
      });
    });
  }

}
