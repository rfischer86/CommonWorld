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
  @Input() parentApiId;
  @Input() set setContentData(data : string ){
    this.contentData = data;
  }
  contentData: string;
  contentTypes = ContentTypes;
  contentType = ContentTypes.text;
  states = new States();
  DOMself: DOMElement;
  DOMid: string;
  logger = new Logger();
  constructor (
    private DOM: DOMService,
  ){  
  }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.textNode, this.parentId);
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

  onChange(event){
    console.log('onChange', event);
    const _ = new  Result<any, any>();
    _.toId = this.parentId;
    _.toApiId = this.parentApiId
    _.fromType = DOMTypes.textNode;
    _.input = event;
    _.option = this.contentType;
    _.action = ActionType.save;
    this.DOM.processEvent(_); 
  }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMid;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }
}

