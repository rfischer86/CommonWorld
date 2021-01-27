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
  selector: 'app-user-sidenav',
  templateUrl: './user.sidenav.component.html',
  styleUrls: ['./user.sidenav.component.scss']
})
export class UserSidenavComponent implements OnInit {
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
    const _ = this.DOM.create(DOMTypes.main, null, DOMTypes.userSidenav);
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
      },
      error => console.error(error)
    );
  }

  ngOnInit() {
    this.result.log.printLog();
    this.states.finishInit.setTrue();
  }
  processDOMEvent(event:  Result<any, any>) {
    if (!event) return;
  }

}
