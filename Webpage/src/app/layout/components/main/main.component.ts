import { Component, OnInit } from '@angular/core';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { DOMService, DOMElement } from 'src/app/shared/services/DOM/dom-element.service';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { States, State } from 'src/app/shared/classes/states/states';
import { NavTypes } from 'src/app/shared/enums/navTypes';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { User } from 'src/app/shared/interfaces/user.interface';
import { UserService } from 'src/app/shared/services/User/user.service';
import { Text } from 'src/assets/i18n/app.text';

enum NavState{
  body = 'body',
  navBody = 'navBody',
  bodyNav = 'bodyNav',
  navBodyNav = 'navBodyNav'
}



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  Text = new Text();
  result = new Result();
  logger = new Logger();
  DOMself: DOMElement;
  states = new States();
  profieNavState = new State();
  menueNavState = new State();
  NavTypes = NavTypes;
  navState = NavState.body;
  overlayEvent: Result<any,any>;
  user = { } as User;
  constructor(
    private DOM: DOMService,
    private userService: UserService
    ) {
    const _ = this.DOM.create(DOMTypes.main, null, DOMTypes.main);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
      this.logger.printLog();
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
    }
    this.userService.getUserSubscribtion().subscribe(
      user =>  {
        this.user = user;
        if(this.user.apiId){
          this.initProfileNav(this.user.apiId);
        }
      },
      error => console.error(error)
    );
  }

  ngOnInit() {
    this.result.log.printLog();
    this.states.finishInit.setTrue();
    this.initMenuNav();
  }

  initProfileNav(userApiId: string) {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.sidenav + NavTypes.profile;
    _.input = NavTypes.profile;
    _.name = NavTypes.profile;
    _.toApiId = userApiId;
    _.action = ActionType.load;
    this.DOM.processEvent(_);
  }

  initMenuNav() {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.sidenav + NavTypes.menu;
    _.input = NavTypes.menu;
    _.name = NavTypes.menu;
    _.toApiId = '1222222222222225';
    _.action = ActionType.load;
    this.DOM.addEventToQueue(_, 1000);
  }



  processDOMEvent(event:  Result<any, any>) {
    if (!event) return;
    if (event.type === DOMTypes.sidenav) {
      this.toggleNav(event);
    }
    if (event.type === DOMTypes.overlay) {
      this.openOverlay(event);
    }

  }

  toggleNav(event: Result<any, any>){
    let state: State;

    if (event.option === NavTypes.menu) {
      state = this.menueNavState;
    }
    if (event.option === NavTypes.profile) {
      if (!this.userService.isLoggedin() ) {
        this.openLoginDialog();
        return;
      }
      state = this.profieNavState;
    }
    if (!state) return;
    switch(event.action) {
      case (ActionType.toggel):
        state.toggleState();
        break;
      case (ActionType.close):
        state.setFalse()
        break;
      case (ActionType.open):
        state.setTrue()
        break;
    }
    switch (true) {
      case (this.menueNavState.value && this.profieNavState.value):
        this.navState = NavState.navBodyNav;
        break;
      case (!this.menueNavState.value && !this.profieNavState.value):
        this.navState = NavState.body;
        break;
      case (this.menueNavState.value && !this.profieNavState.value):
        this.navState = NavState.navBody;
        break;
      case (!this.menueNavState.value && this.profieNavState.value):
        this.navState = NavState.bodyNav;
        break;

    }
  }

  openOverlay(event) {
    if(event.type === ActionType.open) {
      this.overlayEvent = event;
    }
    if(event.type === ActionType.open) {
      this.overlayEvent = null;
    }

  }

  openLoginDialog() {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.overlay;
    _.fromType = DOMTypes.main;
    _.fromId = this.DOMself.id;
    _.action = ActionType.load;
    _.option = OverlayTypes.login;
    this.DOM.processEvent(_);
  }


}
