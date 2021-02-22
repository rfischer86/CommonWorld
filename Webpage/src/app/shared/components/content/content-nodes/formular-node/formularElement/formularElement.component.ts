import { Component, Input, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { DOMElement, DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { FormElement, ShortFormular } from 'src/app/shared/interfaces/form.interface';
import { Text } from '../../../../../../../assets/i18n/app.text';
import { FormTypes } from 'src/app/shared/enums/FormElement.enum';
import { State, States } from 'src/app/shared/classes/states/states';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { Helper } from 'src/app/shared/services/Helper/helper.service';





@Component({
  selector: 'app-formular-element',
  templateUrl: './formularElement.component.html',
  styleUrls: ['./formularElement.component.scss']
})
export class FormularElementComponent implements AfterViewInit, OnDestroy {
  @Input() zIndexStart = 1000;
  @Input() defaultElement = true;
  @Input() parentId;
  @Input() parentApiId;
  @Input() notEditable: boolean;
  @Input() set setContentData(data ) {
    console.log('data', data)
    if (!!data) {
      this.treeId = data;
    }
  }

  treeId: string[];
  shortFormular: ShortFormular;
  formType: FormTypes;
  formTypes = FormTypes;
  text = new Text();
  DOMid: string;
  logger = new Logger();
  DOMself: DOMElement;
  state = new States();
  dbClickElement = new State(false);

  constructor(
    private DOM: DOMService,
    private helper: Helper,
    private cdr: ChangeDetectorRef
    ) {

   }


  ngAfterViewInit () {
    const _ = this.DOM.create(DOMTypes.formularNode, this.parentId);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMid = this.DOMself.id;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event));
    }
    this.getFormData();
    this.cdr.detectChanges();
  }

  processDOMEvent(event: Result<any, any>) {
    if (!event) {return}
    switch(event.fromType) {
      case DOMTypes.formulaDataNode:
        this.processFormularDataNode(event);
        break;
      case DOMTypes.formElement:
        this.updateFormElement(event);
        break;
    }
  }

  processFormularDataNode(event: Result<any, ShortFormular>) {
    switch(event.action) {
      case ActionType.get:
        this.shortFormular = event.output;
    }
  }

  updateFormElement(event: Result<any, FormElement>) {
    this.shortFormular.formElements.map( (el, index) => {
      if (el.apiId === event.output.apiId) {
        // I don't understand why element is alreay up to date
        // and I do not need the next line
        this.shortFormular.formElements[index] = event.output;
        this.logger.addLog('update ' +event.output.label + ' by value ' + event.output.value);
      }
    })
  };

  getFormData() {
    const _ = new  Result<any, any>();
      _.toId = this.treeId[0];
      _.fromId = this.DOMid;
      _.fromType = DOMTypes.formularNode;
      _.action = ActionType.get;
      _.input = this.treeId;
      this.DOM.processEvent(_);
  }

  updateFormDataFormElement(formElement: FormElement) {
    const _ = new  Result<any, any>();
      _.toId = this.treeId[0];
      _.fromId = this.DOMid;
      _.fromType = DOMTypes.formElement;
      _.action = ActionType.update;
      // _.option = FormDataActionType.formElement;
      _.input = this.treeId;
      _.output = formElement;
      this.DOM.processEvent(_);
  }

  isFormValid() {
    let isValid = true;
    this.shortFormular.formElements.map( el => {
      if (!!el && el.valid === false) {
        isValid = false;
        console.log(' form element ' + el.label + ' is not valid')
        console.log(el.valid, !el.valid +'')
        this.logger.addLog(' form element ' + el.label + ' is not valid');
      }
    })
    this.shortFormular.isValid=isValid;
  }



  updateElement(data: any): void{
    if (this.notEditable) {return}
    if (this.dbClickElement.isFalse()) {
      this.dbClickElement.setTrue();
      setTimeout(() => this.dbClickElement.setFalse(), 300);
    } else {
      const _ = new  Result<any, any>();
      _.toId = DOMTypes.overlay;
      _.fromId = this.DOMid;
      _.option = OverlayTypes.addFormElement;
      _.option2 = ActionType.update;
      _.action = ActionType.open;
      _.input = data;
      this.DOM.processEvent(_);
    }
  }


  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMself.id;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }

}
