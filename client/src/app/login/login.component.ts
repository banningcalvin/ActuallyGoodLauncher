import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form = {
    username: '',
    password: ''
  }
  failedLogin;

  constructor(private router: Router, private apiService: ApiService) {

  }

  ngOnInit() {
  }

  testAuth(){
    this.apiService.getUsers().subscribe((data) => {
      console.log(data);
    },
    (error) => {
      console.log(error);
    });
  }

  onSubmit(){
    console.log("Credentials: ", this.form.username, this.form.password);
    this.apiService.signIn(this.form.username, this.form.password).subscribe((data) => {
      //this.router.navigateByUrl('library');
    }, (error) => {
      this.failedLogin = true;
      console.log(error);
    });
  }

}
