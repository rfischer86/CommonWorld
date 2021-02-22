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
import { FormElement, Formular} from 'src/app/shared/interfaces/form.interface';
import { DOMElement, DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { Text } from '../../../../assets/i18n/app.text';

interface AgGridColumnParams extends IHeaderParams {
    formElement: FormElement;
    tableId: string;
}

@Component({
    templateUrl: 'agGridHeaderColumn.html',
    styleUrls: ['agGridHeaderColumn.scss']
})
export class AgGridHeaderColumnComponent implements OnInit, IHeaderComp, OnDestroy {
    params: AgGridColumnParams;
    state = new States();
    text = new Text();
    parentId;
    DOMself: DOMElement;
    DOMid: string;
    logger = new Logger();
    actionButtonList = [] as Button[];
    formElement: FormElement;
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
    this.actionButtonList.push( this.createDeleteColumnButton()  );
    this.actionButtonList.push( this.createEditFormElementButton() );
  }

  processDOMEvent(event: Result<any, any>) {
    if (!event){return};
  }

  agInit(params: AgGridColumnParams) {
    this.params = params;
    this.parentId = this.params.tableId
    this.formElement = this.params.formElement;
    if (!this.formElement.label) {
      this.formElement.label = this.text.table.undefinedColumn
    }
    this.state.defined.setTrue();
    this.init()
  }

  getGui(): HTMLElement{
    return
  };

  refresh(params: AgGridColumnParams) {
    this.params = params;
    this.formElement = this.params.formElement;
    this.createButtons();
    return true;
  }

// custom method
  getValue() {
    return true;
  }

  openChangeFormElementOverlay(self: AgGridHeaderColumnComponent) {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.overlay;
    _.option = OverlayTypes.editFormElement;
    _.action = ActionType.open;
    _.input = self.formElement;
    _.option2 = self.parentId;
    self.DOM.processEvent(_);
  }

  deleteColumn(self: AgGridHeaderColumnComponent){
    const _ = new  Result<any, any>();
    _.toId =  self.parentId;
    _.action = ActionType.delete;
    _.option = TableAktionTypes.column;
    _.input = self.formElement;
    self.DOM.processEvent(_);
  }

  createEditFormElementButton(): Button{
    const button = {} as Button;
    button.action = this.openChangeFormElementOverlay;
    button.icon = 'edit';
    button.buttonState = ButtonState.active;
    button.htmlState = HtmlState.black;
    button.index = 0;
    button.size = '1em';
    button.self = this;
    button.nextButton = 0;
    button.type = ButtonTypes.icon;
    button.tooltip =this.text.table.tooltip.editFormElement;
    return button;
  }


  createDeleteColumnButton(): Button {
    const button = {} as Button;
    button.action = this.deleteColumn;
    button.icon = 'delete';
    button.buttonState = ButtonState.active;
    button.htmlState = HtmlState.black;
    button.index = 0;
    button.size = '1em';
    button.self = this;
    button.nextButton = 0;
    button.type = ButtonTypes.icon;
    button.tooltip =this.text.table.tooltip.deleteColumn;
    return button;
  }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMid;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }

}
