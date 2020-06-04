import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DOMService, DOMElement } from '../../services/DOM/dom-element.service';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Result, ActionType } from '../../classes/result/result';
import { Logger } from '../../classes/Logger/logger';
import { NavData } from '../../classes/navData/nav.data';
import { States } from '../../classes/states/states';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit, OnDestroy {
  @Input() parentId: string;
  @Input() navType: string;
  DOMself: DOMElement;
  logger = new Logger();
  navData: NavData;
  states = new States();
  constructor(
    private DOM: DOMService,
  ) { }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.body, this.parentId, DOMTypes.body);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
    }
  }

  processDOMEvent(event:Result<any,any>) {
    if(!event) return;
    if (event.fromType === DOMTypes.sidenav) {
      this.loadBody(event.input)
    }
  }

  loadBody(navData: NavData) {
    this.navData = null;
    this.navData = navData;
    if( this.navData ) {
      this.states.finishInit.setTrue();
    } else {
      this.states.finishInit.setFalse();
    }
  }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMself.id;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }

}
