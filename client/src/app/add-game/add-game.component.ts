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
    //whatever else is part of a game
  }


  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  onSubmit(){

  }

}
