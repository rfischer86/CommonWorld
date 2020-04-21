import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { throwError as observableThrowError,  throwError as _throw  } from 'rxjs';
import { environment } from 'src/environments/environment';


export interface RestHeader {
  headers: HttpHeaders;
  params?: HttpParams;
}


@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    protected translationService: TranslateService,
    ) { }

  getHeaders(params: {[key: string]: string} = null, mimeType = 'application/json'): RestHeader {
    const header = {} as RestHeader;
    header.headers = new HttpHeaders({
      'Content-Type': mimeType,
      'Accept-Language': 'de',
    });
    if (this.translationService != null && this.translationService.currentLang != null) {
      header.headers = header.headers.set('Accept-Language', this.translationService.currentLang);
    }
    if (params) {
      header.params = this.getParams(params);
    }
    return header;
  }

  getParams(params: {[key: string]: string}): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).map( key => {
      httpParams = httpParams.append(key, params[key]);
    });
    return httpParams;
  }

  // tslint:disable-next-line:no-any
  protected handleError(err: HttpErrorResponse | any) {
    console.log(err);
    let errorMessage = '';
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      if (err.error) {
        if (err.error.email) {
          errorMessage = err.error.email[0];
          return observableThrowError(errorMessage);
        }
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = err.error.Message;
        if (errorMessage) {
          return observableThrowError(errorMessage);
        } else {
          return observableThrowError(err);
        }
      }

      if (err.statusText) {
        return observableThrowError(err.statusText);
      }

      return observableThrowError('');
    }
  }

}
