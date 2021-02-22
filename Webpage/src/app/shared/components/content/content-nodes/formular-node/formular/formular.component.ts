import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { States, State } from '../../../../../classes/states/states';
import { Result, ActionType } from '../../../../../classes/result/result';
import { DOMElement, DOMService } from '../../../../../services/DOM/dom-element.service';
import { DOMTypes } from '../../../../../enums/DOMElement.enum';
import { Logger } from '../../../../../classes/Logger/logger';
import { FormularDataService } from './formularData.class';
import { Formular } from 'src/app/shared/interfaces/form.interface';

export enum FormularNodeComponentOption {
  frontend = 'frontend',
  backend = 'backend'
}

@Component({
  selector: 'app-formular-node',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.scss']
})
export class FormularNodeComponent implements OnInit, OnDestroy {

  contentData: string;
  states = new States();
  DOMself: DOMElement;
  DOMid: string;
  logger = new Logger();
  formularDataService = new FormularDataService();
  formular = {} as Formular;
  @Input() parentId;
  @Input() parentApiId;

  @Input() set setContentData(data: Result<any,any>) {
    console.log('this.contentData', data)
    switch(data.option) {
      case FormularNodeComponentOption.frontend:
        console.log('ToDo');
        break;
      case FormularNodeComponentOption.backend:
        console.log('ToDo');
    }
  };

  @Input() set setFormularId(formularId: string) {
    console.log('TODO: load formular')
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
    switch (event.fromType) {
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

