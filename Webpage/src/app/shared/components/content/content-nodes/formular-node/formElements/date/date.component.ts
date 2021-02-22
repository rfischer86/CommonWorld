import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { DOMElement, DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { FormElement } from 'src/app/shared/interfaces/form.interface';
import { PopupTypes } from 'src/app/shared/enums/popupTypes';
import { MetaDataFields } from 'src/assets/i18n/app.text';
import { State } from 'src/app/shared/classes/states/states';
import { Helper } from 'src/app/shared/services/Helper/helper.service';
import { FormTypes } from 'src/app/shared/enums/FormElement.enum';

@Component({
  selector: 'app-form-date-element',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class FormularDateElementComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  @Input() parentId;
  @Input() parentApiId;
  @Input() set setContentData(data : FormElement ){
    if ( data ) {
      this.contentData = data;
      if (this.contentData.metaData) {
        const metaData = JSON.parse(this.contentData.metaData);
        const metaString = metaData[this.metaDataFields.select.options] as string;
      }
    } else {
      this.contentData =  {} as FormElement;
      this.options = [];
    };
  }
  popupTyp = PopupTypes.select;
  options = [] as string[];
  metaDataFields = new MetaDataFields();
  contentData: FormElement;
  text = new Text();
  DOMid: string;
  logger = new Logger();
  DOMself: DOMElement;
  openFormularType = new State(false);
  popupData: Result<any,any>;
  constructor(
    private DOM: DOMService,
    private helper: Helper
  ) { }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.formularNode, this.parentId);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMid = this.DOMself.id;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event));
    }
  }

  ngAfterViewInit () {
    this.input.nativeElement.value = this.contentData.value ? this.contentData.value : null;
    if (this.parentId) {
      this.onFocusout();
    }
  }

  processDOMEvent(event: Result<any, any>) {
    if (!event) {return}
    switch(event.action) {
        case (ActionType.close):
            switch(event.fromType) {
              case (DOMTypes.formularTypePopup):
                this.openFormularType.setFalse();
              }
              break;
        case (ActionType.update):
          switch(event.fromType) {
            case (DOMTypes.formularTypePopup):
              this.openFormularType.setFalse();
              this.contentData.value = event.output;
              this.input.nativeElement.value = event.output ? event.output : FormTypes.textField;
            }
        }
  }

  onFocusout() {
    if (!this.contentData || !this.parentId) {return}
    this.contentData.value = this.input.nativeElement.value;
    const _ = new  Result<any, FormElement>();
    _.toId = this.parentId;
    _.output = this.contentData;
    _.fromType = DOMTypes.formElement
    _.action = ActionType.update;
    _.output.valid = this.helper.isValid(this.contentData);
    _.log = new Logger();
    _.log.addLog('focus out ' + this.contentData.label + ' with value ' + this.contentData.value +', condition ' + _.output.valid);
    this.DOM.processEvent(_);
  }

  clickSelect(){
    this.popupData = new Result<any,any>();
    this.popupData.option = this.popupTyp;
    this.popupData.input = this.options;
    this.openFormularType.setTrue()
  }


  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMself.id;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }

}