import { FormTypes } from '../enums/FormElement.enum';
import { State } from '../classes/states/states';
import { Logger } from '../classes/Logger/logger';
import { WidthClass } from '../enums/WidthClass';

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


export interface Formular {
  name: string;
  log: Logger;
  apiId: string;
  parentFormularId: string;
  version: string;
  userId: string;
  groupId: string;
  timeStamp: Date;
  isValid: boolean;
  formElements: FormElement[];
  subFormulars: Formular[];
}