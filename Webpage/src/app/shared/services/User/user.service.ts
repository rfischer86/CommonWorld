import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { States } from '../../classes/states/states';
import { Authenticate } from '../../interfaces/auth.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../REST/rest.service';
import { Result } from '../../classes/result/result';
import { RestResponse } from '../../interfaces/rest.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = {} as User;
  userObservable = new BehaviorSubject<User>(this.user);
  states = new States();
  authURL = environment.authURL

  constructor(
    private http: HttpClient,
    private restService: RestService
  ) {
    this.states.loggedIn.setFalse();
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
    this.userObservable.next(this.user);
    if (this.user) {this.states.loggedIn.setTrue();}
    else { this.states.loggedIn.setFalse()}
  }

  isLoggedin(): boolean {
    return this.states.loggedIn.isTrue();
  }

  getUserSubscribtion(): BehaviorSubject<User> {
    return this.userObservable;
  }

  login(): void {
    this.user = {} as User;
    this.user.email = 'r@fischer.de';
    this.user.name = 'rico fischer';
    this.user.apiId = '999999999999999';
    this.userObservable.next( this.user) ;
    this.states.loggedIn.setTrue();
  }

  logout(): void {
    this.user = {} as User;
    this.userObservable.next( this.user) ;
    this.states.loggedIn.setFalse();
  }

  post(data: Authenticate): Observable<RestResponse<User>> {
    const header = this.restService.getHeaders();
    const url = this.authURL + environment.auth.users
    return this.http.post<RestResponse<User>>(url, data, header);
  }

}
