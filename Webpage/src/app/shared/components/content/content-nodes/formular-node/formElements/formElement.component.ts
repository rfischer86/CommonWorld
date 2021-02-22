import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { DOMElement, DOMService } from 'src/app/shared/services/DOM/dom-element.service';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { FormElement } from 'src/app/shared/interfaces/form.interface';
import { Text } from '../../../../../../../assets/i18n/app.text';
import { FormTypes } from 'src/app/shared/enums/FormElement.enum';
import { Helper } from 'src/app/shared/services/Helper/helper.service';

@Component({
  selector: 'app-form-element',
  templateUrl: './formElement.component.html',
  styleUrls: ['./formElement.component.scss']
})
export class FormElementComponent implements OnInit, OnDestroy {

  @Input() parentId;
  @Input() parentApiId;
  @Input() notEditable: boolean;
  @Input() set setFormElementData(data: FormElement ) {
    this.formElementData = data;
    if (typeof this.formElementData?.formType === 'number' ) {
      this.formElementData.formType = this.helper.numberToFormType(this.formElementData.formType);
    };
  }
  formType: FormTypes;
  formTypes = FormTypes;
  formElementData = {} as FormElement;
  text = new Text();
  DOMid: string;
  logger = new Logger();
  DOMself: DOMElement;
  constructor(
    private DOM: DOMService,
    private helper: Helper
  ) { }

  ngOnInit() {
    const _ = this.DOM.create(DOMTypes.formularNode, this.parentId);
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
    console.log('formelement event', event)
    switch (event.fromType) {
      case DOMTypes.formElement:
        switch (event.action){
          case ActionType.update:
            this.parseUpdateFormEvent(event);
        }
    }
  }

  parseUpdateFormEvent(event: Result<any, any>) {
    event.toId = this.parentId;
    if (!this.parentId) {
      this.DOM.addEventToQueue(event, 500);
    } else {
      this.DOM.processEvent(event);
    }
  }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMself.id;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }

}
