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
import { Search } from '../../interfaces/search.interface';
import { Helper } from '../Helper/helper.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = {} as User;
  userObservable = new BehaviorSubject<User>(this.user);
  states = new States();
  authURL = environment.authURL
  baseURL = environment.authURL + environment.auth.users;

  constructor(
    private http: HttpClient,
    private restService: RestService,
    private helper: Helper
  ) {
    this.states.loggedIn.setFalse();
  }

  getUser(): User {
    return this.user;
  }

  setUser(user: User): void {
    this.user = user;
    this.userObservable.next(this.user);
    this.helper.setToken(this.user.token)
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


  update(data: User): Observable<RestResponse<User>> {
    const header = this.restService.getHeaders();
    return this.http.put<RestResponse<User>>(this.baseURL, data, header);
  }

  get(id: string): Observable<RestResponse<User>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + '/' + id;
    return this.http.get<RestResponse<User>>(url, header);
  }

  delete(id: string): Observable<RestResponse<User>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + '/' + id;
    return this.http.delete<RestResponse<User>>(url, header);
  }

  search(searchData: Search): Observable<RestResponse<User>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + '/search';
    return this.http.post<RestResponse<User>>(url, searchData, header);
  }


}
