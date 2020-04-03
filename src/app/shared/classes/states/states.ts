export class State {
  value = true;
  setTure(): void     { this.value = true; }
  isTure(): boolean   { return this.value; }
  setFalse(): void    { this.value = false; }
  isFalse(): boolean  { return !this.value; }
  toggleState(): void { this.value = this.value ? false : true; }
}

export class States {
  createMode = new State();
  editModt = new State();
  loading = new State();
  expanded = new State();

  toStateDict(): StateDict {
    const stateDict = {} as StateDict;
    stateDict.createMode = this.createMode.value;
    stateDict.editModt = this.expanded.value;
    stateDict.loading = this.loading.value;
    stateDict.expanded = this.expanded.value;
    return stateDict;
  }
}

export interface StateDict {
  createMode?: boolean;
  editModt?: boolean;
  loading?: boolean;
  expanded?: boolean;
}


