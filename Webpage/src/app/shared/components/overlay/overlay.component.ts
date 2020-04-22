import { Component, OnInit, Input } from '@angular/core';
import { Button } from '../../interfaces/button';
import { ButtonTypes, ButtonState } from '../../enums/button.enum';
import { States } from '../../classes/states/states';
import { HtmlState } from '../../enums/htmlStates';
import { Result } from '../../classes/result/result';
import { OverlayTypes } from '../../enums/overlayTypes';
import { DOMElement, DOMService } from '../../services/DOM/dom-element.service';
import { UserService } from '../../services/User/user.service';
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
    this.overlayData = overlayEvent;
  }
  overlayData: Result<any, any>;
  DOMself: DOMElement;
  logger = new Logger();
  constructor (
    private DOM: DOMService,
  ){
    console.log('init overlay')
  }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.dialog, DOMTypes.main, DOMTypes.dialog);
    this.DOM.getById(DOMTypes.sidenav)
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
    }
  }

  processDOMEvent(event: Result<any, any>) {
    console.log('event', event);
    if(!event) {return}
    this.overlayData = event;
    this.overlayType = event.option as OverlayTypes;
  }

  closeOverlay() {
    this.overlayData=null;
  }
}
