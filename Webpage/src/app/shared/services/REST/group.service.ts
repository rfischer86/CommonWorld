import { Injectable } from '@angular/core';
import { Result } from 'src/app/shared/classes/result/result';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/REST/rest.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from 'src/app/shared/interfaces/rest.interface';
import { Group } from '../../interfaces/group.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  baseURL = environment.authURL + environment.auth.groups
  constructor(
    private http: HttpClient,
    private restService: RestService
  ) { }

  post(data: Group): Observable<RestResponse<Group>> {
    const header = this.restService.getHeaders();
    return this.http.post<RestResponse<Group>>(this.baseURL,data, header);
  }

  update(data: Group): Observable<RestResponse<Group>> {
    const header = this.restService.getHeaders();
    return this.http.put<RestResponse<Group>>(this.baseURL, data, header);
  }

  deleteItem(parentId: string, childId: string): Observable<RestResponse<Group>> {
    const header = this.restService.getHeaders();
    return this.http.put<RestResponse<Group>>(this.baseURL, null, header);
  }

  get(id: string): Observable<RestResponse<Group>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + '/' + id;
    return this.http.get<RestResponse<Group>>(url, header);
  }

  delete(id: string): Observable<RestResponse<Group>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + '/' + id;
    return this.http.delete<RestResponse<Group>>(url, header);
  }
}
