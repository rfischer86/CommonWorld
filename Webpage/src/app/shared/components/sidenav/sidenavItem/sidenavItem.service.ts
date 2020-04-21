import { Injectable } from '@angular/core';
import { Result } from 'src/app/shared/classes/result/result';
import { NavData } from 'src/app/shared/classes/navData/nav.data';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/REST/rest.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from 'src/app/shared/interfaces/rest.interface';

@Injectable({
  providedIn: 'root'
})
export class SidenavItemService {

  urlKey = environment.api.nav;

  constructor(
    private http: HttpClient,
    private restService: RestService
  ) { }

  create(data: NavData): Observable<Result<NavData,any>> {
    const header = this.restService.getHeaders();
    const url = environment.baseURL + environment.api.nav
    console.log('create Nav ', data);
    return this.http.post<Result<NavData,any>>(url,data, header);
  }

  update(data: NavData): Observable<Result<NavData,any>> {
    console.log(data)
    const header = this.restService.getHeaders();
    const url = environment.baseURL + environment.api.nav
    return this.http.put<Result<NavData,any>>(url, data, header);
  }

  addItem(parentId: string, childId: string): Observable<Result<NavData,any>> {
    const header = this.restService.getHeaders();
    const url = environment.baseURL + environment.api.nav + '/' + parentId + '/add/' + childId;
    return this.http.put<Result<NavData,any>>(url, null, header);
  }

  removeItem(parentId: string, childId: string): Observable<Result<NavData,any>> {
    const header = this.restService.getHeaders();
    const url = environment.baseURL + environment.api.nav + '/' + parentId + '/remove/' + childId;
    console.log('url', url);
    return this.http.delete<Result<NavData,any>>(url, header);

  }

  get(id: string): Observable<RestResponse<NavData>> {
    const header = this.restService.getHeaders();
    const url = environment.baseURL + environment.api.nav + '/' + id;
    return this.http.get<RestResponse<NavData>>(url, header);
  }

  delete(id: string): Observable<Result<NavData,any>> {
    console.log('delete Nav ' + id);
    const header = this.restService.getHeaders();
    const url = environment.baseURL + environment.api.nav + '/' + id;
    return this.http.delete<Result<NavData,any>>(url, header);
  }


}
