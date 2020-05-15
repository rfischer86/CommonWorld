import { Component, OnInit, Input } from '@angular/core';
import { DOMService, DOMElement } from '../../services/DOM/dom-element.service';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Result } from '../../classes/result/result';
import { Logger } from '../../classes/Logger/logger';
import { NavData } from '../../classes/navData/nav.data';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  @Input() parentId: string;
  @Input() navType: string;
  DOMself: DOMElement;
  logger = new Logger();
  navData: NavData;
  constructor(
    private DOM: DOMService,
  ) { }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.sidenav, this.parentId, DOMTypes.body);
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
    this.navData = navData;
    console.log('this.navData', this.navData);
    console.log('TODO: Implement load body');
  }

}
