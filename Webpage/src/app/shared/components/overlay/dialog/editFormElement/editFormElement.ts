import { Component, OnInit, OnDestroy, Input } from '@angular/core';
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
import { MetaDataFields, Text } from 'src/assets/i18n/app.text';
import { Helper } from 'src/app/shared/services/Helper/helper.service';
import { FormElement, FormElementClass, Formular,ShortFormular } from 'src/app/shared/interfaces/form.interface';
import { FormTypes } from 'src/app/shared/enums/FormElement.enum';
import { TitleTypes } from 'src/app/shared/enums/TitleTypes';
import { FormularClass } from 'src/app/shared/interfaces/form.interface'
import { WidthClass } from 'src/app/shared/enums/WidthClass';
import { FormularHandlerTypes, RelationTypes } from 'src/app/shared/enums/formularHandlerTypes';
import { FormularHandlerElement, FormularHandlerElementClass, FormularHandlerList } from '../../../content/content-nodes/formular-node/formular/formularHandler.class';
import { FormularNodeComponentOption } from '../../../content/content-nodes/formular-node/formular/formular.component';

enum Buttons{
  submit = 'submit',
  delete = 'delete'
}


enum FormularNames{
  formTypeSettings = 'formTypeSettings',
  formElementSettings = 'formElementSettings'
}



@Component({
  selector: 'app-edit-form-element',
  templateUrl: './editFormElement.html',
  styleUrls: ['./editFormElement.scss']
})
export class  AddEditFormElementComponent implements OnInit, OnDestroy{
  @Input() parentId: string ;
  @Input() tableId: string;
  @Input() option: ActionType;
  @Input() set setFormElement(data: FormElement){
    this.formElementData = data;
  }

  titleTypes = TitleTypes;
  formTypes = FormTypes;
  formType: FormTypes;
  selectFormTypes: string;
  formularContentData: Result<any,Formular>;
  formularData: Formular;
  formElementData: FormElement;
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
    private DOM: DOMService,
    private helper: Helper
  ) {
    const _ = this.DOM.create(DOMTypes.overlay, DOMTypes.dialog, OverlayTypes.editFormElement);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
    }
  }

  ngOnInit() {
    this.createButtons();
    this.createForm();
    this.createFormularContentData();
    this.states.finishInit.setTrue();
  }

  processDOMEvent(event:  Result<any, any>) {
    if (!event) return;
    const _ = new  Result<any, any>();
    switch(event.action) {
      case ActionType.update:
        console.log('event', event);
        this.formularContentData = event.output;
        this.states.valid.value = this.formularData.isValid;
        this.changeButtonState();
        break;
      case ActionType.close:
        _.toId = this.parentId;
        _.fromType = DOMTypes.dialog;
        _.output = this.data;
        _.action = ActionType.close;
        this.DOM.processEvent(_);
        break;
      case ActionType.submit:
        _.toId = DOMTypes.overlay;
        _.fromType = DOMTypes.dialog;
        _.output = this.formElementData;
        _.log = new Logger();
        _.log.addLog('from AddFormElementComponent transmit data to overlay')
        _.action = ActionType.transmit;
        _.nextActionType = this.option;
        this.DOM.processEvent(_);
        break;
    }
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
    const displayFormularData = new FormularClass();
    const formElement = new FormElementClass();
    formElement.valid = true;

    formElement.formType = FormTypes.textField;
    formElement.createRandomApiId();
    formElement.label = this.text.editFormElement.formElementName;
    formElement.value = this.formElementData.label;
    formElement.widthClass = WidthClass.w100;
    displayFormularData.addFormElement(formElement.get());

    formElement.formType = FormTypes.textArea;
    formElement.createRandomApiId();
    formElement.label = this.text.editFormElement.description;
    formElement.value = this.formElementData.description;
    displayFormularData.addFormElement(formElement.get());

    formElement.formType = FormTypes.checkbox;
    formElement.createRandomApiId();
    formElement.label = this.text.editFormElement.required;
    formElement.value = this.formElementData.required;
    displayFormularData.addFormElement(formElement.get());

    formElement.formType = FormTypes.select;
    formElement.createRandomApiId();
    formElement.metaData = 'PopupTypes.formularType';
    formElement.label = this.text.editFormElement.formElementType;
    formElement.value = FormTypes.textField;
    formElement.default = FormTypes.textField;
    displayFormularData.addFormElement(formElement.get());

    const handlerList = new FormularHandlerList([]);
    let handler = new FormularHandlerElementClass({
      formularHandlerType: FormularHandlerTypes.deleteAllSubFormular,
      formElementApiId: formElement.apiId,
      relationType: RelationTypes.valueNotInList,
      formElementValue: [FormTypes.select, FormTypes.checkbox]
    } as FormularHandlerElement);
    handlerList.addHandler(handler.get())

    handler = new FormularHandlerElementClass({
      formularHandlerType: FormularHandlerTypes.createOrReplaceSubFormular,
      formElementApiId: formElement.apiId,
      relationType: RelationTypes.equal,
      newFormular: this.createCheckboxSubFormular(),
      formElementValue: FormTypes.select
    } as FormularHandlerElement);
    handlerList.addHandler(handler.get())

    handler = new FormularHandlerElementClass({
      formularHandlerType: FormularHandlerTypes.createOrReplaceSubFormular,
      formElementApiId: formElement.apiId,
      relationType: RelationTypes.equal,
      newFormular: this.createSelectSubFormular(),
      formElementValue: FormTypes.checkbox
    } as FormularHandlerElement);
    handlerList.addHandler(handler.get())

    displayFormularData.name = FormularNames.formElementSettings;
    displayFormularData.setHandlerList(handlerList);
    this.formularData = displayFormularData.get()
  }

  createFormularContentData(): void {
    this.formularContentData = new Result();
    this.formularContentData.option = FormularNodeComponentOption.frontend;
    this.formularContentData.input = this.formularData;
    this.formularContentData.fromApiId = this.DOMself.id;
    console.log('this.formularContentData', this.formularContentData)
  }

  createCheckboxSubFormular(): Formular {
    const mdf = new MetaDataFields();
    const formularClass =  new FormularClass({
      name: FormularNames.formTypeSettings
    });
    const formElement = new FormElementClass();
    formElement.widthClass = WidthClass.w100;
    formElement.formType = FormTypes.textField;
    formElement.createRandomApiId();
    formElement.label = this.text.editFormElement.checkboxFalse;
    formElement.value = this.formElementData.required;
    formularClass.addFormElement(formElement.get());

    formElement.formType = FormTypes.textField;
    formElement.createRandomApiId();
    formElement.label = this.text.editFormElement.checkboxFalse;
    formElement.value = this.formElementData.required;
    formularClass.addFormElement(formElement.get());
    return formularClass.get();
  }

  createSelectSubFormular(): Formular {
    const mdf = new MetaDataFields();
    const formularClass =  new FormularClass({
      name: FormularNames.formTypeSettings
    });
    const formElement = new FormElementClass();
    formElement.widthClass = WidthClass.w100;
    formElement.formType = FormTypes.textLine;
    formElement.createRandomApiId();
    formElement.label = this.text.editFormElement.selectOptionsDescription;
    formElement.value = this.formElementData.required;
    formularClass.addFormElement(formElement.get());
    return formularClass.get();
  }


  emitFormularToTable(self: AddEditFormElementComponent){
    const helper = new Helper();
    self.formElementData.label = helper.getFormElementByLabel(
      self.text.editFormElement.formElementName, self.formularData
    ).value;
    self.formElementData.description = helper.getFormElementByLabel(
      self.text.editFormElement.description, self.formularData
    ).value;
    const _ = new  Result<any, any>();
    _.toId =  self.tableId;
    _.fromType = DOMTypes.overlay;
    _.input = self.formularData;
    _.option = OverlayTypes.editFormElement;
    _.action = ActionType.update;
    self.DOM.processEvent(_);
    self.close()
  }

  createButtons() {
    this.buttonList.push(this.createSubmitButton());
  };

  createSubmitButton(): Button[] {
    const submitButton = {} as Button;
    submitButton.name = Buttons.submit
    submitButton.action = this.emitFormularToTable;
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
