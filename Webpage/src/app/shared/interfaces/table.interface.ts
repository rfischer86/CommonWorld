import { Injectable } from '@angular/core';
import { FormTypes } from '../enums/FormElement.enum';
import { Formular, FormularClass } from './form.interface';


@Injectable()
export class TableClass{
  formular = new FormularClass().get();
  data = [] as any[];
  apiId: '';

  get(): Table {
    const output = {} as Table;
    output.formular = this.formular;
    output.data = this.data;
    output.apiId = this.apiId;
    return output
  }
}



export interface Table{
  formular: Formular,
  data: any[],
  apiId: string;
}

