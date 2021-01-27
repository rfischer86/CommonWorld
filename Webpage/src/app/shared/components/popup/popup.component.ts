import { Component, OnInit, Input, HostListener, ViewChild, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { States, State } from '../../classes/states/states';
import { Result, ActionType } from '../../classes/result/result';
import { DOMElement, DOMService } from '../../services/DOM/dom-element.service';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Logger } from '../../classes/Logger/logger';
import { PopupTypes } from '../../enums/popupTypes';
import { MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('menuTrigger') matMenuTriger: MatMenuTrigger;

  @Input() parentId;
  popupTypes = PopupTypes;
  popupType: PopupTypes;
  states = new States();
  latencTime = new State(true);

  @Input() set data(data: Result<any,any> ) {
    if (data ) {
      this.latencTime.setTrue();
      setTimeout(() => this.latencTime.setFalse(), 500);
      this.states.open.setTrue();
      this.popupData = data.input;
      this.popupType = data.option as PopupTypes;
    } else {
      this.states.open.setFalse();
      this.popupData = null;
      this.popupType = null;
    }
  }
  popupData: Result<any, any>;
  DOMself: DOMElement;
  DOMid: string;
  logger = new Logger();
  constructor (
    private cdr: ChangeDetectorRef,
    private DOM: DOMService,
  ){
    this.latencTime.setTrue();
    setTimeout(() => this.latencTime.setFalse(), 500);
  }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.popup, this.parentId, DOMTypes.popup);
    this.DOM.getById(DOMTypes.popup)
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
      this.DOMid = this.DOMself.id;
    }
  }

  ngAfterViewInit() {
    this.matMenuTriger.openMenu();
    this.matMenuTriger.onMenuClose.subscribe(()=> this.closeOverlay());
    this.cdr.detectChanges();
  }

  processDOMEvent(event: Result<any, any>) {
    if(!event) {return}
    this.popupData = event;
    this.popupType = event.option as PopupTypes;
    if (event.action===ActionType.close) {
      this.closeOverlay();
    };
  }

  closeOverlay() {
    switch (this.popupType) {
      case(PopupTypes.home):
        const _ = new  Result<any, any>();
        _.toId = DOMTypes.header;
        _.option = PopupTypes.home;
        _.type = DOMTypes.popup;
        _.action = ActionType.close;
        this.DOM.processEvent(_);
        break;
      case(PopupTypes.contentType):
        const _2 = new  Result<any, any>();
        _2.toId = this.parentId;
        _2.fromType = DOMTypes.contentTypePopup;
        _2.action = ActionType.close;
        this.DOM.processEvent(_2);
        break;

      case(PopupTypes.formularType):
        const _3 = new  Result<any, any>();
        _3.toId = this.parentId;
        _3.fromType = DOMTypes.formularTypePopup;
        _3.action = ActionType.close;
        this.DOM.processEvent(_3);
        break;

        case(PopupTypes.select):
        const _4 = new  Result<any, any>();
        _4.toId = this.parentId;
        _4.fromType = DOMTypes.selectPopup;
        _4.action = ActionType.close;
        this.DOM.processEvent(_4);
        break;
      }

    this.popupData = null;
    this.popupType = null;
    this.states.open.setFalse();
  }

  // @HostListener('document:click', ['$event'])
  // public onClick(targetElement: Event) {
  //   if (!this.states.open.value || this.latencTime.isTrue()) {return}
  //   const clickedInside = this.popup.nativeElement.contains(targetElement.target);
  //   if (!clickedInside) {
  //     targetElement.stopPropagation();
  //     targetElement.preventDefault();
  //   }
  // }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMid;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }
}

