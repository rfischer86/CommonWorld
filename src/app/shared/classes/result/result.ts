import { State, StateDict } from '../states/states';
import { Logger } from '../Logger/logger';

export class Result <T, D> {
  input: T;
  ouput: D;
  log: Logger = new Logger();
  success: State = new State();
  states: StateDict;
  constructor() {}
}
