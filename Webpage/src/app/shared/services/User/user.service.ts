import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { BehaviorSubject } from 'rxjs';
import { States } from '../../classes/states/states';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = {} as User;
  userObservable = new BehaviorSubject<User>(this.user);
  states = new States();
  constructor() { }

  getUser(): User {
    return this.user;
  }

  isLoggedin(): boolean {
    return this.states.loggedIn.value;
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

}
