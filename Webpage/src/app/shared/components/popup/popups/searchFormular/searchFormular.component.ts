import { Component, Input, OnInit } from '@angular/core';
import { Text } from '../../../../../../assets/i18n/app.text';
import { DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { PopupAction } from 'src/app/shared/interfaces/PopupAction.interface';
import { Group } from 'src/app/shared/interfaces/group.interface';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { PopupTypes } from 'src/app/shared/enums/popupTypes';

@Component({
  selector: 'app-search-formular-popup',
  templateUrl: './searchFormular.component.html',
  styleUrls: ['./searchFormular.component.scss']
})
export class PopupSearchFormularComponent{
  @Input() parentId: string;
  @Input() popupAction = [] as  PopupAction<PopupSearchFormularComponent>[];

  text = new Text();
  constructor(
    private DOM: DOMService
  ) {

  }

  clickEl(group: PopupAction<PopupSearchFormularComponent>) {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.groupSelector;
    _.toApiId = group.apiId;
    _.type = DOMTypes.searchField;
    _.action = ActionType.add;
    _.name = group.name;
    this.DOM.processEvent(_);

    const _2 = new  Result<any, any>();
    _2.toId = DOMTypes.header;
    _2.option = PopupTypes.search;
    _2.action = ActionType.close;
    this.DOM.processEvent(_2);
  }

}
