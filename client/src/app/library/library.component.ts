import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  providers: [ApiService]
})
export class LibraryComponent implements OnInit {
  User;
  ownedGames = [];
 /* 
  constructor(private apiService: ApiService) {
    console.log('calling apiservice?');
    this.apiService.getUsers().subscribe((data) => {
      console.log(data);
      console.log("apsiservice getUser")
      this.User = data[0];
      console.log(this.User);
      this.ownedGames = apiService.getGames().slice(5);
      console.log(this.ownedGames); 
  });
  */

 constructor(private apiService: ApiService) {
  console.log('calling apiservice?');
  this.apiService.getGames().subscribe((data) => {
    console.log(data);
    console.log("apiserveice getgames")
    this.User = data;
    this.ownedGames = this.User.slice(1, 5);
    console.log(this.ownedGames);
    });
}

  ngOnInit() {
  }

}
