import { Injectable } from '@angular/core';
import { Result } from 'src/app/shared/classes/result/result';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/REST/rest.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from 'src/app/shared/interfaces/rest.interface';
import { Search } from '../../interfaces/search.interface';
import { Formular } from '../../interfaces/form.interface';
import { Table } from '../../interfaces/table.interface';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  baseURL = environment.apiURL+ environment.api.table
  constructor(
    private http: HttpClient,
    private restService: RestService
  ) { }

  post(data: Table): Observable<RestResponse<Table>> {
    const header = this.restService.getHeaders();
    return this.http.post<RestResponse<Table>>(this.baseURL,data, header);
  }

  update(data: Table): Observable<RestResponse<Table>> {
    const header = this.restService.getHeaders();
    return this.http.put<RestResponse<Table>>(this.baseURL, data, header);
  }

  get(id: string): Observable<RestResponse<Table>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + '/' + id;
    return this.http.get<RestResponse<Table>>(url, header);
  }

  delete(id: string): Observable<RestResponse<Table>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + '/' + id;
    return this.http.delete<RestResponse<Table>>(url, header);
  }

  search(search: Search): Observable<RestResponse<Table>> {
    console.log(search)
    if (!search.searchString) { return; }
    const header = this.restService.getHeaders();
    const url =  environment.apiURL+ environment.api.formularSearch;
    return this.http.post<RestResponse<Table>>(url,search, header);
  }
}
