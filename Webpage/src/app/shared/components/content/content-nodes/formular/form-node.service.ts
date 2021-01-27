import { Injectable } from '@angular/core';
import { Result } from 'src/app/shared/classes/result/result';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/REST/rest.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from 'src/app/shared/interfaces/rest.interface';
import { Search } from 'src/app/shared/interfaces/search.interface';
import { Formular } from 'src/app/shared/interfaces/form.interface';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormNodeService {

  baseURL = environment.apiURL + environment.api.content.form
  constructor(
    private http: HttpClient,
    private restService: RestService
  ) { }

  post(event: Result<string, any>): Observable<RestResponse<string>> {
    const header = this.restService.getHeaders();
    return this.http.post<RestResponse<string>>(this.baseURL,event.input, header);
  }

  update(event: Result<Form, any>): Observable<RestResponse<Formular>> {
    const header = this.restService.getHeaders();
    const body = event.input;
    console.log(body);
    return this.http.put<RestResponse<Formular>>(this.baseURL, body, header);
  }

  get(id: string): Observable<RestResponse<Formular>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + '/' + id;
    return this.http.get<RestResponse<Formular>>(url, header);
  }

  delete(id: string): Observable<RestResponse<Formular>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + '/' + id;
    return this.http.delete<RestResponse<Formular>>(url, header);
  }

  search(search: Search): Observable<RestResponse<Formular>> {
    if (!search.searchString) { return; }
    const header = this.restService.getHeaders();
    const url = this.baseURL + environment.api.search;
    return this.http.post<RestResponse<Formular>>(url,search, header);
  }
}
