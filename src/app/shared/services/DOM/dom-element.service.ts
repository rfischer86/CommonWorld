import { Injectable } from '@angular/core';
import { HelperService } from '../Helper/helper.service';
import { DOMElements } from '../../enums/DOMElement.enum';
import { Result } from '../../classes/result/result';


@Injectable({
  providedIn: 'root'
})
export class DOMService {
  DOMElementList: {[key: string]: DOMElementService};

  getById(id: string ): Result<DOMElementService, any> {
    const result = new Result<DOMElementService, any>();
    result.ouput = this.DOMElementList[id];
    if (!result.ouput) {result.success.isFalse(); }
    return result;
  }

  addDOMElement(element: DOMElementService, parentDOMid: string = null ): void {
    this.DOMElementList[element.DOMid] = element;
    const result = this.getById(parentDOMid);
    if (result.success.isTure()) {
      result.ouput.children.addDOMElement(element);
    }
  }

  deleteDOMElement(element: DOMElementService): void {
    delete this.DOMElementList[element.DOMid];
  }

}


export class DOMElementService {
  type: DOMElements;
  DOMid: string;
  name: string;
  children = new DOMService();
  constructor(
    private helper: HelperService
  ) {
    this.DOMid = this.helper.getRrandomId();
  }

  isId(DOMid: string): boolean {
    return this.DOMid === DOMid;
  }

  setId(DOMid: string ): void {
    this.DOMid = DOMid;
  }

  setName(name: string ): void {
    this.name = name;
  }
  isName(name: string ): boolean {
    return this.name === name;
  }

}
