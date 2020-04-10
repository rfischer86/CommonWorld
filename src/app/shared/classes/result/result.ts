import { State, StateDict } from '../states/states';
import { Logger } from '../Logger/logger';
import { DOMTypes } from '../../enums/DOMElement.enum';


export enum ActionType {
  add = 'add',
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
  transmit = 'transmit'
}

export class Result <T, D> {
  type: DOMTypes;
  fromType: DOMTypes;
  action: ActionType;
  fromId: string;
  option: string;
  toId: string;
  input: T;
  output: D;
  log: Logger = new Logger();
  success: State = new State(true);
  states: StateDict;
  // constructor() {}
}
