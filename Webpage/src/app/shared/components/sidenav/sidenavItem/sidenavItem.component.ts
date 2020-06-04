import { Component, OnInit, Input, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { DOMService, DOMElement } from '../../../services/DOM/dom-element.service';
import { DOMTypes } from '../../../enums/DOMElement.enum';
import { Logger } from '../../../classes/Logger/logger';
import { Result, ActionType } from '../../../classes/result/result';
import { States, State } from '../../../classes/states/states';
import { NavData } from '../../../classes/navData/nav.data';
import { ButtonTypes } from 'src/app/shared/enums/button.enum';
import { Button } from 'src/app/shared/interfaces/button';
import { HtmlState } from 'src/app/shared/enums/htmlStates';
import { SidenavItemService } from '../../../services/REST/sidenavItem.service';
import { KEY } from '../../../../shared/enums/keyCodes.ts'

@Component({
  selector: 'app-sidenav-item',
  templateUrl: './sidenavItem.component.html',
  styleUrls: ['./sidenavItem.component.scss']
})
export class SidenavItemComponent implements OnInit, OnDestroy {
  @ViewChild('sidenavText') sidenavText: ElementRef<HTMLInputElement>;

  @Input() parentId: string;
  @Input() firstElement: boolean;
  @Input() content: boolean;

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
  clickTimeout = new State(false);
  buttonList = [] as  Button[][];
  domId: string;

  constructor(
    private DOM: DOMService,
    private entityService: SidenavItemService
  ) {
  }

  ngOnInit() {
    if(!this.navData.domId) { this.navData.domId = Math.floor(Math.random() *10 ** 10).toString()};
    if (this.content && !this.navData.domId.includes('content')) {
      this.navData.domId = 'content' + this.navData.domId;
    }
    const _ = this.DOM.create(DOMTypes.sidenav, this.parentId, this.navData.domId);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event));
      this.domId = this.navData.domId;
    }
    this.createButtons();
  }

  createButtons() {
    this.buttonList.push(this.createToggleButton());
    this.buttonList.push(this.createAddButton());
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
    _.toId = self.domId;
    _.input = self.domId;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.close;
    self.DOM.processEvent(_);
  }

  clickAdd(self: SidenavItemComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.domId;
    _.input = self.domId;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.add;
    self.DOM.processEvent(_);
  }


  clickDown(self: SidenavItemComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.domId;
    _.input = self.domId;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.open;
    self.DOM.processEvent(_);
  }

  clickEdit(): void {
    const _ = new  Result<any, any>();
    _.toId = this.domId;
    _.input = this.domId;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.edit;
    this.DOM.processEvent(_);
  }

  clickSave(): void {
    const _ = new  Result<any, any>();
    _.toId = this.domId;
    _.input = this.navData.name;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.save;
    this.DOM.processEvent(_);
  }

  clickDelete(self: SidenavItemComponent, data: any): void {
    const _ = new  Result<any, any>();
    _.toId = self.parentId;
    _.fromId = self.domId;
    _.fromApiId = self.navData.apiId;
    _.input = self.navData;
    _.index = 1;
    _.type = DOMTypes.sidenavItem;
    _.action = ActionType.delete;
    self.DOM.processEvent(_);

  }

  processDOMEvent(event:  Result<any, any>) {
    if (!event) return;
    switch(event.action) {
      case (ActionType.delete):
        this.navData.navData = this.navData.navData.filter(navItem => this.deleteNavItem(navItem, event));
        break;
      case (ActionType.edit):
        this.states.editMode.setTrue();
        break;
      case (ActionType.save):
        this.navData.name = event.input;
        this.states.editMode.setTrue();
        this.entityService.update(this.navData).subscribe(
          data => { console.log(data)},
          error => {console.log(error)}
        )
        break;
      case (ActionType.add):
        this.states.editMode.setFalse();
        const newNavItem = new NavData();
        newNavItem.name='New Element';
        this.navData.navData.push(newNavItem);
        this.entityService.create(newNavItem).subscribe(
          data => {
            this.entityService.addItem(this.navData.apiId, newNavItem.apiId).subscribe(
              data2 => console.log(data2),
              error => console.log(error)
            );
          },
          error => console.log(error)
        );
        this.states.open.setTrue();
        break;
      case (ActionType.close):
        this.states.open.setFalse()
        break;
      case (ActionType.open):
        this.states.open.setTrue()
        break;
      case (ActionType.load):
        this.navData = new NavData().getByDomId(event.toApiId).output;
        console.log('this.navData', this.navData);
        break;
      case (ActionType.transmit):
        this.navData = new NavData(event.input as NavData);
        break;
  
      }
  }

  updateName(event: KeyboardEvent) {
    this.navData.name = (this.sidenavText as ElementRef).nativeElement.value;
    if (event.key === KEY.ENTER) {
      this.states.editMode.setFalse();
      this.clickSave();
    }
  }

  deleteNavItem(navItem: NavData, event: Result<string, any>): boolean {
    if ( navItem.domId !== event.fromId) {
      this.entityService
        .removeItem(this.navData.apiId, event.fromApiId)
        .subscribe(
          data => console.log(data),
          error => console.log(error)
        )
      return true;
    } else {
      return false;
    }
  }

  toggleOpenState(event:  Result<any, any>) {
  }

  editSidenavText() {
    this.clickTimeout.setFalse();
    if (this.states.editMode) {
      this.clickEdit();
      this.states.editMode.setTrue();
    } 
  }

  clickNavElement(data: NavData) {
    this.clickTimeout.toggleState();
    setTimeout(() => this.clickTimeout.setFalse(), 300);
    if (this.clickTimeout.isFalse()) {
      this.editSidenavText()
    } 
    if (this.clickTimeout.isTrue()) {
      setTimeout(() => {
        const _ = new  Result<any, any>();
        _.toId = DOMTypes.body;
        _.fromType = DOMTypes.sidenav;
        _.input = data;
        _.option = data.type;
        _.action = ActionType.load;
        if (this.clickTimeout.isTrue()) {
          this.DOM.processEvent(_);
        } 
      }, 290 );
    }
    
  }

  clickButtonDiv(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.domId;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }
}
