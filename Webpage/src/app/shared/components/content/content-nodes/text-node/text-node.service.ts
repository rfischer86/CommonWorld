import { Injectable } from '@angular/core';
import { Result } from 'src/app/shared/classes/result/result';
import { Observable } from 'rxjs';
import { RestService } from 'src/app/shared/services/REST/rest.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RestResponse } from 'src/app/shared/interfaces/rest.interface';
import { TextNode } from '../../../../interfaces/text-node.interface';
import { Search } from 'src/app/shared/interfaces/search.interface';

@Injectable({
  providedIn: 'root'
})
export class TextNodeService {

  baseURL = environment.apiURL + environment.api.content.text
  constructor(
    private http: HttpClient,
    private restService: RestService
  ) { }

  post(event: Result<string, any>): Observable<RestResponse<string>> {
    const header = this.restService.getHeaders();
    return this.http.post<RestResponse<string>>(this.baseURL,event.input, header);
  }

  update(event: Result<string, any>): Observable<RestResponse<TextNode>> {
    const header = this.restService.getHeaders();
    const body = {} as TextNode;
    body.contentData = event.input;
    body.apiId = event.toApiId;
    return this.http.put<RestResponse<TextNode>>(this.baseURL, body, header);
  }

  get(id: string): Observable<RestResponse<TextNode>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + '/' + id;
    return this.http.get<RestResponse<TextNode>>(url, header);
  }

  delete(id: string): Observable<RestResponse<TextNode>> {
    const header = this.restService.getHeaders();
    const url = this.baseURL + '/' + id;
    return this.http.delete<RestResponse<TextNode>>(url, header);
  }

  search(search: Search): Observable<RestResponse<TextNode>> {
    if (!search.searchString) { return; }
    const header = this.restService.getHeaders();
    const url = this.baseURL + environment.api.search;
    return this.http.post<RestResponse<TextNode>>(url,search, header);
  }
}
