import {Component, OnDestroy, OnInit} from '@angular/core';
import { IHeaderParams } from 'ag-grid-community';
import { IHeaderComp } from 'ag-grid-community/dist/lib/headerRendering/header/headerComp';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { ActionType, Result } from 'src/app/shared/classes/result/result';
import { States } from 'src/app/shared/classes/states/states';
import { ButtonState, ButtonTypes } from 'src/app/shared/enums/button.enum';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { HtmlState } from 'src/app/shared/enums/htmlStates';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { TableAktionTypes } from 'src/app/shared/enums/TableAktionTypes';
import { Button } from 'src/app/shared/interfaces/button';
import { Formular} from 'src/app/shared/interfaces/form.interface';
import { DOMElement, DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { Text } from '../../../../assets/i18n/app.text';

interface AgGridFormularParams extends IHeaderParams {
    fromular: Formular;
    tableId: string;
}

@Component({
    templateUrl: 'agGridHeader.html',
    styleUrls: ['agGridHeader.scss']
})
export class AgGridHeaderComponent implements OnInit, IHeaderComp, OnDestroy {
    params: AgGridFormularParams;
    state = new States();
    text = new Text();
    parentId;
    DOMself: DOMElement;
    DOMid: string;
    logger = new Logger();
    actionButtonList = [] as Button[];
    formular: Formular;
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
    this.actionButtonList = [];
    this.actionButtonList.push( this.createAddRowButton() );
    this.actionButtonList.push( this.createAddColumnButton()  );
    this.actionButtonList.push( this.createChangeFormButton() );
    this.actionButtonList.push( this.createSelctFormButton()  );
  }

  processDOMEvent(event: Result<any, any>) {
    if (!event){return};
  }

  agInit(params: AgGridFormularParams) {
    this.params = params;
    this.parentId = this.params.tableId
    this.formular = this.params.fromular
    if (!this.formular.name) {
      this.formular.name = this.text.table.undefinedFormular
    }
    this.state.defined.setTrue();
    this.init()
  }

  getGui(): HTMLElement{
    return
  };

  refresh(params: AgGridFormularParams) {
    this.params = params;
    this.formular = this.params.fromular
    if (!this.formular.name) {
      this.formular.name = this.text.table.undefinedFormular
    }
    this.createButtons();
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
    _.option2 = self.parentId;
    self.DOM.processEvent(_);
  }

  openSelectFormPopup(self: AgGridHeaderComponent){
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.overlay;
    _.option = OverlayTypes.selectFormular;
    _.action = ActionType.open;
    _.option2 = self.parentId;
    self.DOM.processEvent(_);
  }

  addColumn(self: AgGridHeaderComponent){
    const _ = new  Result<any, any>();
    _.toId =  self.parentId;
    _.action = ActionType.add;
    _.option = TableAktionTypes.column;
    self.DOM.processEvent(_);
  }

  addRow(self: AgGridHeaderComponent){
    const _ = new  Result<any, any>();
    _.toId =  self.parentId;
    _.action = ActionType.update;
    _.option = TableAktionTypes.row;
    self.DOM.processEvent(_);
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

  createAddRowButton(): Button {
    const button = {} as Button;
    button.action = this.addRow;
    button.icon = 'add';
    button.buttonState = this.state.editMode ? ButtonState.hidden: ButtonState.active;
    button.htmlState = HtmlState.black;
    button.index = 0;
    button.size = '1em';
    button.self = this;
    button.nextButton = 0;
    button.type = ButtonTypes.icon;
    button.tooltip =this.text.table.tooltip.newRow;
    return button;
  }
  createAddColumnButton(): Button {
    const button = {} as Button;
    button.action = this.addColumn;
    button.icon = 'add';
    button.buttonState = !this.state.editMode ? ButtonState.hidden: ButtonState.active;
    button.htmlState = HtmlState.black;
    button.index = 0;
    button.size = '1em';
    button.self = this;
    button.nextButton = 0;
    button.type = ButtonTypes.icon;
    button.tooltip =this.text.table.tooltip.newColumn;
    return button;
  }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMself.id;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }


}
