import { Injectable } from '@angular/core';
import { Result } from 'src/app/shared/classes/result/result';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/REST/rest.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from 'src/app/shared/interfaces/rest.interface';
import { Role } from '../../interfaces/role.interface';
import { Search } from '../../interfaces/search.interface';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  baseURL = environment.authURL + environment.auth.roles
  constructor(
    private http: HttpClient,
    private restService: RestService
  ) { }

  post(data: Role): Observable<RestResponse<Role>> {
    const header = this.restService.getHeaders();
    return this.http.post<RestResponse<Role>>(this.baseURL,data, header);
  }

  update(data: Role): Observable<RestResponse<Role>> {
    const header = this.restService.getHeaders();
    return this.http.put<RestResponse<Role>>(this.baseURL, data, header);
  }

  deleteItem(parentId: string, childId: string): Observable<RestResponse<Role>> {
    const header = this.restService.getHeaders();
    return this.http.put<RestResponse<Role>>(this.baseURL, null, header);
  }

  get(id: string): Observable<RestResponse<Role>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + '/' + id;
    return this.http.get<RestResponse<Role>>(url, header);
  }

  delete(id: string): Observable<RestResponse<Role>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + '/' + id;
    return this.http.delete<RestResponse<Role>>(url, header);
  }
  search(searchData: Search): Observable<RestResponse<Role>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + 'search';
    return this.http.post<RestResponse<Role>>(url, searchData, header);
  }

}
