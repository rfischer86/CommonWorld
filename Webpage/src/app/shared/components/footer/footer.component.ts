import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DOMService, DOMElement } from '../../services/DOM/dom-element.service';
import { Result, ActionType } from '../../classes/result/result';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Logger } from '../../classes/Logger/logger';
import { LinkClass, Link, LinkType } from '../../interfaces/link.interface';
import { Text } from '../../../../assets/i18n/app.text';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  @Input()  parentId;

  text = new Text();
  DOMid: string;
  logger = new Logger();
  footerLinks = [] as Link[];
  DOMself: DOMElement;

  constructor(
    private DOM: DOMService,

  ) {
    this.createFooterLinks();
   }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.footer, this.parentId, DOMTypes.footer);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event));
      this.DOMid = this.DOMself.id;
    }
  }

  processDOMEvent(event) {

  }

  createFooterLinks() {
    const agbLink = {} as Link;
    const dataPolicyLink = {} as Link;
    agbLink.name = this.text.general.AGB;
    agbLink.linkType = LinkType.body;
    agbLink.class = LinkClass.classic;
    dataPolicyLink.name = this.text.general.dataPolicy;
    dataPolicyLink.linkType = LinkType.body;
    dataPolicyLink.class = LinkClass.classic;
    this.footerLinks.push(agbLink);
    this.footerLinks.push(dataPolicyLink);
  }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMself.id;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }

  clickLink(link: Link) {
    console.log('TODO implement action');
    console.log(link);
  }

}
