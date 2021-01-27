import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpParams, HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { throwError as observableThrowError,  throwError as _throw, Observable  } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RestHeader, RestService } from './rest.service';
import { Result } from '../../classes/result/result';
import { Authenticate } from '../../interfaces/auth.interface';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL
  constructor(
    private http: HttpClient,
    private restService: RestService
  ) { }

  auth(data: Authenticate): Observable<Result<any,any>> {
    const header = this.restService.getHeaders();
    const url = this.authURL + environment.auth.authenticate
    return this.http.post<Result<any,any>>(url, data, header);
  }
}
