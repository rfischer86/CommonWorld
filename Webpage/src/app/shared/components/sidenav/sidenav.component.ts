import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { DOMService, DOMElement } from '../../services/DOM/dom-element.service';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Logger } from '../../classes/Logger/logger';
import { Result, ActionType } from '../../classes/result/result';
import { States } from '../../classes/states/states';
import { NavData } from '../../classes/navData/nav.data';
import { SidenavItemService } from '../../services/REST/sidenavItem.service';
import { RestResponse } from '../../interfaces/rest.interface';
import { User } from '../../interfaces/user.interface';
import { NavTypes } from '../../enums/navTypes';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild(TemplateRef) content: TemplateRef < any >;

  @Input() parentId: string;
  @Input() navType: NavTypes;
  DOMself: DOMElement;
  logger = new Logger();
  states = new States();
  navData: NavData;
  user = {} as User;
  constructor(
    private DOM: DOMService,
    private navItemService: SidenavItemService,
  ) {   }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.sidenav, this.parentId, DOMTypes.sidenav + this.navType);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
    }
  }

  processDOMEvent(event:  Result<any, any>) {
    if (!event) return;
    this.toggleOpenState(event);
    this.loadData(event);
  }

  toggleOpenState(event:  Result<any, any>) {
    switch(event.action) {
      case (ActionType.toggel):
        this.states.open.toggleState();
        break;
      case (ActionType.close):
        this.states.open.setFalse()
        break;
      case (ActionType.open):
        this.states.open.setTrue()
        break;
      }
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
            this.navData.type = event.name as NavTypes;
            this.states.finishInit.setTrue();
            this.navItemService.create(this.navData).subscribe(
              data2 => console.log(data2),
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
    _.option = data.type;
    _.action = ActionType.load;
    this.DOM.processEvent(_);
  }

}
