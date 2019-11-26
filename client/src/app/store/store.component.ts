import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { games } from '../games';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
  providers: [ApiService]
})

export class StoreComponent implements OnInit {
  featuredGame: Object;
  highlightedGames = [];
  listedGames = [];
  allGames;
  //games = games;

  constructor(private apiService: ApiService) {
    console.log('calling apiservice?');
    this.apiService.getGames().subscribe((data) => {
      console.log(data);
      this.allGames = data;
      if(this.allGames.length > 5){
        this.featuredGame = this.allGames[0];
        this.highlightedGames = this.allGames.slice(1, 5);
        this.listedGames = this.allGames.slice(5);
      }
      else{
        console.log("Store did not receive enough games, defaulting to generic example games");
        this.allGames = games;
        this.featuredGame = this.allGames[0];
        this.highlightedGames = this.allGames.slice(1, 6);
        this.listedGames = this.allGames.slice(6);
      }
    });
  }

  ngOnInit() {

  }

}
