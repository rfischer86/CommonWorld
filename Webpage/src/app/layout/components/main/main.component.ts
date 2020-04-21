import { Component, OnInit } from '@angular/core';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { DOMService, DOMElement } from 'src/app/shared/services/DOM/dom-element.service';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { States, State } from 'src/app/shared/classes/states/states';
import { NavTypes } from 'src/app/shared/enums/navTypes';

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

  result = new Result();
  logger = new Logger();
  DOMself: DOMElement;
  states = new States();
  profieNavState = new State();
  menueNavState = new State();
  NavTypes = NavTypes;
  navState = NavState.body;

  constructor(
    private DOM: DOMService
  ) {
    const _ = this.DOM.create(DOMTypes.main, null, DOMTypes.main);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
      this.logger.printLog();
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
    }
  }

  ngOnInit() {
    this.result.log.printLog();
    this.states.finishInit.setTrue();
    this.initProfileNav();
    this.initMenuNav();
  }

  initProfileNav() {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.sidenav + NavTypes.profile;
    _.input = 'profile';
    _.toApiId = '11111111111121';
    _.action = ActionType.load;
    this.DOM.addEventToQueue(_, 1000);
  }

  initMenuNav() {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.sidenav + NavTypes.menu;
    _.input = 'menu';
    _.toApiId = '1222222222222225';
    _.action = ActionType.load;
    this.DOM.addEventToQueue(_, 1000);
  }



  processDOMEvent(event:  Result<any, any>) {
    if (!event) return;
    if (event.type === DOMTypes.sidenav) {
      this.toggleNav(event);
    }
  }

  toggleNav(event: Result<any, any>){
    let state: State;

    if (event.option === NavTypes.menu) {
      state = this.menueNavState;
    }
    if (event.option === NavTypes.profile) {
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

}
