import { Component, OnInit, Input } from '@angular/core';
import { Button } from '../../interfaces/button';
import { ButtonTypes, ButtonState } from '../../enums/button.enum';
import { States } from '../../classes/states/states';
import { HtmlState } from '../../enums/htmlStates';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  buttonTypes = ButtonTypes;
  htmlStates = HtmlState;
  buttonStates = ButtonState;
  states = new States();
  @Input() set setButtons(buttonList: Button[] ) {
    this.buttonList = buttonList;
    this.states.finishInit.setTrue();
  }
  buttonList: Button[] = [];
  @Input() state = 0;

  constructor() { }

  ngOnInit() {
  }

  doClick(event, index) {
    const button = this.buttonList[index];
    button.action(button.self, button.data)
    if(button.nextButton!==null && button.nextButton<this.buttonList.length) {
      this.state = button.nextButton;
    }
  }
}

