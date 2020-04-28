import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input } from '@angular/core';
import { Result, ActionType } from 'src/app/shared/classes/result/result';
import { DOMService, DOMElement } from 'src/app/shared/services/DOM/dom-element.service';
import { Logger } from 'src/app/shared/classes/Logger/logger';
import { DOMTypes } from 'src/app/shared/enums/DOMElement.enum';
import { States, State } from 'src/app/shared/classes/states/states';
import { Button } from 'src/app/shared/interfaces/button';
import { ButtonTypes, ButtonState } from 'src/app/shared/enums/button.enum';
import { HtmlState } from 'src/app/shared/enums/htmlStates';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Note } from 'src/app/shared/components/note/note.interface';
import { OverlayTypes } from 'src/app/shared/enums/overlayTypes';
import { Text } from 'src/assets/i18n/app.text';
import { AuthService } from 'src/app/shared/services/REST/auth.service';
import { Authenticate } from 'src/app/shared/interfaces/auth.interface';
import { UserService } from 'src/app/shared/services/User/user.service';

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
export class LoginDialogComponent implements OnInit, OnDestroy{
  @Input() parentId: string ;
  @ViewChild('password') password: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('name') name: ElementRef;
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
  checkboxes = new State(true);
  agb = new State();
  datapolicy = new State();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private DOM: DOMService
  ) {
    this.createForm();
    const _ = this.DOM.create(DOMTypes.overlay, DOMTypes.dialog, OverlayTypes.login);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
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

    if (event.action === ActionType.request && event.option === 'register') {
       this.userService.post(event.input as Authenticate).subscribe(
        data => {
          this.note.success = this.text.successMsg.register
          this.userService.setUser(data.result);
          setTimeout(() => this.close(), 2000);
        },
        error => {
          this.note.error = this.text.errorMsg.register
          setTimeout(() => this.note.error = null, 2000)
        }
      );
    }

    if (event.action === ActionType.request && event.option === 'login') {
      this.authService.auth(event.input as Authenticate).subscribe(
        data => {
          this.userService.setUser(data.result);
          this.note.success = this.text.successMsg.login
          setTimeout(() => this.close(), 2000)

        },
        error => {
          this.note.error = this.text.errorMsg.login;
          setTimeout(() => this.note.error = null, 2000)
        }
      );
    }


    if (event.action === ActionType.toggel) {
      this.checkboxes.setFalse()
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
    registerButton.nextButton = 1;
    registerButton.type = ButtonTypes.normal;


    const registerButton2 = {} as Button;
    registerButton2.action = this.clickRegister;
    registerButton2.icon = 'person_add';
    registerButton2.text = this.text.general.register;
    registerButton2.index = 1;
    registerButton2.self = this;
    registerButton2.htmlState = HtmlState.primary;
    registerButton2.size = '1em';
    registerButton2.nextButton = 1;
    registerButton2.type = ButtonTypes.normal;
    return [registerButton, registerButton2];
  }

  clickLogin(self: LoginDialogComponent) {
    const data = {} as Authenticate;
    data.email = self.email.nativeElement.value;
    data.password = self.password.nativeElement.value;
    const _ = new  Result<any, any>();
    _.toId =  OverlayTypes.login;
    _.fromType = DOMTypes.overlay;
    _.input = data;
    _.option = 'login';
    _.action = ActionType.request;
    self.DOM.processEvent(_);
  }

  clickCancel() {

  }

  clickRegister(self: LoginDialogComponent ) {
    const _ = new  Result<any, any>();
    if(self.checkboxes.isTrue()) {
      _.toId =  OverlayTypes.login;
      _.fromType = DOMTypes.overlay;
      _.action = ActionType.toggel;
    } else {
      const data = {} as Authenticate;
      data.email = self.email.nativeElement.value;
      data.password = self.password.nativeElement.value;
      data.name = self.name.nativeElement.value;
      data.agb = self.agb.value;
      data.datapolicy = self.datapolicy.value;
      _.input = data;
      _.toId =  OverlayTypes.login;
      _.fromType = DOMTypes.overlay;
      _.action = ActionType.request;
      _.option = 'register';

    }
    self.DOM.processEvent(_);

  }


  toggleVisibility () {
    this.states.visible.toggleState();
    if (this.states.visible.isTrue()) {
      this.password.nativeElement.type = 'text';
    } else {
      this.password.nativeElement.type = 'password';
    }
  }

  onSubmit() {

  }

  close() {
    const _ = new  Result<any, any>();
    _.toId =  this.parentId;
    _.fromId =  this.DOMself.id;
    _.fromType = DOMTypes.dialog;
    _.action = ActionType.close;
    this.DOM.processEvent(_);
  }

  ngOnDestroy(){
    const _ = new  Result<any, any>();
    _.toId = this.DOMself.id;
    _.action = ActionType.destroy;
    this.DOM.processEvent(_);
  }
}
