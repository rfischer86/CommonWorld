import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { DOMService, DOMElement } from 'src/app/shared/services/DOM/dom-element.service';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { States, State } from 'src/app/shared/classes/states/states';
import { Button } from 'src/app/shared/interfaces/button';
import { ButtonTypes, ButtonState } from 'src/app/shared/enums/button.enum';
import { HtmlState } from 'src/app/shared/enums/htmlStates';
import { Note } from 'src/app/shared/components/note/note.interface';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { Text } from 'src/assets/i18n/app.text';
import { Authenticate } from 'src/app/shared/interfaces/auth.interface';
import { UserService } from 'src/app/shared/services/User/user.service';
import { Helper } from 'src/app/shared/services/Helper/helper.service';
import { FormElementCondition, FormElement, Condition, Formular } from 'src/app/shared/interfaces/form.interface';
import { FormTypes } from 'src/app/shared/enums/FormElement.enum';
import { TitleTypes } from 'src/app/shared/enums/TitleTypes';

enum Buttons{
  submit = 'submit',
  delete = 'delete'
}

@Component({
  selector: 'app-add-form-element',
  templateUrl: './addFormElement.component.html',
  styleUrls: ['./addFormElement.component.scss']
})
export class AddFormElementComponent implements OnInit, OnDestroy{
  @Input() parentId: string ;
  @Input() option: ActionType;
  @Input() set setFormElement(data: FormElement){ 
    console.log(data);
    if (! data ) {
      this.formElement = {} as FormElement;    
    } else {
      this.formElement = data;
    } 
  }
  titleTypes = TitleTypes;
  formElement: FormElement;
  formTypes = FormTypes;
  formularData: Formular;
  text = new Text();
  result = new Result();
  logger = new Logger();
  DOMself: DOMElement;
  overlayEvent: Result<any,any>;
  states = new States();
  data = {};
  buttonList = [] as  Button[][];
  note = {} as Note;
  constructor(
    // private userService: UserService,
    private DOM: DOMService,
    private helper: Helper
  ) {
    const _ = this.DOM.create(DOMTypes.overlay, DOMTypes.dialog, OverlayTypes.addFormElement);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
    }
    this.states.finishInit.isTrue();
  }

  ngOnInit() {
    this.result.log.printLog();
    this.createButtons();
    this.createForm();
    this.states.finishInit.setTrue();
  }

  processDOMEvent(event:  Result<any, any>) {
    if (!event) return;
    if(event.action === ActionType.update) {
      this.formularData = event.output;
      this.states.valid.value = this.formularData.isValid; 
      this.changeButtonState();
    }
    if (event.action === ActionType.close) {
      const _ = new  Result<any, any>();
      _.toId = this.parentId;
      _.fromType = DOMTypes.dialog;
      _.output = this.data;
      _.action = ActionType.close;
      this.DOM.processEvent(_);
    }

    if (event.action === ActionType.submit) {
      const _ = new  Result<any, any>();
      _.toId = DOMTypes.overlay;
      _.fromType = DOMTypes.dialog;
      _.output = this.createFormElement();
      _.log = new Logger();
      _.log.addLog('from AddFormElementComponent transmit data to overlay' + this.createFormElement())
      _.action = ActionType.transmit;
      _.nextActionType = this.option;
      this.DOM.processEvent(_);
    }
  }

  createFormElement(): FormElement {
    const formElement = {} as FormElement;
    formElement.label = this.helper.getFormElementByLabel(this.text.addFormElement.label, this.formularData).value;    
    formElement.formType = this.helper.getFormElementByLabel(this.text.addFormElement.formType, this.formularData).value;    
    formElement.description = this.helper.getFormElementByLabel(this.text.addFormElement.description, this.formularData).value;    
    formElement.version = this.helper.getFormElementByLabel(this.text.addFormElement.version, this.formularData).value;
    if (this.formElement?.apiId) {
      formElement.apiId = this.formElement.apiId;
    } else {
      formElement.apiId = this.helper.getRrandomId();
    }
    if (!formElement.formType) {
      formElement.formType = FormTypes.textField;
    }    
    return formElement;
  }

  changeButtonState() {
    this.buttonList.map(el => {
      if (el[0].name === Buttons.submit) {
        if (this.states.valid.isTrue()) {
          el[0].buttonState =  ButtonState.active;
        } else {
          el[0].buttonState =  ButtonState.disabled;
        }
      }
    })
  }

  createForm() {
    this.formularData = {} as Formular;
    this.formularData.formElements =  [];
    this.addFormElement(this.text.addFormElement.label, true, FormTypes.textField, false);
    this.addFormElement(this.text.addFormElement.formType, true, FormTypes.select, false);
    this.addFormElement(this.text.addFormElement.description, false, FormTypes.textField, false);
    this.addFormElement(this.text.addFormElement.version, false, FormTypes.textField, false);
    this.formularData.version = '1.0';
    this.formularData.name = 'addFormElement';
    this.formularData.apiId = this.helper.getRrandomId();
    this.formularData.parentFormularId = 'addFormElement';
  }

  addFormElement(label: string, required: boolean, formType: FormTypes, valid: boolean) {
    const formElement = {} as FormElement;
    formElement.value = this.formElement[label];
    formElement.apiId = this.helper.getRrandomId();
    formElement.valid = valid;
    formElement.label = label;
    formElement.required = required;
    formElement.formType = formType;
    formElement.condition = this.defaultFormCondition();
    this.formularData.formElements.push(formElement);
  }


  defaultFormCondition(): FormElementCondition {
    const condition = {} as Condition;
    condition.do = () => true;
    const defaultCondition = {} as FormElementCondition;
    defaultCondition.conditions = [condition];
    defaultCondition.state = new State(true);
    return defaultCondition;
  }

  createButtons() {
    this.buttonList.push(this.createSubmitButton());
    if (this.option === ActionType.update){
      this.buttonList.push(this.createDeleteButton());
    }
  };

  createSubmitButton(): Button[] {
    const submitButton = {} as Button;
    submitButton.name = Buttons.submit
    submitButton.action = this.clickSubmit;
    submitButton.icon = 'save';
    submitButton.buttonState = ButtonState.disabled
    submitButton.text = this.text.general.save;
    submitButton.index = 0;
    submitButton.self = this;
    submitButton.htmlState = HtmlState.primary;
    submitButton.size = '1em';
    submitButton.nextButton = 0;
    submitButton.type = ButtonTypes.normal;
    return [submitButton];
  }

  createDeleteButton(): Button[] {
    const submitButton = {} as Button;
    submitButton.name = Buttons.delete
    submitButton.action = this.clickDelete;
    submitButton.icon = 'delete';
    submitButton.buttonState = ButtonState.active
    submitButton.text = this.text.general.delete;
    submitButton.index = 0;
    submitButton.self = this;
    submitButton.htmlState = HtmlState.primary;
    submitButton.size = '1em';
    submitButton.nextButton = 0;
    submitButton.type = ButtonTypes.normal;
    return [submitButton];
  }


  clickSubmit(self: AddFormElementComponent) {
    const data = {} as Authenticate;
    const _ = new  Result<any, any>();
    _.toId =  OverlayTypes.addFormElement;
    _.fromType = DOMTypes.overlay;
    _.input = data;
    _.option = self.option;
    _.action = ActionType.submit;
    self.DOM.processEvent(_);
  }

  clickDelete(self: AddFormElementComponent) {
    self.option = ActionType.delete;
    self.clickSubmit(self);
  }

  close() {
    const _ = new  Result<any, any>();
    _.toId =  this.parentId;
    _.fromId =  this.DOMself.id;
    _.fromType = DOMTypes.dialog;
    _.action = ActionType.close;
    this.DOM.processEvent(_);
  }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMself.id;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }
}
