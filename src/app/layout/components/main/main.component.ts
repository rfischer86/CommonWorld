import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/shared/classes/result/result';
import { DOMService, DOMElement } from 'src/app/shared/services/DOM/dom-element.service';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { States } from 'src/app/shared/classes/states/states';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  result = new Result();
  logger = new Logger();
  DOMself: DOMElement;
  state = new States();

  constructor(
    private DOM: DOMService
  ) {
    const _ = this.DOM.create(DOMTypes.root, null, DOMTypes.root);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
      this.logger.printLog();
    } else {
      this.DOMself = _.output;
      this.state.finishInit.setTure();
    }
    console.log(this.state);
  }

  ngOnInit() {
    this.result.log.addLog('Hallo Init');
    this.result.log.printLog();
  }
}
