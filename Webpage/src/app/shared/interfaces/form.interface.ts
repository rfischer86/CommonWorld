import { FormTypes } from '../enums/FormElement.enum';
import { State } from '../classes/states/states';
import { Logger } from '../classes/Logger/logger';
import { WidthClass } from '../enums/WidthClass';
import { Injectable } from '@angular/core';
import { Helper } from '../services/Helper/helper.service';
import { FormularHandlerElement, FormularHandlerList } from '../components/content/content-nodes/formular-node/formular/formularHandler.class';

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
export class FormElementClass implements FormElement{
  label = '';
  value = null;
  valid = false;
  formType = FormTypes.textField
  description = '';
  required = false;
  default = '';
  unit = '';
  condition = null;
  apiId: string;
  version = '';
  metaData = '';
  widthClass = WidthClass.w100;

  constructor(data: FormElement = {} as FormElement) {
    this.set(data)
  }

  createRandomApiId(){
    this.apiId = new Helper().getRrandomId()
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

  set(data:FormElement) {
    this.label      = data.label ? data.label : this.label;
    this.value      = data.value ? data.value : this.value;
    this.valid      = data.valid ? data.valid : this.valid;
    this.formType   = data.formType ? data.formType : this.formType;
    this.description= data.description ? data.description : this.description;
    this.required   = data.required ? data.required : this.required;
    this.default    = data.default ? data.default : this.default;
    this.unit       = data.unit ? data.unit : this.unit;
    this.condition  = data.condition ? data.condition : this.condition;
    this.version    = data.version ? data.version : this.version;
    this.metaData   = data.metaData ? data.metaData : this.metaData;
    this.widthClass = data.widthClass ? data.widthClass : this.widthClass;
    this.apiId      = data.apiId ? data.apiId : this.apiId;
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
  parentFormularId;
  version =  '0.0.1';
  handler: FormularHandlerElement[];
  handlerList: FormularHandlerList;
  userId =  '';
  timeStamp =  new Date();
  isValid =  false;
  formElements =  [] as FormElement[];
  subFormulars =  [] as Formular[];
  description = ''

  constructor(data: Partial<Formular> = {}) {
    this.set(data);
  }

  get(): Formular{
    const output = {} as Formular;
    output.activ = this.activ;
    output.apiId = this.apiId;
    output.local = this.local;
    output.log = this.log;
    output.version = this.version;
    output.isValid = this.isValid;
    output.userId = this.userId;
    output.timeStamp = this.timeStamp;
    output.handler = this.handler;
    output.formElements = this.formElements;
    output.subFormulars = this.subFormulars;
    output.name = this.name;
    output.handler = this.handlerList.get();
    output.description = this.description;
    return output;
  }

  set(data: Partial<Formular>) {
    if (!data) {return;}
    this.activ = data.activ ? data?.activ : this.activ;
    this.apiId = data.apiId? data.apiId : this.apiId;
    this.local = data.local? data.local : this.local;
    // this.parentFormularId = data.parentFormularId? data.parentFormularId : this.parentFormularId;
    this.version = data.version? data.version : this.version;
    this.isValid = data.isValid? data.isValid : this.isValid;
    this.userId = data.userId? data.userId : this.userId;
    this.timeStamp = data.timeStamp? data.timeStamp : this.timeStamp;
    this.handler = data.handler ? data.handler : this.handler;
    this.handlerList = new FormularHandlerList(this.handler);
    this.log = data.log? data.log : this.log;
    if (data.formElements) {
      this.formElements = [];
      data.formElements.map(formElement => this.formElements.push(
        new FormElementClass(formElement).get())
        );
    }
    if (data.subFormulars) {
      this.subFormulars = [];
      data.subFormulars.map(subFormular => this.subFormulars.push(
        new FormularClass(subFormular).get()
      ));
    }
    this.subFormulars = data.subFormulars? data.subFormulars : this.subFormulars;
    this.name = data.name ? data.name : this.name;
    this.description = data.description ? data.description : this.description;
  }

  addFormElement(data: FormElement) {
    const formElement = new FormElementClass(data).get();
    this.formElements.push(formElement);
  }

  addHandler(handler: FormularHandlerElement): void {
    this.handlerList.addHandler(handler)
  }
  setHandlerList(handlerList: FormularHandlerList): void {
    this.handlerList = handlerList;
  }

  getFormElements(): FormElement[] {
    return this.formElements;
  }

  addSubFormularsToTreeId(treeId: string[]): string[][] {
    const treeIds = [];
    this.subFormulars.map((el => {
      const subTreeId = treeId;
      subTreeId.push(el.apiId);
      treeIds.push(subTreeId)
    }))
    return treeIds;
  }
}

export interface Formular {
  name: string;
  description: string;
  log: Logger;
  apiId: string;
  activ: boolean;
  local: boolean;
  handler: FormularHandlerElement[];
  // parentFormularId: string;
  version: string;
  userId: string;
  timeStamp: Date;
  isValid: boolean;
  formElements: FormElement[];
  subFormulars: Formular[];
}


export interface ShortFormular {
  name: string;
  description: string;
  apiId: string;
  activ: boolean;
  local: boolean;
  isValid: boolean;
  formElements: FormElement[];
  subFormulars: string[][];
}
