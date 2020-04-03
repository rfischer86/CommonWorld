import { Component, OnInit } from '@angular/core';
import { Result } from 'src/app/shared/classes/result/result';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  result = new Result();

  constructor(

  ) {
    this.result.log.addLog('Hallo Constructor');
  }

  ngOnInit() {
    this.result.log.addLog('Hallo Init');
    this.result.log.printLog();
  }
}
