import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef, AfterViewInit, ɵConsole } from '@angular/core';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { DOMElement, DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { FormElement } from 'src/app/shared/interfaces/form.interface';
import { Text, MetaDataFields } from '../../../../../../../../assets/i18n/app.text';
import { Helper } from 'src/app/shared/services/Helper/helper.service';
import { PopupTypes } from 'src/app/shared/enums/popupTypes';
import { State } from 'src/app/shared/classes/states/states';
import { FormTypes } from 'src/app/shared/enums/FormElement.enum';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';

@Component({
  selector: 'app-form-enum-element',
  templateUrl: './enum.component.html',
  styleUrls: ['./enum.component.scss']
})

export class FormularEnumElementComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  @Input() parentId;
  @Input() parentApiId;
  @Input() set setContentData(data : FormElement ){
    console.log('data', data)
    if ( data ) {
      this.contentData = data;
      if (this.contentData.metaData === 'PopupTypes.formularType'){
        this.popupTyp = PopupTypes.formularType;
      } else {
        this.parseMetaData(this.contentData.metaData);
      }
    } else {
      this.contentData =  {} as FormElement;
      this.options = [];
      console.log('no options to Display')
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
                break;
              case (DOMTypes.selectPopup):
                this.openFormularType.setFalse();
                break;
              }
              break;
        case (ActionType.update):
          switch(event.fromType) {
            case (DOMTypes.formularTypePopup):
              this.openFormularType.setFalse();
              this.contentData.value = event.output;
              this.input.nativeElement.value = event.output ? event.output : FormTypes.textField;
              break;
            case (DOMTypes.selectPopup):
              this.openFormularType.setFalse();
              this.contentData.value = event.output;
              this.input.nativeElement.value = event.output;
              break;
            }
        }
  }

  parseMetaData(metaData: string){
    console.log('TODO: deal with it when it is a problem')
    try { metaData = JSON.parse(this.contentData.metaData) } catch { };
    const metaString = metaData[this.metaDataFields.select.options] as string;
    this.options = metaString.split(';')
  }

  onFocusout() {
    if (!this.contentData || !this.parentId) {return}
    this.contentData.value = this.input.nativeElement.value;
    const _ = new  Result<any, FormElement>();
    _.toId = this.parentId;
    _.output = this.contentData;
    _.action = ActionType.update;
    _.fromType = DOMTypes.formElement
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
