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
  isLoggedIn = false;
  isDeveloper = false;
  isAdmin = false;

  constructor(private router: Router, private apiService: ApiService) {
    this.isLoggedIn = apiService.getAuthState();
    if(this.isLoggedIn){
      this.isDeveloper = apiService.getUserObjectClientside().profile.developer;
      this.isAdmin = apiService.getUserObjectClientside().profile.admin;
    }

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
      this.isLoggedIn = this.apiService.getAuthState();
      //console.log(this.apiService.getUserObjectClientside().profile.developer);
      this.isDeveloper = this.apiService.getUserObjectClientside().profile.developer;
      //console.log(this.isDeveloper);
      this.isAdmin = this.apiService.getUserObjectClientside().profile.admin;
      this.router.navigateByUrl('/store');
    }, (error) => {
      this.failedLogin = true;
      console.log(error);
    });
  }

  register() {
    alert("registered!")
    this.apiService.register(this.form.username, this.form.password);
  }

  logout(){
    this.apiService.signOut();
    this.isLoggedIn = this.apiService.getAuthState();
    this.isAdmin = false;
    this.isDeveloper = false;
  }

}
