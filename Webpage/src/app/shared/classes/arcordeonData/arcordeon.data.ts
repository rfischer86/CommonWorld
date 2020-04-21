import { Result } from '../result/result';
import { NavTypes } from '../../enums/navTypes';
import { BlockTypes } from '../../enums/BlockTypes';

export class ArcordeonData {
  DOMid: string;
  APIid: string;
  name: string;
  arcordeonData = [] as ArcordeonData[];
  blockType: BlockTypes;

  constructor(data: ArcordeonData = {} as ArcordeonData) {
    this.name =  data.name;
    if (!this.name) { this.name = 'Neus Arcordeon Element'; }
    this.arcordeonData =  data.arcordeonData;
    if (!this.arcordeonData) { this.arcordeonData = []; }
    this.blockType =  data.blockType;
    if(!this.APIid) { this.APIid = Math.floor(Math.random() * 10 ** 16).toString();  }
    this.DOMid = (Math.floor(Math.random() * 10 ** 10)).toString();
  }

  addItem(data: ArcordeonData = {} as ArcordeonData, index: number=-1){
    if(index === -1 || index >= this.arcordeonData.length ){
      this.arcordeonData.push(data);
    } else {
      this.arcordeonData.splice(index, 0, data);
    }
  }

  deleteItem(index: number=-1){
    if(index === -1 || index >= this.arcordeonData.length ){
      this.arcordeonData.splice(this.arcordeonData.length -1 , 1);
    } else {
      this.arcordeonData.splice(index, 1);
    }
  }

  switchBlockType(blockType: BlockTypes) {
    this.blockType = blockType
  }

  reName(name: string) {
    this.name = name;
  }

}
