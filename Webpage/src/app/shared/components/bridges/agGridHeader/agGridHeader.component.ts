import {Component, OnInit} from '@angular/core';
import { IHeaderParams } from 'ag-grid-community';
import { IHeaderComp } from 'ag-grid-community/dist/lib/headerRendering/header/headerComp';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { ActionType, Result } from 'src/app/shared/classes/result/result';
import { States } from 'src/app/shared/classes/states/states';
import { ButtonState, ButtonTypes } from 'src/app/shared/enums/button.enum';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { HtmlState } from 'src/app/shared/enums/htmlStates';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { PopupTypes } from 'src/app/shared/enums/popupTypes';
import { Button } from 'src/app/shared/interfaces/button';
import { FormularClass } from 'src/app/shared/interfaces/form.interface';
import { DOMElement, DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { Text } from '../../../../../assets/i18n/app.text';
import { FormularCheckboxElementComponent } from '../../content/content-nodes/formular/formElements/checkbox/checkbox.component';


interface AgGridFormularParams extends IHeaderParams {
    fromularName?: string;
    tableId: string;
}

@Component({
    templateUrl: 'agGridHeader.html',
    styleUrls: ['agGridHeader.scss']
})
export class AgGridHeaderComponent implements OnInit, IHeaderComp {
    params : AgGridFormularParams;
    state = new States();
    text = new Text();
    parentId;
    DOMself: DOMElement;
    DOMid: string;
    logger = new Logger();
    actionButtonList = [] as Button[];
    formular = new FormularClass().get()
    constructor(
      private DOM: DOMService,
    ) {

   }

   ngOnInit() {

  }

  init() {
    const _ = this.DOM.create(DOMTypes.header, this.parentId);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event));
      this.DOMid = this.DOMself.id;
    }
    this.createButtons();
  }


  createButtons(){
    this.actionButtonList.push( this.createAddElementButton() );
    this.actionButtonList.push( this.createChangeFormButton()  );
    this.actionButtonList.push( this.createSelctFormButton()  );
  }

  processDOMEvent(event: Result<any, any>) {
    if (!event){return};
    if (event.action === ActionType.open){
      if (event.option === PopupTypes.selctFormular) {
        this.openSelectFormPopup(this);
      }
    }
    if (event.action === ActionType.close) {
      if (event.option === PopupTypes.selctFormular) {
        this.closeSelectFormPopup();
      }

    }
  }


  agInit(params: AgGridFormularParams) {
    this.params = params;
    if (this.params.fromularName) {
      this.state.defined.setTrue();
    } else {
      this.params.fromularName = this.text.table.undefinedFormular
    }
    this.init()
  }

  getGui(): HTMLElement{
    return
  };

  refresh(params: AgGridFormularParams) {
    this.params = params;
    this.params.fromularName = this.text.table.undefinedFormular;
    console.log('this.params',this.params)
    return true;
  }

// custom method
  getValue() {
    return true;
  }

  openChangeFormPopup(self: AgGridHeaderComponent) {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.overlay;
    _.option = OverlayTypes.changeFormular;
    _.action = ActionType.open;
    _.input = self.formular;
    _.option2 = self.params.tableId;
    self.DOM.processEvent(_);
  }

  openSelectFormPopup(self: AgGridHeaderComponent){
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.overlay;
    _.option = OverlayTypes.selectFormular;
    _.action = ActionType.open;
    _.option2 = self.params.tableId;
    self.DOM.processEvent(_);
  }

  closeSelectFormPopup() {
    console.log('ToDo implement: closeSelectFormPopup')
  }

  addElementPopup() {
    console.log('ToDo implement: addEllementPopup')
  }
  createChangeFormButton(): Button{
    const button = {} as Button;
    button.action = this.openChangeFormPopup;
    button.icon = 'edit';
    button.buttonState = ButtonState.active;
    button.htmlState = HtmlState.black;
    button.index = 0;
    button.size = '1em';
    button.self = this;
    button.nextButton = 0;
    button.type = ButtonTypes.icon;
    button.tooltip =this.text.table.tooltip.editTable;
    return button;
  }

  createSelctFormButton(): Button {
    const button = {} as Button;
    button.action = this.openSelectFormPopup;
    button.icon = 'search';
    button.buttonState = ButtonState.active;
    button.htmlState = HtmlState.black;
    button.index = 0;
    button.size = '1em';
    button.self = this;
    button.nextButton = 0;
    button.type = ButtonTypes.icon;
    button.tooltip =this.text.table.tooltip.searchFormular;
    return button;
  }

  createAddElementButton(): Button {
    const button = {} as Button;
    button.action = this.addElementPopup;
    button.icon = 'add';
    button.buttonState = ButtonState.active;
    button.htmlState = HtmlState.black;
    button.index = 0;
    button.size = '1em';
    button.self = this;
    button.nextButton = 0;
    button.type = ButtonTypes.icon;
    button.tooltip =this.text.table.tooltip.newRow;
    return button;
  }

}
