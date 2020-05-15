import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class Helper {
  tokenFromUI = '0123456789123456';

  request: string;
  responce: string;

  constructor() { }

  getRrandomId(): string {
    return Math.floor(Math.random() * 10 ** 10).toString();
  }

  getToken(): string {
    return 'Bearer ' + this.decrypt(sessionStorage.getItem('token'));
  }

  setToken(token: string): void {
    sessionStorage.setItem('token', this.encrypt(token));
  }

  deleteToken(): void {
    sessionStorage.removeItem('token');
  }

  encrypt(input: string): string {
    const _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    const _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    const encrypted = CryptoJS.AES.encrypt(
      input, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    return encrypted.toString();
  }

  decrypt(input: string): string {
    if(!input) {return};
    const _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    const _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    const decrypted = CryptoJS.AES.decrypt(
      input, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }
}
