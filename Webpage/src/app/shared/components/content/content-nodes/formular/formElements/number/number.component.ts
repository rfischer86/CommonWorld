// import { Component, OnInit, Input, OnDestroy } from '@angular/core';
// import { Logger } from 'src/app/shared/classes/Logger/logger';
// import { DOMElement, DOMService } from 'src/app/shared/services/DOM/dom-element.service';
// import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
// import { Result, ActionType } from 'src/app/shared/classes/result/result';
// import { FormElement } from 'src/app/shared/interfaces/form.interface';
// import { Text } from '../../../../../../../assets/i18n/app.text';
// import { FormType } from 'src/app/shared/enums/FormElement.enum';

// @Component({
//   selector: 'app-form-element',
//   templateUrl: './formElement.component.html',
//   styleUrls: ['./formElement.component.scss']
// })
// export class FormularElementComponent implements OnInit, OnDestroy {

//   @Input() parentId;
//   @Input() parentApiId;
//   @Input() set setContentData(data : FormElement ){
//     this.contentData = data;
//   }
//   contentData:  FormElement;
//   text = new Text();
//   DOMid: string;
//   logger = new Logger();
//   DOMself: DOMElement;
//   constructor(
//     private DOM: DOMService,
//   ) { }

//   ngOnInit() {
//     const _ = this.DOM.create(DOMTypes.formularNodeNode, this.parentId);
//     if (_.success.isFalse()) {
//       this.logger.appEndLogBook(_.log);
//     } else {
//       this.DOMself = _.output;
//       this.DOMid = this.DOMself.id;
//       this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event));
//     }
//   }

//   processDOMEvent(event: Result<any, any>) {
//     if (!event) {return}
//     if (event.action === ActionType.load) {
//     }
//   }

//   ngOnDestroy(){
//     const _ = new  Result<any, any>();
//     _.toId = this.DOMself.id;
//     _.action = ActionType.destroy;
//     this.DOM.processEvent(_);
//   }

// }
