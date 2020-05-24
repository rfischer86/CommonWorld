import { Component, OnInit, Input, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { States, State } from '../../classes/states/states';
import { Result, ActionType } from '../../classes/result/result';
import { DOMElement, DOMService } from '../../services/DOM/dom-element.service';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Logger } from '../../classes/Logger/logger';
import { ContentTypes } from '../../enums/ContentType';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {

  contentData: string;
  contentTypes = ContentTypes;
  contentType: ContentTypes;
  states = new States();
  DOMself: DOMElement;
  DOMid: string;
  logger = new Logger();

  @Input() parentId;
  @Input() set setContentType(type: ContentTypes) {
    this.contentType = type ? type : ContentTypes.text;
  };
  @Input() setContentData(data: string) {
    this.contentData = data;
  };

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

