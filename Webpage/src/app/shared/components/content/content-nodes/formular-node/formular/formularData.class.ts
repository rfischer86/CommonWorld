import { DOMTypes } from '../../../../../enums/DOMElement.enum';
import { Formular, FormularClass } from '../../../../../interfaces/form.interface';
import { DOMElement, DOMService } from '../../../../../services/DOM/dom-element.service';
import { Logger } from '../../../../../classes/Logger/logger';
import { ActionType, Result } from '../../../../../classes/result/result';
import { State } from '../../../../../classes/states/states';

export enum BreakCondition{
    first = 'first',
    all = 'all'
}

export enum DataNodeAction{
    add = 'add',
    delete = 'delete',
    update = 'update',
}

export class FormularDataService{
    formular: Formular;
    states = new State();

    parentId;
    DOMself: DOMElement;
    DOMid: string;
    logger = new Logger();

    constructor() {}

    setFormular(
        formular: Formular, parentId: string){
        this.formular = new FormularClass(formular).get()
    }

    processFormularModification(event: Result<any, any>) {
        if (!event){return};
        switch (event.type) {
            case DOMTypes.formElement:
                this.processFormElementEvent(event);
                break;
            case DOMTypes.formularNode:
                this.processForularEvent(event)
        }
    }

    private processForularEvent(event: Result<any, any>){
        switch(event.action){
            case ActionType.get:
            case ActionType.add:
            case ActionType.update:
            case ActionType.delete:
        }
    }

    private processFormElementEvent(event: Result<any, any>){
        switch(event.action){
            case ActionType.get:
            case ActionType.add:
            case ActionType.update:
            case ActionType.delete:
        }
    }

    private addFormular(idTree: string[], formular: Formular, breakCondition: BreakCondition): void {

    }

    private findFormular(idTree: string[], treeLevel: number, breakCondition: BreakCondition): Formular{
        switch(breakCondition){
            case BreakCondition.all:
                this.formular.subFormulars.map(el =>{
                    if (el.apiId === idTree[treeLevel]){

                    }
                })
                break;
            case BreakCondition.first:
                break;
        }
        return this.formular;
    }

  isFormValid() {
    let isValid = true;
    this.formular.formElements.map( el => {
      if (!!el && el.valid === false) {
        isValid = false;
        console.log(' form element ' + el.label + ' is not valid')
        console.log(el.valid, !el.valid +'')
        this.formular.log.addLog(' form element ' + el.label + ' is not valid');
      }
    })
    this.formular.subFormulars.map( el => {
      if (!!el && !el.isValid) {
        isValid = false;
        console.log(' formular ' + el.name + ' is not valid');
        this.formular.log.addLog(' formular ' + el.name + ' is not valid');
      }
    })
    this.formular.isValid = isValid;
    this.formular.log.addLog('toggle valid state of formular ' + this.formular.apiId);
  }

  }