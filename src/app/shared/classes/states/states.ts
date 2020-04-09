



export class State {
  value: boolean;
  constructor(value: boolean = false) {
    this.value = value;
  }
  setTrue(): void     { this.value = true; }
  isTrue(): boolean   { return this.value; }
  setFalse(): void    { this.value = false; }
  isFalse(): boolean  { return !this.value; }
  toggleState(): void { this.value = this.value ? false : true; }
}

export class States {
  createMode = new State();
  editModt = new State();
  loading = new State();
  expanded = new State();
  open = new State();
  finishInit = new State();
  dict = {} as {[key: string]: State}
  list = [] as State[];

  toStateDict(): StateDict {
    const stateDict = {} as StateDict;
    stateDict.createMode = this.createMode.value;
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
  createMode?: boolean;
  editModt?: boolean;
  loading?: boolean;
  expanded?: boolean;
  open?: boolean;
  finishInit?: boolean;
}


