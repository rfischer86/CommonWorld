import { Component, OnInit, Input } from '@angular/core';
import { DOMService, DOMElement } from '../../services/DOM/dom-element.service';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Logger } from '../../classes/Logger/logger';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Result, ActionType } from '../../classes/result/result';
import { States } from '../../classes/states/states';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() parentId;
  DOMself: DOMElement;
  logger = new Logger();
  states = new States()
  constructor(
    private DOM: DOMService,
  ) {
  }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.sidenav, this.parentId, DOMTypes.sidenav);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
    }
  }

  processDOMEvent(event:  Result<any, any>) {
    if (!event) return;
    console.log(event);
    switch(event.action) {
      case (ActionType.toggel):
        this.states.open.toggleState();
        break;
      case (ActionType.close):
        this.states.open.setFalse()
        break;
      case (ActionType.open):
        break;
      }
  }

}
