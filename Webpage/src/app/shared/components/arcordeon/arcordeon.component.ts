import { Component, OnInit, Input } from '@angular/core';
import { DOMService, DOMElement } from '../../services/DOM/dom-element.service';
import { ArcordeonService } from './arcordeon.service';
import { ArcordeonData } from '../../classes/arcordeonData/arcordeon.data';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Logger } from '../../classes/Logger/logger';
import { Result, ActionType } from '../../classes/result/result';
import { Button } from '../../interfaces/button';
import { HtmlState } from '../../enums/htmlStates';
import { ButtonTypes } from '../../enums/button.enum';

@Component({
  selector: 'app-arcordeon',
  templateUrl: './arcordeon.component.html',
  styleUrls: ['./arcordeon.component.scss']
})
export class ArcordeonComponent implements OnInit {
  @Input()  parentId;
  DOMid: string;
  logger = new Logger();
  arcordeonData = new ArcordeonData();
  DOMself: DOMElement;
  buttonList = [] as  Button[][];

  constructor(
    private DOM: DOMService,
    private arcordeonService: ArcordeonService
  ) {
  }

  ngOnInit() {
    if(!this.arcordeonData.DOMid) { this.arcordeonData.DOMid = Math.floor(Math.random() *10 ** 10).toString()};
    const _ = this.DOM.create(DOMTypes.arcordeon, this.parentId, this.arcordeonData.DOMid);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event));
      this.DOMid = this.arcordeonData.DOMid;
    }
    this.createButtons();
  }

  processDOMEvent(event) {

  }
  createButtons() {
    this.buttonList.push(this.createToggleButton());
    this.buttonList.push(this.createAddButton());
    this.buttonList.push(this.createEditButton());
    this.buttonList.push(this.createDeleteButton());
  };

  createToggleButton(): Button[] {
    const editButton = {} as Button;
    editButton.action = this.clickDown;
    editButton.icon = 'keyboard_arrow_down';
    editButton.index = 0;
    editButton.self = this;
    editButton.htmlState = HtmlState.primary;
    editButton.size = '1em';
    editButton.nextButton = 1;
    editButton.type = ButtonTypes.icon;

    const saveButton = {} as Button;
    saveButton.action = this.clickUp;
    saveButton.icon = 'keyboard_arrow_up';
    saveButton.index = 1;
    saveButton.self = this;
    saveButton.htmlState = HtmlState.primary;
    saveButton.size = '1em';
    saveButton.nextButton = 0;
    saveButton.type = ButtonTypes.icon;
    return [editButton, saveButton];
  }

  createAddButton() {
    const button = {} as Button;
    button.action = this.clickAdd;
    button.icon = 'add';
    button.index = 0;
    button.self = this;
    // button.buttonState = ButtonState.disabled;
    button.htmlState = HtmlState.primary;
    button.size = '1em';
    button.nextButton = 0;
    button.type = ButtonTypes.icon;
    return [button];
  }

  createEditButton(): Button[] {
    const editButton = {} as Button;
    editButton.action = this.clickEdit;
    editButton.icon = 'edit';
    editButton.index = 0;
    editButton.self = this;
    editButton.htmlState = HtmlState.primary;
    editButton.size = '1em';
    editButton.nextButton = 1;
    editButton.type = ButtonTypes.icon;

    const saveButton = {} as Button;
    saveButton.action = this.clickSave;
    saveButton.icon = 'save';
    saveButton.index = 1;
    saveButton.self = this;
    saveButton.htmlState = HtmlState.primary;
    saveButton.size = '1em';
    saveButton.nextButton = 0;
    saveButton.type = ButtonTypes.icon;
    return [editButton, saveButton];
  }

  createDeleteButton(): Button[] {
    const button = {} as Button;
    button.action = this.clickDelete;
    button.icon = 'delete';
    button.index = 0;
    button.self = this;
    // button.buttonState = ButtonState.disabled;
    button.htmlState = HtmlState.warn;
    button.size = '1em';
    button.nextButton = 0;
    button.type = ButtonTypes.icon;
    return [button];
  }

  clickUp(self: ArcordeonComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.DOMid;
    _.input = self.DOMid;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.close;
    self.DOM.processEvent(_);
  }

  clickAdd(self: ArcordeonComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.DOMid;
    _.input = self.DOMid;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.add;
    self.DOM.processEvent(_);
  }


  clickDown(self: ArcordeonComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.DOMid;
    _.input = self.DOMid;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.open;
    self.DOM.processEvent(_);
  }

  clickEdit(self: ArcordeonComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.DOMid;
    _.input = self.DOMid;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.edit;
    self.DOM.processEvent(_);
  }

  clickSave(self: ArcordeonComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.DOMid;
    _.input = self.arcordeonData.name;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.save;
    self.DOM.processEvent(_);
  }

  clickDelete(self: ArcordeonComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.parentId;
    _.fromId = self.DOMid;
    _.input = self.arcordeonData;
    _.index = 1;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.delete;
    self.DOM.processEvent(_);

  }

 }
