import { Component, OnInit, Input } from '@angular/core';
import { DOMService, DOMElement } from '../../services/DOM/dom-element.service';
import { Button } from '../../interfaces/button';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Logger } from '../../classes/Logger/logger';
import { ButtonTypes, ButtonState } from '../../enums/button.enum';
import { Result, ActionType } from '../../classes/result/result';
import { HtmlState } from '../../enums/htmlStates';
import { NavTypes } from '../../enums/navTypes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() parentId;

  menueButtonList = [] as Button[];
  actiomButtonList = [] as Button[];
  DOMself: DOMElement;
  logger = new Logger();
  constructor(
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
    }
    this.createButtons();
  }

  createButtons(): void {
    this.menueButtonList.push(this.createMenueButton())
    this.actiomButtonList.push(this.createProfileButton());
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
    // button.buttonState = ButtonState.disabled;
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
    button.buttonState = ButtonState.hidden;
    button.htmlState = HtmlState.primary;
    button.nextButton = 0;
    button.size = '2em';
    button.type = ButtonTypes.icon;
    return button;
  }

  clickMenue(self: any, data: any) {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.main;
    _.option = NavTypes.menu;
    _.type = DOMTypes.sidenav;
    _.action = ActionType.toggel;
    self.DOM.processEvent(_);
  }

  clickSearch(self: any, data: any) {
    const _ = new  Result<any, any>();
    // _.toId = DOMTypes.sidenav;
    // _.action = ActionType.toggel;
    // self.DOM.processEvent(_);
  }

  clickProfile(self: any, data: any) {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.main;
    _.option = NavTypes.profile;
    _.type = DOMTypes.sidenav;
    _.action = ActionType.toggel;
    self.DOM.processEvent(_);
  }


}
