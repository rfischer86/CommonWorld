import { Injectable } from '@angular/core';
import { Result } from 'src/app/shared/classes/result/result';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/REST/rest.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from 'src/app/shared/interfaces/rest.interface';
import { ArcordeonData } from '../../classes/arcordeonData/arcordeon.data';

@Injectable({
  providedIn: 'root'
})
export class ArcordeonService {

  urlKey = environment.api.nav;
  apiURL = environment.apiURL + environment.api.arcordeon
  constructor(
    private http: HttpClient,
    private restService: RestService
  ) { }

  create(data: ArcordeonData): Observable<Result<ArcordeonData,any>> {
    const header = this.restService.getHeaders();
    const url = environment.apiURL + environment.api.nav
    return this.http.post<Result<ArcordeonData,any>>(url,data, header);
  }

  update(data: ArcordeonData): Observable<Result<ArcordeonData,any>> {
    const header = this.restService.getHeaders();
    return this.http.put<Result<ArcordeonData,any>>(this.apiURL, data, header);
  }

  addItem(parentId: string, childId: string): Observable<Result<ArcordeonData,any>> {
    const header = this.restService.getHeaders();
    const url = this.apiURL + '/' + parentId + '/add/' + childId;
    return this.http.put<Result<ArcordeonData,any>>(url, null, header);
  }

  deleteItem(parentId: string, childId: string): Observable<Result<ArcordeonData,any>> {
    const header = this.restService.getHeaders();
    const url = this.apiURL + '/' + parentId + '/delete/' + childId;
    return this.http.put<Result<ArcordeonData,any>>(url, null, header);
  }

  get(id: string): Observable<RestResponse<ArcordeonData>> {
    const header = this.restService.getHeaders();
    const url = this.apiURL + '/' + id;
    return this.http.get<RestResponse<ArcordeonData>>(url, header);
  }

  delete(id: string): Observable<Result<ArcordeonData,any>> {
    const header = this.restService.getHeaders();
    const url = this.apiURL + '/' + id;
    return this.http.delete<Result<ArcordeonData,any>>(url, header);
  }
}
