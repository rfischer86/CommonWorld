
interface T {
  level: number;
  target: string;
}

export class Logger {
  logbook: string[] = [];

  addLog(message: string, info = true): void {
    let log = '';
    if (info) {
      log += 'at ' + this.raiseInfo() + ': ';
    }
    log += message;
    this.logbook.push(log);
  }

  printLog(): void {
    this.logbook.map(log => {
      console.log(log);
    });
  }

  private nThInfo(input: T): T {
    if (input.level === 0) {
      const index = input.target.indexOf('(');
      input.target = input.target.slice(0, index);
      return input;
    } else {
      input.level -= 1;
      const index = input.target.indexOf('at ') + 3;
      input.target = input.target.slice(index);
      return this.nThInfo(input);
    }
  }

  private raiseInfo(): string {
    try {
      let lol: string[];
      lol.push('');
    } catch (error) {
      const errorObj = error as Error;
      const errorMethode = this.nThInfo({
        target: errorObj.stack,
        level: 3
      }).target;
      return errorMethode;
    }
  }
}
