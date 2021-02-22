



export class State {
  value: boolean;
  count: number;

  constructor(value: boolean = false) {
    this.value = value;
    this.count = 0;
  }
  setTrue(): void     { this.value = true; }
  isTrue(): boolean   { return this.value; }
  setFalse(): void    { this.value = false; }
  isFalse(): boolean  { return !this.value; }
  toggleState(): void { this.value = this.value ? false : true; }
  setCountDown(count: number): void { this.count = count }

  decreaseCount(): void { this.count -= 1 }
  increaseCount(): void { this.count += 1 }
  isCountEqualTo(value: number = 0):boolean {return this.count === value}
  isCountSmallerThan(value: number = 0): boolean {return this.count < value}
  isCountGreaterThan(value: number = 0): boolean {return this.count > value}
}

export class States {
  createMode = new State();
  defined = new State();
  editMode = new State();
  loading = new State();
  collectData = new State();
  expanded = new State();
  open = new State();
  finishInit = new State();
  visible = new State();
  valid = new State();
  loggedIn = new State();
  submit = new State();
  dict = {} as {[key: string]: State}
  list = [] as State[];

  toStateDict(): StateDict {
    const stateDict = {} as StateDict;
    stateDict.createMode = this.createMode.value;
    stateDict.defined = this.defined.value;
    stateDict.editModt = this.expanded.value;
    stateDict.loading = this.loading.value;
    stateDict.expanded = this.expanded.value;
    stateDict.open = this.open.value;
    stateDict.finishInit = this.finishInit.value;
    return stateDict;
  }

  addStateToDict(key: string, state: State = null) {
    if (state)  {
       return this.dict[key] = state;
    } else {
      this.dict[key] = new State();
    }
  }
}


export interface StateDict {
  defined?: boolean;
  createMode?: boolean;
  editModt?: boolean;
  loading?: boolean;
  expanded?: boolean;
  open?: boolean;
  finishInit?: boolean;
}


