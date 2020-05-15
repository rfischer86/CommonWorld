import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpParams, HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { throwError as observableThrowError,  throwError as _throw, Observable  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestHeader, RestService } from './rest.service';
import { Result } from '../../classes/result/result';
import { Authenticate } from '../../interfaces/auth.interface';
import { User } from '../../interfaces/user.interface';
import { RestResponse } from '../../interfaces/rest.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL
  constructor(
    private http: HttpClient,
    private restService: RestService
  ) { }

  auth(data: Authenticate): Observable<RestResponse<User>> {
    const header = this.restService.getHeaders({}, 'application/json', false);
    const url = this.authURL + environment.auth.authenticate
    return this.http.post<RestResponse<User>>(url, data, header);
  }
}
