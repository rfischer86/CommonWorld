import { FormTypes } from '../enums/FormElement.enum';
import { State } from '../classes/states/states';
import { Logger } from '../classes/Logger/logger';
import { WidthClass } from '../enums/WidthClass';
import { Injectable } from '@angular/core';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { Helper } from '../services/Helper/helper.service';

export interface FormElement{
  label: string;
  value: any;
  valid: boolean;
  formType: FormTypes
  description: string;
  required: boolean;
  default: string;
  unit: string;
  condition: FormElementCondition;
  apiId: string;
  version: string;
  metaData: string;
  widthClass: WidthClass;
}

@Injectable()
export class FormElementClass{
  label = '';
  value = null;
  valid = false;
  formType = FormTypes.textField
  description = '';
  required = false;
  default = '';
  unit = '';
  condition = null;
  apiId = new Helper().getRrandomId();
  version = '';
  metaData = '';
  widthClass = WidthClass.w25;

  constructor(data: FormElement = {} as FormElement) {
    this.label = data?.label;
    this.value = data?.value;
    this.valid = data?.valid;
    this.formType = data?.formType
    this.description = data?.description;
    this.required = data?.required;
    this.default = data?.default;
    this.unit = data?.unit;
    this.condition = data?.condition;
    this.apiId = data?.apiId;
    this.version = data?.version;
    this.metaData = data?.metaData;
    this.widthClass = data?.widthClass;
  }

  get(): FormElement{
    const output = {} as FormElement;
    output.label = this.label;
    output.value = this.value;
    output.valid = this.valid;
    output.formType = this.formType;
    output.description = this.description;
    output.required = this.required;
    output.default = this.default;
    output.unit = this.unit;
    output.condition = this.condition;
    output.apiId = this.apiId;
    output.version = this.version;
    output.metaData = this.metaData;
    output.widthClass = this.widthClass;
    return output;
  }
}




export interface FormElementCondition{
  label: string;
  state: State;
  formType: FormTypes;
  conditionType: ConditionType;
  conditions: Condition[];
}

export interface Condition{
  do: (value) => boolean;
}




export enum ConditionType {
  all = 'all',
  any = 'any'
}


@Injectable()
export class FormularClass implements Formular{
  name ='';
  log =  new Logger();
  apiId =  '';
  activ =  false;
  local =  true;
  parentFormularId =  '';
  version =  '0.0.1';
  userId =  '';
  timeStamp =  new Date();
  isValid =  false;
  formElements =  [] as FormElement[];
  subFormulars =  [] as Formular[];
  description = ''

  constructor() {
  }

  get(): Formular{
    const output = {} as Formular;
    output.activ = this.activ;
    output.apiId = this.apiId;
    output.local = this.local;
    output.log = this.log;
    output.parentFormularId = this.parentFormularId;
    output.version = this.version;
    output.isValid = this.isValid;
    output.userId = this.userId;
    output.timeStamp = this.timeStamp;
    output.formElements = this.formElements;
    output.subFormulars = this.subFormulars;
    output.name = this.name;
    output.description = this.description;
    return output;
  }

  addFormElement(data: FormElement) {
    const formElement = new FormElementClass(data).get();
    this.formElements.push(formElement);
  }

}

export interface Formular {
  name: string;
  description: string;
  log: Logger;
  apiId: string;
  activ: boolean;
  local: boolean;
  parentFormularId: string;
  version: string;
  userId: string;
  timeStamp: Date;
  isValid: boolean;
  formElements: FormElement[];
  subFormulars: Formular[];
}