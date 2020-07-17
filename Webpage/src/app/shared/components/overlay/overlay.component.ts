import { Component, OnInit, Input } from '@angular/core';
import { States } from '../../classes/states/states';
import { Result, ActionType } from '../../classes/result/result';
import { OverlayTypes } from '../../enums/overlayTypes';
import { DOMElement, DOMService } from '../../services/DOM/dom-element.service';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Logger } from '../../classes/Logger/logger';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  overlayTypes = OverlayTypes;
  overlayType: OverlayTypes;
  states = new States();
  @Input() set overlayEvent(overlayEvent: Result<any,any> ) {
    if(!overlayEvent) {return}
    this.overlayData = overlayEvent;
    this.data = overlayEvent.input;
    this.option = overlayEvent.option2;
  }
  option; 
  data;
  overlayData: Result<any, any>;
  DOMself: DOMElement;
  logger = new Logger();
  constructor (
    private DOM: DOMService,
  ){ }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.overlay, DOMTypes.main, DOMTypes.overlay);
    this.DOM.getById(DOMTypes.overlay)
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
    }
  }

  processDOMEvent(event: Result<any, any>) {
    if(!event) {return}
    if (event.action === ActionType.open) {
      this.overlayData = event;
      this.data = event.input;
      this.overlayType = event.option as OverlayTypes;
      this.option = event.option2;
    };
    if (event.action === ActionType.close) {
      this.closeOverlay();
    };
    if (event.action === ActionType.transmit) {
      event.toId = this.overlayData.fromId;
      event.action = event.nextActionType;
      event.fromType = DOMTypes.overlay;
      this.DOM.processEvent(event);
      setTimeout(() => this.closeOverlay(), 200);
    };
  }

  closeOverlay() {
    this.overlayData=null;
  }
}

