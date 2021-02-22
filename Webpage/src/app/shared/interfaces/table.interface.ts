import { Injectable } from '@angular/core';
import { FormTypes } from '../enums/FormElement.enum';
import { Helper } from '../services/Helper/helper.service';
import { Formular, FormularClass } from './form.interface';


@Injectable()
export class TableClass{
  formular: Formular;
  data = [] as any[];
  apiId: string;

  constructor(data: Table = {} as Table) {
    if (data.apiId) {
      this.apiId = data.apiId;
    } else {
      this.apiId = new Helper().getRrandomId();
    }
    if (data.formular) {
      this.formular = data.formular
    } else {
      this.formular = new FormularClass().get()
    }
    this.data = data?.data;
  }

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

