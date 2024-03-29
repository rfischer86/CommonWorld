import { Injectable } from '@angular/core';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { Result, ActionType } from '../../classes/result/result';
import { LogMessages } from '../../classes/Logger/logger';
import { BehaviorSubject, Subscription } from 'rxjs';


export class DOMElement {
  type: DOMTypes;
  id: string;
  name: string;
  parentId: string;
  children: {[key: string]: BehaviorSubject<Result<any, any>>} = {};
  self = new BehaviorSubject<Result<any, any>>(null);
  constructor(type: DOMTypes, id: string, parentId: string) {
    this.type = type;
    this.id = id;
    this.parentId = parentId;
  }

  isId(DOMid: string): boolean    { return this.id === DOMid; }

  setId(DOMid: string ): void     { this.id = DOMid; }

  setName(name: string ): void    { this.name = name; }

  isName(name: string ): boolean  { return this.name === name; }

  setType(type: DOMTypes): void   { this.type = type; }

  isType(type: DOMTypes): boolean { return this.type === type; }

  hasChild(id: string): boolean   { return Object.keys(this.children).indexOf(id) !== -1; }

  getInputSupscription<IN, OUT>(childId: string): Result<null, BehaviorSubject<Result<IN, OUT>>> {
    const _ =  new Result<null, BehaviorSubject<Result<IN, OUT>>>();
    if (this.hasChild(childId)) {
      _.log.addLog(new LogMessages().idExistIn('parent DOM element', childId));
      _.success.setFalse();
    } else {
      this.children[childId] = new BehaviorSubject<Result<IN, OUT>>(null);
    }
    _.output = this.children[childId];
    return _;
  }

  getOutputSupscription<IN, OUT>(): BehaviorSubject<Result<IN, OUT>> {
    return new BehaviorSubject<Result<IN, OUT>>(null);
  }

  removeChild(id: string): Result<any, any> {
    const _ = new Result<any, any>();
    _.action = ActionType.destroy;
    _.toId = id;
    _.fromId = this.id;
    if (!this.hasChild(id)) {
      _.log.addLog(new LogMessages().idNotExistIn('parent DOM element', id));
      _.success.setFalse();
    } else {
      this.self.next(_);
      delete this.children[id];
    }
    return _;
  }
}


@Injectable({
  providedIn: 'root'
})
export class DOMService {
  DOMElementList: {[key: string]: DOMElement} = {};
  DOMElementSubscriptions: {[key: string]: BehaviorSubject<Result<any, any>>};
  eventQueue: {event: Result<any, any>, timestamp: Date, latency: number}[] = [];
  constructor(
  ) { }

  getRrandomId(length: number = 10): string {
    return Math.floor(Math.random() * 10 ** length).toString();
  }

  getById(id: string ): Result<DOMElement, any> {
    const result = new Result<DOMElement, any>();
    result.output = this.DOMElementList[id];
    if (!result.output) {result.success.setFalse(); }
    return result;
  }

  add(element: DOMElement, parentDOMid: string = null ): void {
    this.DOMElementList[element.id] = element;
    const result = this.getById(parentDOMid);
    if (result.success.isTrue()) {
      result.output.children.addDOMElement(element);
    }
  }

  hasId(id): boolean {
    return Object.keys(this.DOMElementList).indexOf(id) !== -1;
  }

  create(type: DOMTypes, parentId: string = null, DOMid: string = null ): Result<any, DOMElement> {
    const _ = new Result<any, DOMElement>();
    if (!DOMid) {
      DOMid = this.getRrandomId();
    }
    if (!!DOMid && this.hasId(DOMid)) {
      _.success.setFalse();
      _.log.addLog(new LogMessages().idExistIn('DOM', DOMid));
      return _;
    }
    if (!parentId) {
      _.log.addLog(`DOM element with the id ${DOMid} has no parent.`);
    } else {
      if (!this.hasId(parentId)) {
        _.log.addLog(`DOM element with the id ${DOMid} has no parent.`);
        _.log.addLog(`Because the given id ${parentId} do not exist in DOM.`);
        parentId = null;
      }
    }
    const DOMelement = new DOMElement(type, DOMid, parentId);

    this.DOMElementList[DOMid] = DOMelement;
    this.DOMElementList[DOMid].getInputSupscription(DOMTypes.root).output.subscribe(
      e => this.processEvent(e)
    );
    _.output = DOMelement;
    this.checkQueue();
    return _;
  }

  addEventToQueue(event: Result<any, any>, latency: number ){
    this.eventQueue.push({event, timestamp: new Date(), latency})
  }

  checkQueue() {
    const now = new Date().getMilliseconds();
    this.eventQueue = this.eventQueue.filter((event) =>
      now < event.timestamp.getUTCMilliseconds() + event.latency
    )
    this.eventQueue.map(( event => {
      if ( this.hasId(event.event.toId) ) {
        this.processEvent(event.event);
        event.latency = 0;
      }
    }))
    this.eventQueue = this.eventQueue.filter((event) =>
      now < event.timestamp.getUTCMilliseconds() + event.latency
    )
  }

  processEvent(_: Result<any, any>): boolean {
    if (!_) { return; }
    if (!this.hasId(_.toId)) {
      _.log.addLog(`DOM has to stop this Event, because the id ${_.toId} do not exist`);
      _.log.addLog(JSON.stringify(_));
      _.log.printLog();
      return;
    }
    switch (true) {
      case (_.action === ActionType.destroy):
        this.delete(_.toId);
        break;
      case (_.action !== ActionType.destroy):
        this.DOMElementList[_.toId].self.next(_);
    }
  }

  delete(id: string): void {
    delete this.DOMElementList[id];
  }

}

