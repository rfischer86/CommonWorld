import { State, StateDict } from '../states/states';
import { Logger } from '../Logger/logger';
import { DOMTypes } from '../../enums/DOMElement.enum';


export enum ActionType {
  add = 'add',
  request = 'request',
  save = 'save',
  edit = 'edit',
  create = 'create',
  destroy = 'destroy',
  delete = 'delete',
  update = 'update',
  trigger = 'trigger',
  toggel = 'toggel',
  close = 'close',
  open = 'open',
  load = 'load',
  getOrLoad = 'getOrLoad',
  transmit = 'transmit'
}

export class Result <T, D> {
  type: DOMTypes;
  index: number;
  fromType: DOMTypes;
  action: ActionType;
  fromId: string;
  toId: string;
  fromApiId: string;
  toApiId: string;
  option: string;
  input: T;
  output: D;
  log: Logger = new Logger();
  success: State = new State(true);
  states: StateDict;
  // constructor() {}
}
