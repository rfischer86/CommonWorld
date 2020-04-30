import { Component, OnInit, Input } from '@angular/core';
import { DOMService, DOMElement } from '../../services/DOM/dom-element.service';
import { Button } from '../../interfaces/button';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Logger } from '../../classes/Logger/logger';
import { ButtonTypes, ButtonState } from '../../enums/button.enum';
import { Result, ActionType } from '../../classes/result/result';
import { HtmlState } from '../../enums/htmlStates';
import { NavTypes } from '../../enums/navTypes';
import { UserService } from '../../services/User/user.service';
import { OverlayTypes } from '../../enums/overlayTypes';
import { SearchServices } from '../search-field/search-field.interface';
import { Text } from 'dist/commonty/assets/i18n/app.text';
import { PopupTypes } from '../../enums/popupTypes';
import { State } from '../../classes/states/states';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() parentId;
  text = new Text();
  searchServices = SearchServices;
  menueButtonList = [] as Button[];
  actiomButtonList = [] as Button[];
  DOMself: DOMElement;
  DOMid: string;
  logger = new Logger();
  popupData: Result<any, any>;
  openHome = new State(false);
  constructor(
    private userService: UserService,
    private DOM: DOMService,
  ) {

  }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.header, this.parentId, DOMTypes.header);
    this.DOM.getById(DOMTypes.sidenav)
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event));
      this.DOMid = this.DOMself.id;
    }
    this.createButtons();
  }

  processDOMEvent(event: Result<any, any>) {
    if (!event){return};
    if (event.action === ActionType.open && event.option === PopupTypes.home) {
      this.openHomePopup();
    }
    if (event.action === ActionType.close && event.option === PopupTypes.home) {
      this.closeHomePopup();
    }
  }

  openHomePopup(){
    const _ = new  Result<any, any>();
    this.popupData = new Result<any,any>();
    this.popupData.option = PopupTypes.home;
    this.openHome.setTrue();
  }

  closeHomePopup(){
    const _ = new  Result<any, any>();
    this.openHome.setFalse();
  }

  createButtons(): void {
    this.menueButtonList.push(this.createMenueButton())
    this.actiomButtonList.push(this.createProfileButton());
    this.actiomButtonList.push(this.createHomeButton());
    this.actiomButtonList.push(this.createSearchButton());
  }

  createMenueButton(): Button {
    const button = {} as Button;
    button.action = this.clickMenue;
    button.icon = 'menu';
    button.buttonState = ButtonState.active;
    button.htmlState = HtmlState.primary;
    button.index = 0;
    button.size = '2em';
    button.self = this;
    button.nextButton = 0;
    button.type = ButtonTypes.icon;
    return button;
  }

  createSearchButton(): Button {
    const button = {} as Button;
    button.action = this.clickSearch;
    button.icon = 'search';
    button.index = 0;
    button.self = this;
    button.buttonState = ButtonState.active;
    button.htmlState = HtmlState.primary;
    button.size = '2em';
    button.nextButton = 0;
    button.type = ButtonTypes.icon;
    return button;
  }

  createProfileButton(): Button {
    const button = {} as Button;
    button.action = this.clickProfile;
    button.icon = 'account_circle';
    button.index = 0;
    button.self = this;
    button.buttonState = ButtonState.active;
    button.htmlState = HtmlState.primary;
    button.nextButton = 0;
    button.size = '2em';
    button.type = ButtonTypes.icon;
    return button;
  }

  createHomeButton(): Button {
    const button = {} as Button;
    button.action = this.clickHome;
    button.icon = 'home';
    button.index = 0;
    button.self = this;
    button.buttonState = ButtonState.active;
    button.htmlState = HtmlState.primary;
    button.nextButton = 0;
    button.size = '2em';
    button.type = ButtonTypes.icon;
    return button;
  }



  clickMenue(self: HeaderComponent, data: any) {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.main;
    _.option = NavTypes.menu;
    _.type = DOMTypes.sidenav;
    _.action = ActionType.toggel;
    self.DOM.processEvent(_);
  }

  clickSearch(self: HeaderComponent, data: any) {
    const _ = new  Result<any, any>();
    // _.toId = DOMTypes.sidenav;
    // _.action = ActionType.toggel;
    // self.DOM.processEvent(_);
  }

  clickProfile(self: HeaderComponent, data: any) {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.main;
    _.option = NavTypes.profile;
    _.type = DOMTypes.sidenav;
    _.action = ActionType.toggel;
    self.DOM.processEvent(_);
  }

  clickHome(self: HeaderComponent) {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.header;
    _.option = PopupTypes.home;
    _.type = DOMTypes.popup;
    _.action = ActionType.open;
    self.DOM.processEvent(_);
  }

  clickRegisterGroup(self: HeaderComponent, data: any) {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.overlay;
    _.option = OverlayTypes.registerGroup;
    _.action = ActionType.open;
    self.DOM.processEvent(_);
  }

  onSelect(event){
    console.log(event);
  }
}
