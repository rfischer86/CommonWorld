import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DOMService, DOMElement } from '../../services/DOM/dom-element.service';
import { Result, ActionType } from '../../classes/result/result';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Logger } from '../../classes/Logger/logger';
import { LinkClass, Link, LinkType } from '../../interfaces/link.interface';
import { Text } from '../../../../assets/i18n/app.text';
import { GroupSelector } from '../../interfaces/group.interface';
import { NavTypes } from '../../enums/navTypes';

@Component({
  selector: 'app-group-selector',
  templateUrl: './group-selector.component.html',
  styleUrls: ['./group-selector.component.scss']
})
export class GroupSelectorComponent implements OnInit, OnDestroy {
  @Input()  parentId;

  text = new Text();
  DOMid: string;
  logger = new Logger();
  groupLinks = [] as GroupSelector[];
  DOMself: DOMElement;
  selectedApiId: string;
  constructor(
    private DOM: DOMService,

  ) {
    this.createGroupLinks();
   }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.groupSelector, this.parentId, DOMTypes.groupSelector);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMid = this.DOMself.id;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event));
    }
  }

  processDOMEvent(event: Result<any, any>) {
    if (!event) {return}
    if (event.action === ActionType.load) {
      this.loadSidenav(event);
    }
    if (event.action === ActionType.add) {

      const group = {} as GroupSelector;
      group.name = event.name;
      group.apiId = event.toApiId;
      group.linkType = LinkType.body;
      group.class = LinkClass.classic;
      // group.icon = 'perm_data_setting';
      this.groupLinks.push(group);
      this.loadSidenav(event);
    }
  }

  loadSidenav(event: Result<any, any>) {
    this.selectedApiId = event.toApiId;
    const _ = new Result<any, any>();
    _.fromType = DOMTypes.groupSelector;
    _.fromId = this.DOMid;
    _.toId = DOMTypes.sidenav + NavTypes.menu;
    _.action = ActionType.load;
    _.option = NavTypes.menu;
    _.toApiId = event.toApiId;
    this.DOM.processEvent(_);

    const _2 = new Result<any, any>();
    _2.fromType = DOMTypes.groupSelector;
    _2.fromId = this.DOMid;
    _2.toId = DOMTypes.groupSidenav;
    _2.name = event.name;
    _2.option = NavTypes.menu;
    _2.action = ActionType.load;
    _2.toApiId = DOMTypes.groupSelector + event.toApiId;
    this.DOM.processEvent(_2);
  }

  clickLink(link: GroupSelector) {
    if (this.selectedApiId===link.apiId) { return}
    const _ = new Result<any, any>();
    _.toApiId = link.apiId;
    _.name = link.name;
    this.loadSidenav(_);
  }

  closeSelector(link: GroupSelector) {
    this.groupLinks = this.groupLinks.filter((el, index) => {
      if (el.apiId === link.apiId) {
        if (this.selectedApiId === link.apiId) {
          const _ = new Result<any, any>();
          if (index === 0) {
            try {
              _.toApiId = this.groupLinks[1].apiId;
            } catch {}
          } else {
            try {
              _.toApiId = this.groupLinks[index -1].apiId;
            } catch {}
          }
          if (_.toApiId) {
            this.loadSidenav(_);
          }
        }
        return false;
      }
      return true;
    })
  }

  createGroupLinks() {
    const LINKE = {} as GroupSelector;
    const PLQ = {} as GroupSelector;
    const Postulat = {} as GroupSelector;
    LINKE.name = 'LINKE';
    LINKE.apiId = 'LINKE';
    LINKE.linkType = LinkType.body;
    LINKE.class = LinkClass.classic;
    LINKE.icon = 'perm_data_setting';
    PLQ.name = 'PLQ';
    PLQ.linkType = LinkType.body;
    PLQ.class = LinkClass.classic;
    PLQ.icon = 'pan_tool';
    PLQ.apiId = 'plq';
    Postulat.name = 'Postulat';
    Postulat.icon = 'pets';
    Postulat.linkType = LinkType.body;
    Postulat.apiId = 'Postulat';
    Postulat.class = LinkClass.classic;
    this.groupLinks.push(LINKE);
    this.groupLinks.push(PLQ);
    this.groupLinks.push(Postulat);
  }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMself.id;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }

}
