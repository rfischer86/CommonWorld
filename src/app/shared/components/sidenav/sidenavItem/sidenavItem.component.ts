import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DOMService, DOMElement } from '../../../services/DOM/dom-element.service';
import { DOMTypes } from '../../../enums/DOMElement.enum';
import { Logger } from '../../../classes/Logger/logger';
import { Result, ActionType } from '../../../classes/result/result';
import { States } from '../../../classes/states/states';
import { NavData } from '../../../classes/navData/nav.data';
import { ButtonState, ButtonTypes } from 'src/app/shared/enums/button.enum';
import { Button } from 'src/app/shared/interfaces/button';
import { HtmlState } from 'src/app/shared/enums/htmlStates';



@Component({
  selector: 'app-sidenav-item',
  templateUrl: './sidenavItem.component.html',
  styleUrls: ['./sidenavItem.component.scss']
})
export class SidenavItemComponent implements OnInit {
  @ViewChild('sidenavText') sidenavText: HTMLInputElement;

  @Input() parentId: string;
  @Input() set open(value: boolean) {
    this.states.open.value = value;
  }
  @Input() set setNavData(navData: NavData) {
    this.navData = navData;
    if (navData) {
      this.states.finishInit.setTrue();
    } else {
      this.states.finishInit.setFalse();
    }
  };
  navData: NavData;
  DOMself: DOMElement;
  logger = new Logger();
  states = new States();
  buttonList = [] as  Button[][];
  DOMid: string;

  constructor(
    private DOM: DOMService,
  ) {
  }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.sidenav, this.parentId, this.navData.DOMid);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event));
      this.DOMid = this.navData.DOMid;
    }
    this.createButtons();
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

  clickUp(self: SidenavItemComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.DOMid;
    _.input = self.DOMid;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.close;
    self.DOM.processEvent(_);
  }

  clickAdd(self: SidenavItemComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.DOMid;
    _.input = self.DOMid;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.add;
    self.DOM.processEvent(_);
  }


  clickDown(self: SidenavItemComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.DOMid;
    _.input = self.DOMid;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.open;
    self.DOM.processEvent(_);
  }

  clickEdit(self: SidenavItemComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.DOMid;
    _.input = self.DOMid;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.edit;
    self.DOM.processEvent(_);
  }

  clickSave(self: SidenavItemComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.DOMid;
    _.input = self.DOMid;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.save;
    self.DOM.processEvent(_);
  }

  clickDelete(self: SidenavItemComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.parentId;
    _.input = self.DOMid;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.delete;
    self.DOM.processEvent(_);
  }

  processDOMEvent(event:  Result<string, any>) {
    if (!event) return;
    switch(event.action) {
      case (ActionType.delete):
        this.navData.navData = this.navData.navData.filter(navItem => {
          return navItem.DOMid !== event.input;
        } );
        break;
      case (ActionType.edit):
        this.states.editMode.setTrue();
        break;
      case (ActionType.save):
        this.states.editMode.setFalse();
        console.log('this.sidenavText.value', this.sidenavText.value);
        if (!!this.sidenavText.value){
          this.navData.name = this.sidenavText.value;
        }
        console.log('TODO: implement save');
        break;
      case (ActionType.add):
        this.states.editMode.setFalse();
        const newNavItem = new NavData();
        newNavItem.name='Neues Element';
        this.navData.navData.push(newNavItem);
        this.states.open.setTrue();
        break;
      case (ActionType.close):
        this.states.open.setFalse()
        break;
      case (ActionType.open):
        this.states.open.setTrue()
        break;
      }
    this.loadData(event);
  }

  toggleOpenState(event:  Result<any, any>) {
  }

  loadData(event:  Result<any, any>) {
    switch(event.action) {
      case (ActionType.load):
        this.navData = new NavData().getById(event.input as string).output;
        break;
      case (ActionType.transmit):
        this.navData = new NavData(event.input as NavData);
        break;
    }
  }

  clickNavElement(data: NavData) {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.body;
    _.fromType = DOMTypes.sidenav;
    _.input = data;
    _.action = ActionType.load;
    this.DOM.processEvent(_);
  }

}
