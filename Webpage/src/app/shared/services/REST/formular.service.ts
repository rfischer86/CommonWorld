import { Injectable } from '@angular/core';
import { Result } from 'src/app/shared/classes/result/result';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/REST/rest.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from 'src/app/shared/interfaces/rest.interface';
import { Search } from '../../interfaces/search.interface';
import { Formular } from '../../interfaces/form.interface';

@Injectable({
  providedIn: 'root'
})
export class FormularService {
  baseURL = environment.apiURL+ environment.api.formulars
  constructor(
    private http: HttpClient,
    private restService: RestService
  ) { }

  post(data: Formular): Observable<RestResponse<Formular>> {
    const header = this.restService.getHeaders();
    return this.http.post<RestResponse<Formular>>(this.baseURL,data, header);
  }

  update(data: Formular): Observable<RestResponse<Formular>> {
    const header = this.restService.getHeaders();
    return this.http.put<RestResponse<Formular>>(this.baseURL, data, header);
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
    console.log(search)
    if (!search.searchString) { return; }
    const header = this.restService.getHeaders();
    const url =  environment.apiURL+ environment.api.formularSearch;
    return this.http.post<RestResponse<Formular>>(url,search, header);
  }
}
