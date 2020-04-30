import { Component, OnInit, ViewChild, ElementRef, OnDestroy, Input, HostListener } from '@angular/core';
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
import { KEY } from 'src/app/shared/enums/keyCodes.ts';
import { GroupService } from 'src/app/shared/services/REST/group.service';
import { Group } from 'src/app/shared/interfaces/group.interface';
import { GroupUserLinkService } from 'src/app/shared/services/REST/groupUserLink.service';
import { RolesType } from 'src/app/shared/interfaces/role.interface';

enum DialogButtons{
  register = 'register'
}

@Component({
  selector: 'app-register-group-dialog',
  templateUrl: './register-group.html',
  styleUrls: ['./register-group.scss']
})
export class RegisterGroupDialogComponent implements OnInit, OnDestroy{
  @Input() parentId: string ;
  text = new Text();
  form: FormGroup;
  logger = new Logger();
  DOMself: DOMElement;
  overlayEvent: Result<any,any>;
  states = new States();
  buttonList = [] as  Button[][];
  note = {} as Note;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private groupService: GroupService,
    private groupUserLinkService: GroupUserLinkService,
    private DOM: DOMService
    ) {
    const _ = this.DOM.create(DOMTypes.overlay, DOMTypes.dialog, OverlayTypes.registerGroup);
    if (_.success.isFalse()) {
      this.logger.appEndLogBook(_.log);
    } else {
      this.DOMself = _.output;
      this.DOMself.self.subscribe((event: Result<any, any>) => this.processDOMEvent(event))
    }
    this.states.finishInit.isTrue();
  }

  ngOnInit() {
    this.createButtons();
    this.createForm();
    this.states.finishInit.setTrue();
  }

  processDOMEvent(event:  Result<any, any>) {
    if (!event) return;
    if (event.action === ActionType.close) {
      const _ = new  Result<any, any>();
      _.toId = DOMTypes.main;
      _.fromType = DOMTypes.dialog;
      _.action = ActionType.close;
      this.DOM.processEvent(_);
    }

    if (event.action === ActionType.request && event.option === DialogButtons.register) {
       this.groupService.post(event.input as Group).subscribe(
        data => {
          console.log(data);
          this.note.success = this.text.successMsg.register
          // this.groupUserLinkService.post(data.result, this.userService.getUser(), RolesType.admin);
          setTimeout(() => this.close(), 2000);
        },
        error => {
          console.log(error);
          this.note.error = this.text.errorMsg.register
          setTimeout(() => this.note.error = null, 2000)
        }
      );
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
     name: [null, Validators.required],
    });
    this.states.valid.value = !this.form.invalid;
    this.form.statusChanges.subscribe(() => {
      if (this.states.valid.value !== this.form.invalid) {;
        this.states.valid.toggleState();
        this.controlButtonsStates(DialogButtons.register, this.states.valid.value)
        this.note.error = null
      }
    });
  }

  controlButtonsStates(buttonName: DialogButtons, disabled: boolean) {
    this.buttonList.map(buttonList => {
      buttonList.map(button => {
        if (button.name === buttonName) {
          button.buttonState = disabled ? ButtonState.disabled : ButtonState.active;
        }
      })
    });
  }

  createButtons() {
    this.buttonList.push(this.createRegisterButton());
  };

  createRegisterButton(): Button[] {
    const registerButton = {} as Button;
    registerButton.name = DialogButtons.register;
    registerButton.action = this.clickRegister;
    registerButton.icon = 'person_add';
    registerButton.text = this.text.general.register;
    registerButton.index = 0;
    registerButton.self = this;
    registerButton.htmlState = HtmlState.primary;
    registerButton.size = '1em';
    registerButton.nextButton = 1;
    registerButton.type = ButtonTypes.normal;
    return [registerButton];
  }

  clickRegister(self: RegisterGroupDialogComponent ) {
    const _ = new  Result<any, any>();
    const data = {} as Authenticate;
    data.name = self.form.get('name').value;
    _.input = data;
    _.toId =  OverlayTypes.registerGroup;
    _.fromType = DOMTypes.overlay;
    _.action = ActionType.request;
    _.option = DialogButtons.register;
    self.DOM.processEvent(_);
  }

  onSubmit() {
    this.clickRegister(this);
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

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    console.log(event.key);
    if (event.key === KEY.ENTER) {
      this.onSubmit()
    }

  }
}
