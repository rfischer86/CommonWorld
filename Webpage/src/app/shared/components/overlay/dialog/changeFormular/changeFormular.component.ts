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
import { FormularNodeComponentOption } from '../../../content/content-nodes/formular-node/formular/formular.component';

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
    console.log('setFormElement', data, this)
    this.inputFormularData = data;
    this.pullCollectDataTrigger(this, {submit: false});
  }

  titleTypes = TitleTypes;
  formTypes = FormTypes;
  formType: FormTypes;
  formularContentData: Result<any,Formular>;
  formularData: Formular;
  inputFormularData: Formular;
  text = new Text();
  result = new Result();
  logger = new Logger();
  DOMself: DOMElement;
  overlayEvent: Result<any,any>;
  states = new States();
  data = {};
  buttonList = [] as  Button[][];
  note = {} as Note;
  formularTransferObject = new Result<Formular,any>();

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
    this.createButtons();
    this.createForm();
    this.createFormularContentData();
    this.states.finishInit.setTrue();
  }

  processDOMEvent(event:  Result<any, any>) {
    if (!event) return;
    const _ = new  Result<any, any>();
    switch(event.action) {
      case ActionType.treeUp:
        this.inputFormularData = event.output;
        this.states.valid.value = this.inputFormularData.isValid;
        this.changeButtonState();
        if (this.states.submit.isTrue()){
          this.emitFormularToTable();
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
        this.states.collectData.setTrue();
        // _.toId = DOMTypes.overlay;
        // _.fromType = DOMTypes.dialog;
        // _.output = this.inputFormularData;
        // _.log = new Logger();
        // _.log.addLog('from AddFormElementComponent transmit data to overlay')
        // _.action = ActionType.transmit;
        // _.nextActionType = this.option;
        // this.DOM.processEvent(_);
        break;
    }
  }

  changeButtonState() {
    console.log('changeButtonState',this.states.valid.value)
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
    console.log('this.inputFormularData', this.inputFormularData)

    const formElement = new FormElementClass();
    formElement.valid = true;
    formElement.createRandomApiId();
    formElement.formType = FormTypes.textField;
    formElement.label = this.text.changeFormular.formularName;
    formElement.value = this.inputFormularData.name;
    formElement.widthClass = WidthClass.w100;
    displayFormularData.addFormElement(formElement.get());

    formElement.formType = FormTypes.textArea;
    formElement.createRandomApiId();
    formElement.apiId = new Helper().getRrandomId();
    formElement.label = this.text.changeFormular.description;
    formElement.value = this.inputFormularData.description;
    displayFormularData.addFormElement(formElement.get());

    formElement.formType = FormTypes.textField;
    formElement.createRandomApiId();
    formElement.apiId = new Helper().getRrandomId();
    formElement.label = this.text.changeFormular.version;
    formElement.value = this.inputFormularData.version;
    displayFormularData.addFormElement(formElement.get());

    displayFormularData.name = 'changFormularElement';
    this.formularData = displayFormularData.get();
  }

  createFormularContentData(): void {
    this.formularContentData = new Result();
    this.formularContentData.option = FormularNodeComponentOption.frontend;
    this.formularContentData.input = this.formularData;
    this.formularContentData.fromApiId = this.DOMself.id;
    console.log('this.formularContentData', this.formularContentData)
  }

  createButtons() {
    this.buttonList.push(this.createSubmitButton());
  };

  createSubmitButton(): Button[] {
    const submitButton = {} as Button;
    submitButton.name = Buttons.submit
    submitButton.action = this.pullCollectDataTrigger;
    submitButton.icon = 'save';
    submitButton.buttonState = ButtonState.disabled
    submitButton.text = this.text.general.save;
    submitButton.index = 0;
    submitButton.data = {submit: true};
    submitButton.self = this;
    submitButton.htmlState = HtmlState.primary;
    submitButton.size = '1em';
    submitButton.nextButton = 0;
    submitButton.type = ButtonTypes.normal;
    return [submitButton];
  }

  pullCollectDataTrigger(self, state) {
    if (state.submit) {
      self.states.submit.setTrue();
    } else {
      self.states.submit.setFalse();
    }
    self.states.collectData.setTrue();
    setTimeout(()=>self.states.collectData.setFalse(), 1000)
  }

  emitFormularToTable(){
    const helper = new Helper();
    this.inputFormularData.version = helper.getFormElementByLabel(
      this.text.changeFormular.version,this.inputFormularData
    ).value;
    this.inputFormularData.name = helper.getFormElementByLabel(
      this.text.changeFormular.formularName,this.inputFormularData
    ).value;
    this.inputFormularData.description = helper.getFormElementByLabel(
      this.text.changeFormular.description,this.inputFormularData
    ).value;
    const _ = new  Result<any, any>();
    _.toId =  this.tableId;
    _.fromType = DOMTypes.overlay;
    _.input = this.inputFormularData;
    _.option = OverlayTypes.changeFormular;
    _.action = ActionType.update;
    this.DOM.processEvent(_);
    this.close();
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
