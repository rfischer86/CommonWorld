// import { Result } from '../result/result';
// import { BlockTypes } from '../../enums/BlockTypes';
// import { Text } from 'src/assets/i18n/app.text';

// export class AccordionData<T> {
//   DOMid: string;
//   APIid: string;
//   text = new Text();
//   name: string;
//   accordionData: T;
//   subAccordion = [] as AccordionData<any>[];
//   blockType: BlockTypes;

//   constructor(data: AccordionData<T> = {} as AccordionData<T>) {
//     this.name =  data.name;
//     this.accordionData =  data.accordionData;
//     if (!this.name) { this.name = this.text.sidenav.newElement; }
//     this.subAccordion =  data.subAccordion;
//     if (!this.subAccordion) { this.subAccordion = []; }
//     this.blockType =  data.blockType;
//     if(!this.APIid) { this.APIid = Math.floor(Math.random() * 10 ** 16).toString();  }
//     this.DOMid = (Math.floor(Math.random() * 10 ** 10)).toString();
//   }

//   addItem(data: AccordionData<any> = {} as AccordionData<any>, index: number=-1){
//     if(index === -1 || index >= this.subAccordion.length ){
//       this.subAccordion.push(data);
//     } else {
//       this.subAccordion.splice(index, 0, data);
//     }
//   }

//   deleteItem(index: number=-1){
//     if(index === -1 || index >= this.subAccordion.length ){
//       this.subAccordion.splice(this.subAccordion.length -1 , 1);
//     } else {
//       this.subAccordion.splice(index, 1);
//     }
//   }

//   switchBlockType(blockType: BlockTypes) {
//     this.blockType = blockType
//   }

//   reName(name: string) {
//     this.name = name;
//   }

// }
