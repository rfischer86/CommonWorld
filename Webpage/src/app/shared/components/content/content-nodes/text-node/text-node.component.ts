import { Component, OnInit, Input, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { States } from 'src/app/shared/classes/states/states';
import { DOMElement, DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { ContentTypes } from 'src/app/shared/enums/ContentType';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { Result, ActionType } from 'src/app/shared/classes/result/result';

@Component({
  selector: 'app-text-node',
  templateUrl: './text-node.component.html',
  styleUrls: ['./text-node.component.scss']
})
export class TextNodeComponent implements OnInit, OnDestroy {

  @Input() parentId;
  @Input() contentData: string;

  contentTypes = ContentTypes;
  states = new States();
  DOMself: DOMElement;
  DOMid: string;
  logger = new Logger();
  constructor (
    private DOM: DOMService,
  ){  }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.content, this.parentId);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
      this.DOMid = this.DOMself.id;
    }
  }

  processDOMEvent(event: Result<any, any>) {
    if(!event) {return}
  }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMself.id;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }
}

