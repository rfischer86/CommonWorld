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
import { SidenavItemService } from 'src/app/shared/services/REST/sidenavItem.service';
import { NavData } from 'src/app/shared/classes/navData/nav.data';
import { RestResponse } from 'src/app/shared/interfaces/rest.interface';

enum NavState{
  body = 'body',
  navBody = 'navBody',
  bodyNav = 'bodyNav',
  navBodyNav = 'navBodyNav'
}



@Component({
  selector: 'app-group-sidenav',
  templateUrl: './group.sidenav.component.html',
  styleUrls: ['./group.sidenav.component.scss']
})
export class GroupSidenavComponent {
  Text = new Text();
  result = new Result();
  logger = new Logger();
  DOMself: DOMElement;
  states = new States();
  profieNavState = new State();
  navData: NavData;
  constructor(
    private DOM: DOMService,
    private navItemService: SidenavItemService,
    ) {
    const _ = this.DOM.create(DOMTypes.main, null, DOMTypes.groupSidenav);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
      this.logger.printLog();
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
    }
  }

  processDOMEvent(event:  Result<any, any>) {
    if (!event) return;
    console.log(event);
    this.loadData(event);
  }

  loadData(event:  Result<any, any>) {
    switch(event.action) {
      case (ActionType.load):
        this.navItemService.get(event.toApiId).subscribe(
          (data: RestResponse<NavData>) => {
            this.navData = data.result;
            if(!this.navData.navData) {this.navData.navData = []};
            this.states.finishInit.setTrue();

          },
          error => {
            this.navData = new NavData();
            this.navData.apiId = event.toApiId;
            this.navData.type = NavTypes.menu;
            this.navData.name = event.name;
            this.states.finishInit.setTrue();
            this.navItemService.create(this.navData).subscribe(
              data2 => this.navData = data2.result,
              error2 => console.log(error2)
            )
          }
        )
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
