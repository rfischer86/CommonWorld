import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { DOMService, DOMElement } from 'src/app/shared/services/DOM/dom-element.service';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { States } from 'src/app/shared/classes/states/states';
import { Button } from 'src/app/shared/interfaces/button';
import { ButtonTypes, ButtonState } from 'src/app/shared/enums/button.enum';
import { HtmlState } from 'src/app/shared/enums/htmlStates';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Note } from 'src/app/shared/components/note/note.interface';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { Text } from 'src/assets/i18n/app.text';

enum NavState{
  body = 'body',
  navBody = 'navBody',
  bodyNav = 'bodyNav',
  navBodyNav = 'navBodyNav'
}

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginDialogComponent implements OnInit {

  @ViewChild('password') password: ElementRef;
  text = new Text();
  form: FormGroup;
  result = new Result();
  logger = new Logger();
  DOMself: DOMElement;
  overlayEvent: Result<any,any>;
  states = new States();
  data = {};
  buttonList = [] as  Button[][];
  note = {} as Note;
  constructor(
    private formBuilder: FormBuilder,
    private DOM: DOMService
  ) {
    this.createForm();
    const _ = this.DOM.create(DOMTypes.overlay, DOMTypes.dialog, OverlayTypes.login);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
      this.logger.printLog();
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
    }
    this.states.finishInit.isTrue();
  }

  ngOnInit() {
    this.result.log.printLog();
    this.createButtons();
    this.states.finishInit.setTrue();

  }

  processDOMEvent(event:  Result<any, any>) {
    if (!event) return;
    if (event.action === ActionType.close) {
      const _ = new  Result<any, any>();
      _.toId = DOMTypes.main;
      _.fromType = DOMTypes.dialog;
      _.output = this.data;
      _.action = ActionType.close;
      this.DOM.processEvent(_);
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
     email: [null, [ Validators.email, Validators.required]],
     password: [null, [ Validators.minLength(8), Validators.required ]]
    });
    this.states.valid.setFalse();
    this.form.statusChanges.subscribe(() => {
      if (this.states.valid.value !== this.form.invalid) {;
        this.states.valid.toggleState();
        this.buttonList.map(buttonList => {
          buttonList.map(button => {
            if (button.name==='login') {
              button.buttonState = this.form.invalid ? ButtonState.disabled : ButtonState.active;
              console.log(button.buttonState)
            }
          })
        });
        this.note.error = null
      }
    });
  }


  createButtons() {
    this.buttonList.push(this.createLoginButton());
    this.buttonList.push(this.createRegisterButton());
  };

  createLoginButton(): Button[] {
    const loginButton = {} as Button;
    loginButton.name = 'login'
    loginButton.action = this.clickLogin;
    loginButton.icon = 'fingerprint';
    loginButton.buttonState = ButtonState.disabled
    loginButton.text = this.text.general.login;
    loginButton.index = 0;
    loginButton.self = this;
    loginButton.htmlState = HtmlState.primary;
    loginButton.size = '1em';
    loginButton.nextButton = 0;
    loginButton.type = ButtonTypes.normal;
    return [loginButton];
  }

  createRegisterButton(): Button[] {
    const registerButton = {} as Button;
    registerButton.action = this.clickRegister;
    registerButton.icon = 'person_add';
    registerButton.text = this.text.general.register;
    registerButton.index = 0;
    registerButton.self = this;
    registerButton.htmlState = HtmlState.primary;
    registerButton.size = '1em';
    registerButton.nextButton = 0;
    registerButton.type = ButtonTypes.normal;
    return [registerButton];
  }

  clickLogin() {

  }

  clickCancel() {

  }

  clickRegister() {

  }


  toggleVisibility () {
    this.states.visible.toggleState();
    if (this.states.visible.isTrue()) {
      this.password.nativeElement.type = 'text';
    } else {
      this.password.nativeElement.type = 'password';
    }
    console.log(this.password.nativeElement.type)
  }

  onSubmit() {

  }
}
