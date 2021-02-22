import { Component, OnInit, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { DOMService, DOMElement } from 'src/app/shared/services/DOM/dom-element.service';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { States } from 'src/app/shared/classes/states/states';
import { Button } from 'src/app/shared/interfaces/button';
import { ButtonTypes, ButtonState } from 'src/app/shared/enums/button.enum';
import { HtmlState } from 'src/app/shared/enums/htmlStates';
import { Note } from 'src/app/shared/components/note/note.interface';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { Text} from 'src/assets/i18n/app.text';
import { FormElement, Formular, FormularClass } from 'src/app/shared/interfaces/form.interface';
import { FormTypes } from 'src/app/shared/enums/FormElement.enum';
import { TitleTypes } from 'src/app/shared/enums/TitleTypes';
import { SearchOption } from 'src/app/shared/interfaces/SearchOption';
import { FormularService } from 'src/app/shared/services/REST/formular.service';
import { Search } from 'src/app/shared/interfaces/search.interface';
import { SearchServices } from '../../../search-field/search-field.interface';

enum Buttons{
  submit = 'submit',
  delete = 'delete'
}


@Component({
  selector: 'app-select-formular',
  templateUrl: './selectFormular.component.html',
  styleUrls: ['./selectFormular.component.scss']
})
export class SelectFormularComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input() parentId: string;
  @Input() tableId: string;
  @Input() option: ActionType;
  searchOption:SearchOption = {
    fullWidth: true,
    displayPopup: false
  }
  formularSelection = [] as  Formular[];
  searchString = ''
  titleTypes = TitleTypes;
  formElement: FormElement;
  searchServices = SearchServices;
  metaDataFormular = {} as Formular;
  formTypes = FormTypes;
  formType: FormTypes;
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
    private formularService: FormularService,
    private DOM: DOMService,
  ) {
    const _ = this.DOM.create(DOMTypes.overlay, DOMTypes.dialog, OverlayTypes.selectFormular);
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
    this.states.finishInit.setTrue();
  }

  ngAfterViewInit(){
  }

  processDOMEvent(event:  Result<any, any>) {
    if (!event) return;
    const _ = new  Result<any, any>();
    switch(event.action) {
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
        _.output = 'ToDo';
        // _.log = new Logger();
        // _.log.addLog('')
        _.action = ActionType.transmit;
        _.nextActionType = this.option;
        this.DOM.processEvent(_);
        break;

      case ActionType.update:
        switch (event.fromType) {
          case DOMTypes.searchField:
            this.formularSelection = event.input;
            setTimeout(()=>this.changeButtonState(),100);
            break;
          case DOMTypes.overlay:
            const formular = new FormularClass().get();
            formular.name = this.searchString;
            this.formularService.post(formular).subscribe(
              (data)=> {
                this.emitFormularToTable(data.result);
                this.close()
              },
              (error)=> console.log(error)
            )
            break;
        }
        break;
    }
  }

  changeButtonState() {
    this.buttonList.map(el => {
      if (el[0].name === Buttons.submit) {
        if (this.searchString!=='' && this.formularSelection.length === 0) {
          el[0].buttonState =  ButtonState.active;
        } else {
          el[0].buttonState =  ButtonState.hidden;
        }
      }
    })
  }

  createButtons() {
    this.buttonList.push(this.createFormularButton());
  };

  updateSearchString(searchData: Search) {
    this.searchString = searchData.searchString;
  }

  createFormularButton(): Button[] {
    const newFormular = {} as Formular;
    newFormular.name = this.searchString;
    newFormular.local = true;
    newFormular.version = '0.0.1';
    newFormular.isValid = false;
    this.formularService.post(newFormular)
    const submitButton = {} as Button;
    submitButton.name = Buttons.submit
    submitButton.action = this.clickCreateFormular;
    submitButton.icon = 'create';
    submitButton.buttonState = ButtonState.hidden;
    submitButton.text = this.text.searchFormular.createFormular;
    submitButton.index = 0;
    submitButton.self = this;
    submitButton.htmlState = HtmlState.primary;
    submitButton.size = '1em';
    submitButton.nextButton = 0;
    submitButton.type = ButtonTypes.normal;
    return [submitButton];
  }

  clickCreateFormular(self: SelectFormularComponent) {
    const data = {} as Formular;
    const _ = new  Result<any, any>();
    _.toId =  self.DOMself.id;
    _.fromType = DOMTypes.overlay;
    _.input = data;
    _.option = self.option;
    _.action = ActionType.update;
    self.DOM.processEvent(_);
  }

  selctFormular(formular: Formular) {
    this.emitFormularToTable(formular);
    this.close();
  }

  emitFormularToTable(formular: Formular){
    const _ = new  Result<any, any>();
    console.log('tableId',this.tableId);
    console.log(formular,formular);
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
