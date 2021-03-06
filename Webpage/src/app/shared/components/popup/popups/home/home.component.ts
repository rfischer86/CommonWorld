import { Component, Input } from '@angular/core';
import { PopupAction } from '../../../../interfaces/PopupAction.interface';
import { Text } from '../../../../../../assets/i18n/app.text';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { PopupTypes } from 'src/app/shared/enums/popupTypes';

@Component({
  selector: 'app-home-popup',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class PopupHomeComponent {
  @Input() parentId: string;

  actions = [] as  PopupAction<PopupHomeComponent>[];
  text = new Text();
  constructor(
    private DOM: DOMService,
  ) {
    this.actions.push(this.createRegisterGroup())
   }

  createRegisterGroup(): PopupAction<PopupHomeComponent>{
    const action = {} as PopupAction<PopupHomeComponent>;
    action.name = this.text.entities.group_.create
    action.do = this.registerGroupDialog;
    action.self = this;
    return action;
  }

  registerGroupDialog(action: PopupAction<PopupHomeComponent>) {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.overlay;
    _.option = OverlayTypes.registerGroup;
    _.action = ActionType.open;
    action.self.DOM.processEvent(_);
  }

}
