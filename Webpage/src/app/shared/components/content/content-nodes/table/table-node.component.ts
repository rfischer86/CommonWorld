import { Component, OnInit, Input, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { States } from 'src/app/shared/classes/states/states';
import { DOMElement, DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { ContentTypes } from 'src/app/shared/enums/ContentType';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { PopupSearchFormularComponent } from 'src/app/shared/components/popup/popups/searchFormular/searchFormular.component';
import { AgGridHeaderComponent } from 'src/app/shared/bridges/agGridHeader/agGridHeader.component';
import { Module } from 'ag-grid-community';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { Table, TableClass } from 'src/app/shared/interfaces/table.interface';
import { TabelNodeAgGridBridge } from '../../../../bridges/tabelNodeAgGrid/tabelNodeAgGrid';
import { FormElementClass, Formular } from 'src/app/shared/interfaces/form.interface';
import { TableAktionTypes } from 'src/app/shared/enums/TableAktionTypes';

@Component({
  selector: 'app-table-node',
  templateUrl: './table-node.component.html',
  styleUrls: ['./table-node.component.scss']
})
export class TableNodeComponent implements OnInit, OnDestroy {

  @Input() parentId;
  @Input() parentApiId;
  @Input() set setContentData(data : Table ) {
    this.contentData = data;
    if (!this.contentData) {
      this.contentData = new TableClass().get();
    }
    // this.rowData = [
    //     { actionColumn: 'Toyota', model: 'Celica', price: 35000 },
    //     { actionColumn: 'Ford', model: 'Mondeo', price: 32000 },
    //     { actionColumn: 'Porsche', model: 'Boxter', price: 72000 }
    // ];
  }
  agGridBridge: TabelNodeAgGridBridge;
  modules: Module[];
  columnDefs: object[] = [];
  rowData: object[] = [];
  contentData: Table;
  contentTypes = ContentTypes;
  contentType = ContentTypes.table;
  states = new States();
  DOMself: DOMElement;
  DOMid: string;
  logger = new Logger();
  constructor (
    private DOM: DOMService,
  ){ }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.tableNode, this.parentId);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
      this.DOMid = this.DOMself.id;

      this.agGridBridge = new TabelNodeAgGridBridge();
      this.columnDefs = this.agGridBridge.composeAgGrid(this.contentData.formular, this.DOMid );
    }
  }

  processDOMEvent(event: Result<any, any>) {

    if (!event) return;
    switch(event.action) {
      case ActionType.update:
        if (event.option === OverlayTypes.selectFormular){
          this.contentData.formular = event.input;
          this.columnDefs = this.agGridBridge.composeAgGrid(this.contentData.formular, this.DOMid);
        }
        if (event.option === OverlayTypes.changeFormular){
          this.contentData.formular.version = event.input.version;
          this.contentData.formular.name = event.input.name;
          this.contentData.formular.description = event.input.description;
          this.columnDefs = this.agGridBridge.composeAgGrid(this.contentData.formular, this.DOMid);
        }
        break;
      case ActionType.add:
        if (event.option === TableAktionTypes.column) {
          this.contentData.formular.formElements.push(new FormElementClass().get())
          this.columnDefs = this.agGridBridge.composeAgGrid(this.contentData.formular, this.DOMid);
          console.log('this.columnDefs', this.columnDefs)
        }
        break;
      }
  }

  onChange(event){
    const _ = new  Result<any, any>();
    _.log = new Logger();
    _.log.addLog(ActionType.save + DOMTypes.tableNode);
    _.toId = this.parentId;
    _.toApiId = this.parentApiId
    _.fromType = DOMTypes.tableNode;
    _.input = event;
    _.option = this.contentType;
    _.action = ActionType.save;
    this.DOM.processEvent(_);
  }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMid;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }
}

