import { Component, OnInit, Input, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { DOMElement, DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { FormElement, FormElementCondition, Condition, Formular } from 'src/app/shared/interfaces/form.interface';
import { Text } from '../../../../../../assets/i18n/app.text';
import { FormTypes } from 'src/app/shared/enums/FormElement.enum';
import { State, States } from 'src/app/shared/classes/states/states';
import { Button } from 'src/app/shared/interfaces/button';
import { HtmlState } from 'src/app/shared/enums/htmlStates';
import { ButtonTypes } from 'src/app/shared/enums/button.enum';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { Helper } from 'src/app/shared/services/Helper/helper.service';
import { UpdateFormularOption } from 'src/app/shared/enums/UpdateFormularOption.enum';
import { ContentTypes } from 'src/app/shared/enums/ContentType';

@Component({
  selector: 'app-form-node',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.scss']
})
export class FormularNodeComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() zIndexStart = 1000;
  @Input() defaultElement = true;
  @Input() propagateChange = false;
  @Input() parentId;
  @Input() parentApiId;
  @Input() notEditable: boolean;
  @Input() set setContentData(formular : Formular ){
    this.formular = formular;
    if (!this.formular) {
      this.formular = {} as Formular;
    }
    if(!this.formular.formElements) {
      this.formular.formElements = [] as FormElement[];
      if( this.defaultElement ){
        this.formular.formElements.push(this.defaultFormElement());
      }
    }
    if(!this.formular.log ) {
      this.formular.log = new Logger();
    }
  }
  formular: Formular;
  formType: FormTypes;
  formTypes = FormTypes;
  text = new Text();
  DOMid: string;
  logger = new Logger();
  DOMself: DOMElement;
  selectedApiId: string;
  addElementButton: Button[];
  state = new States();
  dbClickElement = new State(false);
  constructor(
    private DOM: DOMService,
    private helper: Helper,
    private cdr: ChangeDetectorRef
    ) {

   }

  ngOnInit() {
    this.addElementButton = this.createAddFormElementButton();
  }

  ngAfterViewInit () {
    if (this.parentApiId ) {
      this.formular.apiId = this.parentApiId;
    } else {
      this.formular.apiId = this.helper.getRrandomId();
    }
    const _ = this.DOM.create(DOMTypes.formularNode, this.parentId);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMid = this.DOMself.id;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event));
    }
    this.cdr.detectChanges();
  }

  defaultFormElement(): FormElement {
    const defaultElement = {} as FormElement;
    defaultElement.value = '';
    defaultElement.label = this.text.contentNodes.formular.default;
    defaultElement.formType = FormTypes.textField;
    defaultElement.apiId = this.helper.getRrandomId();
    defaultElement.condition = this.defaultFormCondition();
    return defaultElement;
  }

  defaultFormCondition(): FormElementCondition {
    const condition = {} as Condition;
    condition.do = () => true;
    const defaultCondition = {} as FormElementCondition;
    defaultCondition.conditions = [condition];
    defaultCondition.state = new State(true);
    return defaultCondition;
  }

  processDOMEvent(event: Result<any, any>) {
    if (!event) {return}
    if (event.fromType !== DOMTypes.overlay && event.action === ActionType.update) {
      if (event.option === UpdateFormularOption.formElement ) {
        this.updateFormElement(event);
      }
      if (event.option === UpdateFormularOption.formular ) {
        this.updateFormular(event);
      }
    }

    if (event.fromType === DOMTypes.overlay) {
      if (event.action === ActionType.add) {
        this.formular.formElements.push(event.output);
        this.saveFormular();
      }
      if (event.action === ActionType.delete) {
        event.output = event.output as FormElement;
        this.formular.formElements = this.formular.formElements.filter(el => el.apiId !== event.output.apiId);
        this.saveFormular();
      }
      if (event.action === ActionType.update) {
        event.output = event.output as FormElement;
        this.formular.formElements.map((el, index) => {
          if (el.apiId === event.output.apiId) {
            this.formular.formElements[index] = event.output
          }
        });
        this.saveFormular();
      }
    }
  }

  saveFormular() {
    const _ = new  Result<any, any>();
    _.log = new Logger();
    _.log.addLog(ActionType.save + DOMTypes.formularNode);
    _.toId = this.parentId;
    _.toApiId = this.parentApiId
    _.fromType = DOMTypes.formularNode;
    _.input = this.formular;
    _.option = ContentTypes.form;
    _.action = ActionType.save;
    this.DOM.processEvent(_);
  }

  updateFormular(event: Result<any, Formular>) {
    this.formular.subFormulars.map(el => {
      if (el.apiId === event.output.apiId) {
        el = event.output;
      };
    })
    this.isFormValid();
  }

  updateFormElement(event: Result<any, FormElement>) {
    this.formular.formElements.map( (el, index) => {
      if (el && el.apiId === event.output.apiId) {
        this.formular.formElements[index] = event.output;
        this.cdr.detectChanges();
        this.formular.log.addLog('update ' +event.output.label + ' by value ' + event.output.value);
        setTimeout(() =>  {
          this.isFormValid();
        }, 200)
      }
    })
  };

  isFormValid() {
    let isValid = true;
    this.formular.formElements.map( el => {
      if (el && !el.valid) {
        isValid = false;
        this.formular.log.addLog(' form element ' + el.label + ' is not valid');
      }
    })
    this.formular.isValid = isValid;
    this.formular.log.addLog('toggle valid state of formular ' + this.formular.apiId);
    this.propagateValidState();
  }

  propagateValidState() {
    if (this.formular.parentFormularId) {
      const _ = new  Result<any, any>();
      _.toId = this.formular.parentFormularId;
      _.action = ActionType.update;
      _.log = new Logger();
      _.log.addLog('propagate formular to its parent ' + this.formular.parentFormularId);
      _.option = UpdateFormularOption.formular;
      _.output = this.formular;
      this.DOM.processEvent(_);
    }

  }

  createAddFormElementButton(): Button[] {
    const createElementButton = {} as Button;
    createElementButton.action = this.createElement;
    createElementButton.icon = 'add';
    createElementButton.index = 0;
    createElementButton.self = this;
    createElementButton.htmlState = HtmlState.primary;
    createElementButton.size = '1.5em';
    createElementButton.nextButton = 1;
    createElementButton.type = ButtonTypes.icon;
    return [createElementButton]
  }

  createElement(self: FormularNodeComponent, data: any): void{
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.overlay;
    _.fromId = self.DOMid;
    _.option = OverlayTypes.addFormElement;
    _.option2 = ActionType.add;
    _.action = ActionType.open;
    _.input = self.defaultFormElement();
    self.DOM.processEvent(_);
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
