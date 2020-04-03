import { Component, OnInit, Input } from '@angular/core';
import { DOMService, DOMElement } from '../../services/DOM/dom-element.service';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Logger } from '../../classes/Logger/logger';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() parentId;
  DOMself: DOMElement;
  logger = new Logger();
  constructor(
    private DOM: DOMService,
  ) {
  }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.sidenave, this.parentId, DOMTypes.sidenave);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
    }
  }

}
