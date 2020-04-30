import { Injectable } from '@angular/core';
import { Result } from 'src/app/shared/classes/result/result';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/REST/rest.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from 'src/app/shared/interfaces/rest.interface';
import { Group } from '../../interfaces/group.interface';
import { User } from '../../interfaces/user.interface';
import { Role, RolesType } from '../../interfaces/role.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupUserLinkService {
  authURL = environment.authURL + environment.auth.groupUserLink
  constructor(
    private http: HttpClient,
    private restService: RestService
  ) { }

  post(group: Group, user: User, role: RolesType): Observable<RestResponse<Group>> {
    const header = this.restService.getHeaders();
    const url = environment.authURL + environment.api.nav
    const data = {user, group, role};
    return this.http.post<RestResponse<Group>>(url, data, header);
  }

  update(data: Group): Observable<RestResponse<Group>> {
    const header = this.restService.getHeaders();
    return this.http.put<RestResponse<Group>>(this.authURL, data, header);
  }

  addItem(parentId: string, childId: string): Observable<RestResponse<Group>> {
    const header = this.restService.getHeaders();
    const url = this.authURL + '/' + parentId + '/add/' + childId;
    return this.http.put<RestResponse<Group>>(url, null, header);
  }

  deleteItem(parentId: string, childId: string): Observable<RestResponse<Group>> {
    const header = this.restService.getHeaders();
    const url = this.authURL + '/' + parentId + '/delete/' + childId;
    return this.http.put<RestResponse<Group>>(url, null, header);
  }

  get(id: string): Observable<RestResponse<Group>> {
    const header = this.restService.getHeaders();
    const url = this.authURL + '/' + id;
    return this.http.get<RestResponse<Group>>(url, header);
  }

  delete(id: string): Observable<RestResponse<Group>> {
    const header = this.restService.getHeaders();
    const url = this.authURL + '/' + id;
    return this.http.delete<RestResponse<Group>>(url, header);
  }
}
