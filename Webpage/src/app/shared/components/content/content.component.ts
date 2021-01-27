import { Component, OnInit, Input, HostListener, ViewChild, OnDestroy } from '@angular/core';
import { States, State } from '../../classes/states/states';
import { Result, ActionType } from '../../classes/result/result';
import { DOMElement, DOMService } from '../../services/DOM/dom-element.service';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Logger } from '../../classes/Logger/logger';
import { ContentTypes } from '../../enums/ContentType';
import { TextNodeService } from './content-nodes/text-node/text-node.service';
import { FormNodeService } from './content-nodes/formular/form-node.service';

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
  @Input() parentApiId;

  @Input() set setContentType(type: ContentTypes) {
    this.contentType = type ? type : ContentTypes.text;
  };
  @Input() set setContentData(data: string) {
    this.contentData = data;
  };

  constructor (
    private DOM: DOMService,
    private textNodeService: TextNodeService,
    private tableNodeService: TextNodeService,
    private formNodeService: FormNodeService
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

  saveContent(event: Result<any, any>) {
    if (event.option === ContentTypes.text) {
      event.toApiId = this.parentApiId;
      this.textNodeService.update(event).subscribe(
        data => console.log(data),
        error => console.error(error)
      )
    }
    if (event.option === ContentTypes.form) {
      event.input.apiId = event.toApiId;
      console.log(event);
      this.formNodeService.update(event).subscribe(
        data => console.log(data),
        error => console.error(error)
      )
    }
    if (event.option === ContentTypes.table) {
      event.input.apiId = event.toApiId;
      console.log('ToDo: implement save of table');
      console.log(event);
      this.tableNodeService.update(event).subscribe(
        data => console.log(data),
        error => console.error(error)
      )
    }

  }

  processDOMEvent(event: Result<any, any>) {
    if(!event) {return}
    if (event.action === ActionType.save) {
      this.saveContent(event);
    }
  }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMself.id;
    _.log = new Logger();
    _.log.addLog('destroy ContentComponent');
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }
}

