import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //private headers = new Headers({'Content-Type': 'application/json'});
  //TODO: use environments to provide API url instead of this lol
  //apiUrl: 'http://localhost:3000';

  //tmp: any = {};
  authSubject = new BehaviorSubject(false);
  authState = false;
  userObject = null;

  constructor(private http: HttpClient) {

  }

  public getGames(){
    //console.log('inside API service');
    return this.http.get(
      'http://localhost:3000/games',
      );
  }

  public getGame(gameID: string){
    return this.http.get(
      'http://localhost:3000/games/' + gameID,
    );
  }

  public getUserObjectClientside(){
    return this.userObject;
  }

  public signIn(username: string, password: string){
    let header = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/account/login', {email: username, password: password}, {headers: header}).pipe(
      tap(async (res) => {
        //let uhh: any = res;
        let tmp: any = res;
        if(tmp.user){
          console.log("API Service is setting TOKEN and USER in local storage...");
          console.log(tmp);
          this.userObject = tmp.user;
          localStorage.setItem("TOKEN", tmp.token);
          localStorage.setItem("USER", tmp.user);
          this.authSubject.next(true);
          this.authState = true;
        }
      })
    );
  }
  public signOut(){
    console.log(localStorage.getItem("USER"));
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("USER");
    this.authSubject.next(false);
    this.authState = false;
  }
  public register(){

  }
  public isAuthenticated(){
    return this.authSubject.asObservable();
  }

  public getAuthState(){
    return this.authState;
  }

  public getUsers(){
    console.log('Token:', localStorage.getItem("TOKEN"));
    return this.http.get('http://localhost:3000/account/users', {headers: {'Authorization': localStorage.getItem("TOKEN")}});
  }

}