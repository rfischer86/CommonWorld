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
import { Text } from 'src/assets/i18n/app.text';
import { Helper } from 'src/app/shared/services/Helper/helper.service';
import { FormElement, FormElementClass, Formular } from 'src/app/shared/interfaces/form.interface';
import { FormTypes } from 'src/app/shared/enums/FormElement.enum';
import { TitleTypes } from 'src/app/shared/enums/TitleTypes';
import { FormularClass } from 'src/app/shared/interfaces/form.interface'
import { WidthClass } from 'src/app/shared/enums/WidthClass';

enum Buttons{
  submit = 'submit',
  delete = 'delete'
}


@Component({
  selector: 'app-change-formular',
  templateUrl: './changeFormular.html',
  styleUrls: ['./changeFormular.scss']
})
export class ChangeFormularComponent implements OnInit, OnDestroy{
  @Input() parentId: string ;
  @Input() tableId: string;
  @Input() option: ActionType;
  @Input() set setFormElement(data: Formular){
      this.inputFormularData = data;
      console.log('this.inputFormularData', this.inputFormularData);
  }

  titleTypes = TitleTypes;
  formTypes = FormTypes;
  formType: FormTypes;
  displayFormularData: Formular = new FormularClass().get();
  inputFormularData: Formular = new FormularClass().get();
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
    const _ = this.DOM.create(DOMTypes.overlay, DOMTypes.dialog, OverlayTypes.changeFormular);
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
    const _ = new  Result<any, any>();
    switch(event.action) {
      case ActionType.update:
        switch(event.output.name) {
          case OverlayTypes.changeFormular:
            this.inputFormularData = event.output;
            this.states.valid.value = this.inputFormularData.isValid;
            this.changeButtonState();
        }
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
        _.output = this.inputFormularData;
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

    formElement.formType = FormTypes.textField;
    formElement.label = this.text.changeFormular.formularName;
    formElement.value = this.inputFormularData.name;
    formElement.widthClass = WidthClass.w100;
    displayFormularData.addFormElement(formElement.get());

    formElement.formType = FormTypes.textArea;
    formElement.label = this.text.changeFormular.description;
    formElement.value = this.inputFormularData.description;
    displayFormularData.addFormElement(formElement.get());

    formElement.formType = FormTypes.textField;
    formElement.label = this.text.changeFormular.version;
    formElement.value = this.inputFormularData.version;
    displayFormularData.addFormElement(formElement.get());

    displayFormularData.name = 'changFormularElement';
    this.displayFormularData = displayFormularData.get()
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

  emitFormularToTable(formular: ChangeFormularComponent){
    const _ = new  Result<any, any>();
    _.toId =  this.tableId;
    _.fromType = DOMTypes.overlay;
    _.input = formular;
    _.option = OverlayTypes.selectFormular;
    _.action = ActionType.update;
    this.DOM.processEvent(_);
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
