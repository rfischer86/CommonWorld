import { Injectable } from '@angular/core';
import { FormularHandlerTypes, RelationTypes } from 'src/app/shared/enums/formularHandlerTypes';
import { FormElement, Formular } from 'src/app/shared/interfaces/form.interface';

export interface FormularHandlerElement {
  formularHandlerType: FormularHandlerTypes;
  relationType: RelationTypes;
  formElementApiId: string;
  formElementValue: any;
  oldApiId?: string;
  newApiId?: string;
  newFormular?: Formular;
  newFormElement?: FormElement;
  option1?: any;
  option2?: string;
}

// implements FormularHandlerElement
export class FormularHandlerElementClass{
  oldApiId: string;
  newApiId: string;
  formularHandlerType: FormularHandlerTypes;
  relationType: RelationTypes;
  newFormular: Formular;
  newFormElement: FormElement;
  formElementApiId: string;
  formElementValue: any;
  option1: string;
  option2: string;

  constructor(data: FormularHandlerElement = {} as FormularHandlerElement ){
    this.set(data)
  }

  set (data: Partial<FormularHandlerElement> ): void{
    this.newApiId = data.newApiId ? data.newApiId : this.newApiId;
    this.oldApiId = data.oldApiId ? data.oldApiId : this.oldApiId;
    this.newFormular = data.newFormular ? data.newFormular : this.newFormular;
    this.formularHandlerType = data.formularHandlerType ? data.formularHandlerType : this.formularHandlerType;
    this.relationType = data.relationType ? data.relationType : this.relationType;
    this.formElementApiId = data.formElementApiId ? data.formElementApiId : this.formElementApiId;
    this.newFormElement = data.newFormElement ? data.newFormElement : this.newFormElement;
    this.option1 = data.option1 ? data.option1 : this.option1;
    this.option2 = data.option2 ? data.option2 : this.option2;
  }

  get(): FormularHandlerElement{
    const output = {} as FormularHandlerElement;
    output.newApiId = this.newApiId;
    output.oldApiId = this.oldApiId;
    output.newFormular = this.newFormular;
    output.formElementApiId = this.formElementApiId;
    output.formElementValue = this.formElementValue;
    output.relationType = this.relationType;
    output.option1 = this.option1;
    output.option2 = this.option2;
    output.newFormElement = this.newFormElement;
    return output;
  }
}

export class FormularHandlerList {
  handlers: FormularHandlerElement[] = [];

  constructor(data: FormularHandlerElement[] = []) {
    this.set(data)
  }

  set(handlers: FormularHandlerElement[] =[] ):void {
    this.handlers = handlers ? handlers : this.handlers;
  }

  get(): FormularHandlerElement[] {
    return this.handlers;
  }

  addHandler(handler: FormularHandlerElement): void {
    this.handlers.push(new FormularHandlerElementClass(handler).get())
  }

  // processUpdatedFormElement(formElement: FormElement, formular: Formular) {
  // const handler = this.handlers.find(handlerElement => {
  //   if (formElement.apiId === handlerElement.formElementApiId) {
  //     switch(handlerElement.relationType) {
  //       case RelationTypes.notEqual:
  //         return formElement.value !== handlerElement.formElementValue
  //       case RelationTypes.equal:
  //         return formElement.value === handlerElement.formElementValue
  //       case RelationTypes.valueInList:
  //         handlerElement.formElementValue = handlerElement.formElementValue as any[];
  //         return handlerElement.formElementValue.indexOf(formElement.value)>-1;
  //       case RelationTypes.valueNotInList:
  //         handlerElement.formElementValue = handlerElement.formElementValue as any[];
  //         return handlerElement.formElementValue.indexOf(formElement.value) === -1;
  //       case RelationTypes.valueSmallerAs:
  //         handlerElement.formElementValue = handlerElement.formElementValue as number;
  //         return handlerElement.formElementValue > formElement.value;
  //       case RelationTypes.valueGreaterAs:
  //         handlerElement.formElementValue = handlerElement.formElementValue as number;
  //         return handlerElement.formElementValue < formElement.value;
  //       }
  //   }});
  //   formular = this.processHandler(formular, handler);
  //   return formular;
  // }

  // processHandler(formular: Formular, handler: FormularHandlerElement): Formular {
  //   switch(handler.formularHandlerType){
  //     case FormularHandlerTypes.addFormElement:
  //       formular = this.addFormElement(formular, handler);
  //       break;
  //     case FormularHandlerTypes.deleteFormElement:
  //       formular = this.deleteFormElement(formular, handler);
  //       break;
  //     case FormularHandlerTypes.replaceFormElement:
  //       formular = this.replaceFormElement(formular, handler);
  //       break;
  //     case FormularHandlerTypes.createOrReplaceFormElement:
  //       formular = this.createOrReplaceFormElement(formular, handler);
  //       break;
  //     case FormularHandlerTypes.deleteSubFormular:
  //       formular = this.deleteSubFormular(formular, handler);
  //       break;
  //     case FormularHandlerTypes.addSubFormular:
  //       formular = this.addSubFormular(formular, handler);
  //       break;
  //     case FormularHandlerTypes.replaceSubFormular:
  //       formular = this.replaceSubFormular(formular, handler);
  //       break;
  //     case FormularHandlerTypes.createOrReplaceSubFormular:
  //       formular = this.createOrReplaceSubFormular(formular, handler);
  //      break;
  //     case FormularHandlerTypes.deleteAllSubFormular:
  //       formular = this.deleteAllSubFormular(formular);
  //       break;
  //    }
  //   return formular;
  // }

  // private addFormElement(formular: Formular, handler: FormularHandlerElement): Formular {
  //   formular.formElements.push(handler.newFormElement)
  //   return formular;
  // }

  // private deleteFormElement(formular: Formular, handler: FormularHandlerElement): Formular {
  //   formular.formElements.find((el, index) => {
  //     if (el.apiId === handler.oldApiId){
  //       delete formular.formElements[index];
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })
  //   return formular;
  // }

  // private replaceFormElement(formular: Formular, handler: FormularHandlerElement): Formular {
  //   formular.formElements.find((el, index) => {
  //     if (el.apiId === handler.oldApiId){
  //       formular.formElements[index] = handler.newFormElement;
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })
  //   return formular;
  // }


  // private createOrReplaceFormElement(formular: Formular, handler: FormularHandlerElement): Formular {
  //   let replaceState = false;
  //   formular.formElements.find((el, index) => {
  //     if (el.apiId === handler.oldApiId){
  //       replaceState=true;
  //       formular.formElements[index] = handler.newFormElement;
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })
  //   if (!replaceState) {
  //     formular.formElements.push(handler.newFormElement);
  //   }
  //   return formular;
  // }


  // private addSubFormular(formular: Formular, handler: FormularHandlerElement): Formular {
  //   formular.subFormulars.push(handler.newFormular);
  //   return formular;
  // }

  // private deleteSubFormular(formular: Formular, handler: FormularHandlerElement): Formular {
  //   formular.subFormulars.find((el, index) => {
  //     if (el.apiId === handler.oldApiId){
  //       delete formular.subFormulars[index];
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })
  //   return formular;
  // }

  // private deleteAllSubFormular(formular: Formular): Formular {
  //   formular.subFormulars = []
  //   return formular;
  // }
  // private replaceSubFormular(formular: Formular, handler: FormularHandlerElement): Formular {
  //   formular.subFormulars.find((el, index) => {
  //     if (el.apiId === handler.oldApiId){
  //       formular.subFormulars[index] = handler.newFormular;
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })
  //   return formular;
  // }
  // private createOrReplaceSubFormular(formular: Formular, handler: FormularHandlerElement): Formular {
  //   let replaceState = false;
  //   formular.subFormulars.find((el, index) => {
  //     if (el.apiId === handler.oldApiId){
  //       replaceState=true;
  //       formular.subFormulars[index] = handler.newFormular;
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   })
  //   if (!replaceState) {
  //     formular.subFormulars.push(handler.newFormular);
  //   }
  //   return formular;
  // }

}
