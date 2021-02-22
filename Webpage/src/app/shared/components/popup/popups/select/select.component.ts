import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PopupAction } from '../../../../interfaces/PopupAction.interface';
import { Text } from '../../../../../../assets/i18n/app.text';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { ContentTypes } from 'src/app/shared/enums/ContentType';
import { PopupTypes } from 'src/app/shared/enums/popupTypes';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'app-select-popup',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, AfterViewInit{
  @Input() parentId: string;
  @Input() parentParentId: string;
  @Input() popupData = [] as string[];
  actions = [] as  PopupAction<SelectComponent>[];
  text = new Text();
  constructor(
    private DOM: DOMService,
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    if (this.popupData) {
      this.popupData.map(option => {
        this.actions.push(this.createSelectOptionButton(option, option));
      })
      this.actions = [...this.actions];
    }
  }

  createSelectOptionButton(optionText: string, value: string): PopupAction<SelectComponent>{
    const action = {} as PopupAction<SelectComponent>;
    action.name = optionText;
    action.do = this.changeSelectValue;
    action.parentParentId = this.parentParentId;
    action.apiId = this.parentId;
    action.data =  value;
    action.self = this;
    return action;
  }

  changeSelectValue(action: PopupAction<SelectComponent>) {
    const _ = new  Result<any, any>();
    _.log = new Logger();
    _.log.addLog(ActionType.update + ' id  ' + action.parentParentId + DOMTypes.contentTypePopup );
    _.toId = action.parentParentId;
    _.output = action.data;
    _.fromApiId = DOMTypes.selectPopup;
    _.fromType = DOMTypes.selectPopup;
    _.action = ActionType.update;
    action.self.DOM.processEvent(_);

    const _2 = new  Result<any, any>();
    _2.log = new Logger();
    _2.log.addLog(ActionType.close + ' popup ' + PopupTypes.contentType +' with id  ' + action.self.parentId  );
    _2.toId = action.self.parentId;
    _2.option = PopupTypes.select;
    _2.action = ActionType.close;
    action.self.DOM.processEvent(_2);

  }

}
