import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  getRrandomId(): string {
    return Math.floor(Math.random() * 10 ** 10).toString();
  }
}
