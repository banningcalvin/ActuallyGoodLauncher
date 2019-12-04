import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  gameToAdd = {
    title: '',
    price: '',
    description: '',
    icon: '',
    background: '',
    releaseDate: '',
    //whatever else is part of a game
  }


  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.apiService.addGame(
      this.gameToAdd.title, 
      this.gameToAdd.description, 
      this.gameToAdd.icon, 
      this.gameToAdd.background, 
      this.gameToAdd.releaseDate).subscribe((data) => {
        //TODO: game is added successfully, nice
        console.log('Game added successfully!');
        this.router.navigateByUrl('/store');
    }, (error) => {
      console.log('Error adding game...');
      console.log(error);
    });
  }

}
