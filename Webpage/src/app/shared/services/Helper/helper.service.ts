import { Injectable, Output } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { FormElement, ConditionType, Formular, FormElementCondition, Condition } from '../../interfaces/form.interface';
import { FormTypes } from '../../enums/FormElement.enum';
import { State } from '../../classes/states/states';

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

  isValid(formElement: FormElement): boolean {
    let output: boolean;
    if (!formElement || !formElement.condition ) { return true}
    if (formElement.condition.conditionType === ConditionType.any) {
      output = false;
      formElement.condition.conditions.map(condition => {
        if (condition.do(formElement.value)) {
          output = true;
        }
      })
      
    } else {
      output = true;
      formElement.condition.conditions.map(condition => {
        if (!condition.do(formElement.value)) {
          output = false;
        }
      })
    }
    if (formElement.required && !formElement.value) {
      output = false;
    }
    return output;
  }

  getFormElementByLabel(label: string, formular: Formular): FormElement {
    let output: FormElement;
    formular.formElements.map(el => {
      if (el.label === label) {
        output = el;
        return output
      }
    })
    return output
  }

  getFormElementByApiId(id: string, formular: Formular): FormElement {
    let output: FormElement;
    formular.formElements.map(el => {
      if (el.apiId === id) {
        output = el;
      }
    })
    return output
  }

  numberToFormType(value: number): FormTypes{
    switch (value) {
      case 1:
        return FormTypes.textField
      case 2:
        return FormTypes.textLine
      case 3:
        return FormTypes.textArea
      case 4:
        return FormTypes.date
      case 5:
        return FormTypes.number
      case 6:
        return FormTypes.checkbox
      case 7:
        return FormTypes.select
      case 8:
        return FormTypes.range
      case 9:
        return FormTypes.document      
    }
    return FormTypes.textField
  }


  createFormElement(value: string, label: string, required: boolean, formType: FormTypes, valid: boolean, id: string = null, description: string = null ): FormElement {
    const formElement = {} as FormElement;
    formElement.value = value;
    if (!!id) {
      formElement.apiId = id;
    } else {
      formElement.apiId = this.getRrandomId();
    }
    formElement.valid = valid;
    formElement.label = label;
    formElement.required = required;
    formElement.formType = formType;
    formElement.description = description;
    formElement.condition = this.defaultFormCondition();
    return formElement;
  }

  defaultFormCondition(): FormElementCondition {
    const condition = {} as Condition;
    condition.do = () => true;
    const defaultCondition = {} as FormElementCondition;
    defaultCondition.conditions = [condition];
    defaultCondition.state = new State(true);
    return defaultCondition;
  }


}
