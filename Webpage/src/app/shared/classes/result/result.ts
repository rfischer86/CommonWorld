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
  transmit = 'transmit',
  submit = 'submit',
  change = 'change'
}

export class Result <T, D> {
  type: DOMTypes;
  index: number;
  nextActionType: ActionType;
  action: ActionType;
  fromType: DOMTypes;
  fromId: string;
  toId: string;
  fromApiId: string;
  toApiId: string;
  option: string;
  option2: string;
  valid: boolean;
  input: T;
  output: D;
  name: string;
  log: Logger = new Logger();
  success: State = new State(true);
  states: StateDict;
  // constructor() {}
}
