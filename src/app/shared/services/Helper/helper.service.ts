import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Helper {

  constructor() { }

  getRrandomId(): string {
    return Math.floor(Math.random() * 10 ** 10).toString();
  }
}
