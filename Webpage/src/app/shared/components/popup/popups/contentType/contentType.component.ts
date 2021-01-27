import { Component, Input, OnInit } from '@angular/core';
import { PopupAction } from '../../../../interfaces/PopupAction.interface';
import { Text } from '../../../../../../assets/i18n/app.text';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { ContentTypes } from 'src/app/shared/enums/ContentType';
import { PopupTypes } from 'src/app/shared/enums/popupTypes';
import { Logger } from 'src/app/shared/classes/Logger/logger';

@Component({
  selector: 'app-content-type-popup',
  templateUrl: './contentType.component.html',
  styleUrls: ['./contentType.component.scss']
})
export class ContentTypeComponent implements OnInit{
  @Input() parentId: string;
  @Input() parentParentId: string;

  actions = [] as  PopupAction<ContentTypeComponent>[];
  text = new Text();
  constructor(
    private DOM: DOMService,
  ) { }

  ngOnInit() {
    this.actions.push(this.createTextNodeButton());
    this.actions.push(this.createCalenderNodeButton());
    this.actions.push(this.createFormularNodeButton());
    this.actions.push(this.createTableNodeButton());
  }

  createTextNodeButton(): PopupAction<ContentTypeComponent>{
    const action = {} as PopupAction<ContentTypeComponent>;
    action.name = this.text.contentTypes.text;
    action.do = this.changeContentType;
    action.parentParentId = this.parentParentId;
    action.apiId = this.parentId;
    action.data = ContentTypes.text;
    action.self = this;
    return action;
  }

  createFormularNodeButton(): PopupAction<ContentTypeComponent>{
    const action = {} as PopupAction<ContentTypeComponent>;
    action.name = this.text.contentTypes.formular;
    action.do = this.changeContentType;
    action.parentParentId = this.parentParentId;
    action.apiId = this.parentId;
    action.data = ContentTypes.form;
    action.self = this;
    return action;
  }


  createTableNodeButton(): PopupAction<ContentTypeComponent>{
    const action = {} as PopupAction<ContentTypeComponent>;
    action.name = this.text.contentTypes.table
    action.do = this.changeContentType;
    action.apiId = this.parentId;
    action.parentParentId = this.parentParentId;
    action.data = ContentTypes.table;
    action.self = this;
    return action;
  }


  createCalenderNodeButton(): PopupAction<ContentTypeComponent>{
    const action = {} as PopupAction<ContentTypeComponent>;
    action.name = this.text.contentTypes.calendar
    action.do = this.changeContentType;
    action.apiId = this.parentId;
    action.parentParentId = this.parentParentId;
    action.data = ContentTypes.calender;
    action.self = this;
    return action;
  }

  changeContentType(action: PopupAction<ContentTypeComponent>) {
    const _ = new  Result<any, any>();
    _.log = new Logger();
    _.log.addLog(ActionType.update + ' id  ' + action.parentParentId + DOMTypes.contentTypePopup );
    _.toId = action.parentParentId;
    _.option = action.data;
    _.fromApiId = DOMTypes.contentTypePopup;
    _.action = ActionType.update;
    action.self.DOM.processEvent(_);

    const _2 = new  Result<any, any>();
    _2.log = new Logger();
    _2.log.addLog(ActionType.close + ' popup ' + PopupTypes.contentType +' with id  ' + action.self.parentId  );
    _2.toId = action.self.parentId;
    _2.option = PopupTypes.contentType;
    _2.action = ActionType.close;
    action.self.DOM.processEvent(_2);

  }

}
