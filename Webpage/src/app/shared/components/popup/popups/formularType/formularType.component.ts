import { Component, Input, OnInit } from '@angular/core';
import { PopupAction } from '../../../../interfaces/PopupAction.interface';
import { Text } from '../../../../../../assets/i18n/app.text';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { PopupTypes } from 'src/app/shared/enums/popupTypes';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { FormTypes } from 'src/app/shared/enums/FormElement.enum';

@Component({
  selector: 'app-formular-type-popup',
  templateUrl: './formularType.component.html',
  styleUrls: ['./formularType.component.scss']
})
export class FormularTypeComponent implements OnInit{
  @Input() parentId: string;
  @Input() parentParentId: string;

  actions = [] as  PopupAction<FormularTypeComponent>[];
  text = new Text();
  constructor(
    private DOM: DOMService,
  ) { }

  ngOnInit() {
    this.actions.push(this.createSelectOptionButton(this.text.formularTypes.textField,FormTypes.textField))
    this.actions.push(this.createSelectOptionButton(this.text.formularTypes.textLine,FormTypes.textLine))
    this.actions.push(this.createSelectOptionButton(this.text.formularTypes.textarea,FormTypes.textArea))
    this.actions.push(this.createSelectOptionButton(this.text.formularTypes.select,FormTypes.select))
    this.actions.push(this.createSelectOptionButton(this.text.formularTypes.checkbox,FormTypes.checkbox))
    this.actions.push(this.createSelectOptionButton(this.text.formularTypes.range,FormTypes.range))
    this.actions.push(this.createSelectOptionButton(this.text.formularTypes.date,FormTypes.date))
    this.actions.push(this.createSelectOptionButton(this.text.formularTypes.document,FormTypes.document))
    this.actions.push(this.createSelectOptionButton(this.text.formularTypes.number,FormTypes.number))
  }

  createSelectOptionButton(optionText: string, value: FormTypes): PopupAction<FormularTypeComponent>{
    const action = {} as PopupAction<FormularTypeComponent>;
    action.name = optionText;
    action.do = this.changeFormularType;
    action.parentParentId = this.parentParentId;
    action.apiId = this.parentId;
    action.data =  value;
    action.self = this;
    return action;
  }

  changeFormularType(action: PopupAction<FormularTypeComponent>) {
    const _ = new  Result<any, any>();
    _.log = new Logger();
    _.log.addLog(ActionType.update + ' id  ' + action.parentParentId + DOMTypes.formularTypePopup );
    _.toId = action.parentParentId;
    _.output = action.data;
    _.fromApiId = DOMTypes.formularTypePopup;
    _.fromType = DOMTypes.formularTypePopup;
    _.action = ActionType.update;
    action.self.DOM.processEvent(_);

    const _2 = new  Result<any, any>();
    _2.log = new Logger();
    _2.fromApiId = DOMTypes.formularTypePopup;
    _2.log.addLog(ActionType.close + ' popup ' + PopupTypes.formularType +' with id  ' + action.self.parentId  );
    _2.toId = action.self.parentId;
    _2.output = action.data;
    _2.fromType = DOMTypes.formularTypePopup;
    _2.option = PopupTypes.formularType;
    _2.action = ActionType.close;
    action.self.DOM.processEvent(_2);

  }

}
