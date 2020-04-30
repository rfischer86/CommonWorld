import { Component, Input } from '@angular/core';
import { PopupAction } from './home.interface';
import { Text } from 'dist/commonty/assets/i18n/app.text';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { DOMService } from 'src/app/shared/services/DOM/dom-element.service';

@Component({
  selector: 'app-home-popup',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class PopupHomeComponent {
  @Input() parentId: string;

  actions = [] as  PopupAction[];
  text = new Text();
  constructor(
    private DOM: DOMService,
  ) {
    this.actions.push(this.createRegisterGroup())
   }

  createRegisterGroup(): PopupAction{
    const action = {} as PopupAction;
    action.name = this.text.entities.group_.create
    action.do = this.registerGroupDialog;
    action.self = this;
    return action;
  }

  registerGroupDialog(action: PopupAction) {
    console.log('registerGroupDialog')
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.overlay;
    _.option = OverlayTypes.registerGroup;
    _.action = ActionType.open;
    action.self.DOM.processEvent(_);
    console.log(action.self.parentId);
    const _2 = new  Result<any, any>();
    _2.toId = action.self.parentId;
    _2.option = OverlayTypes.registerGroup;
    _2.action = ActionType.close;
    action.self.DOM.processEvent(_2);
  }

}
