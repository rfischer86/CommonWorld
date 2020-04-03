import { State, StateDict } from '../states/states';
import { Logger } from '../Logger/logger';
import { DOMTypes } from '../../enums/DOMElement.enum';


export enum ActionType {
  save = 'save',
  create = 'create',
  destroy = 'destroy',
  update = 'update',
  trigger = 'trigger',
}

export class Result <T, D> {
  type: DOMTypes;
  action: ActionType;
  fromId: string;
  toId: string;
  input: T;
  output: D;
  log: Logger = new Logger();
  success: State = new State();
  states: StateDict;
  // constructor() {}
}
