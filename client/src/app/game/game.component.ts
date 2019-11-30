import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { games } from '../games';
import { CartService } from '../cart.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  gameID: string;
  game;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private apiService: ApiService
    ) {
    
  }

  ngOnInit() {
    console.log('yeeeee');
    this.route.paramMap.subscribe(params => {
      console.log("Loading game with id: {" + params.get('id') + "}");
      this.gameID = params.get('id');
      this.apiService.getGame(this.gameID).subscribe((data) => {
        console.log(data);
        this.game = data;
      });
      //this.game = games[+params.get('id')];
    });
  }

  addToCart(game){
    window.alert('Your game has been added to your cart!');
    this.cartService.addToCart(game);
  }

}
