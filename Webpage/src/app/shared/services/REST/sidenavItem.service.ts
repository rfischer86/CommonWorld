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

  create(data: NavData): Observable<RestResponse<NavData>> {
    const header = this.restService.getHeaders();
    const url = environment.apiURL + environment.api.nav
    return this.http.post<RestResponse<NavData>>(url,data, header);
  }

  update(data: NavData): Observable<RestResponse<NavData>> {
    const header = this.restService.getHeaders();
    const url = environment.apiURL + environment.api.nav
    return this.http.put<RestResponse<NavData>>(url, data, header);
  }

  addItem(parentId: string, childId: string): Observable<RestResponse<NavData>> {
    const header = this.restService.getHeaders();
    const url = environment.apiURL + environment.api.nav + '/' + parentId + '/add/' + childId;
    return this.http.put<RestResponse<NavData>>(url, null, header);
  }

  removeItem(parentId: string, childId: string): Observable<RestResponse<NavData>> {
    const header = this.restService.getHeaders();
    const url = environment.apiURL + environment.api.nav + '/' + parentId + '/remove/' + childId;
    return this.http.delete<RestResponse<NavData>>(url, header);

  }

  get(id: string): Observable<RestResponse<NavData>> {
    const header = this.restService.getHeaders();
    const url = environment.apiURL + environment.api.nav + '/' + id;
    return this.http.get<RestResponse<NavData>>(url, header);
  }

  delete(id: string): Observable<RestResponse<NavData>> {
    console.log('delete Nav ' + id);
    const header = this.restService.getHeaders();
    const url = environment.apiURL + environment.api.nav + '/' + id;
    return this.http.delete<RestResponse<NavData>>(url, header);
  }


}
