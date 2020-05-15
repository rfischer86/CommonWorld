import { Component, OnInit, Input, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { SearchSelection, SearchServices } from './search-field.interface';
import { GroupService } from '../../services/REST/group.service';
import { UserService } from '../../services/User/user.service';
import { RoleService } from '../../services/REST/role.service';
import { Result, ActionType } from '../../classes/result/result';
import { DOMTypes } from '../../enums/DOMElement.enum';
import { DOMService } from '../../services/DOM/dom-element.service';
import { Group } from '../../interfaces/group.interface';
import { PopupAction } from '../../interfaces/PopupAction.interface';
import { NavTypes } from '../../enums/navTypes';
import { Search } from '../../interfaces/search.interface';
import { PopupTypes } from '../../enums/popupTypes';


enum FormFields {
  searchString = 'searchString'
}

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent implements OnInit {

  @ViewChild('searchField', {static: false}) searchField;
  @Input() label: string;
  @Input() isLast: boolean;
  @Input() isEditMode: boolean;

  @Input() searchServices: SearchServices;
  @Input() value = '';
  @Input() selectedList: SearchSelection[];

  @ViewChild(MatMenuTrigger, {static: true}) trigger: MatMenuTrigger;
  @Output() selectedElement = new EventEmitter<SearchSelection>();
  @Output() deleteElement = new EventEmitter();

  elementList: {id: string, name: string}[] = [];
  isLoading = false;
  isLoaded = false;
  form: FormGroup;
  isOpen = false;
  isSelected = false;
  noResult = false;
  searchString = '';

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private roleService: RoleService,
    private userService: UserService,
    private DOM: DOMService,
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({searchString: this.value});
    this.isLoaded = true;
  }

  setElement(event) {
    if (!this.noResult) {
      this.form.controls[FormFields.searchString].setValue(event.name);
      this.selectedElement.emit(event);
      this.value = event.name;
      this.isSelected = true;
    }
  }

  isElementAllreadySelected(element): boolean {
    if (!!this.selectedList.find(x => x.id === element.id)) {
      return true;
    } else {
      return false;
    }
  }

  updateElementList(event) {
    this.searchString = this.form.controls[FormFields.searchString].value;
    const searchData = {} as Search;

    searchData.searchString = this.searchString ? this.searchString : '';
    const nextElementList = [];
    let subscriptionService;
    switch (true) {
      case this.searchServices === SearchServices.user:
        subscriptionService = this.userService.search(searchData);
        break;
      case this.searchServices === SearchServices.group:
        subscriptionService = this.groupService.search(searchData);
        break;
      case this.searchServices === SearchServices.role:
        subscriptionService = this.roleService.search(searchData);
        break;
      }
      subscriptionService.subscribe(
        data => this.transmitDataToPopup(data.result),
        error => console.error(error)
      )
  }

  controlSelection() {
    setTimeout(() => {
      if (!this.isSelected && this.searchString !== this.value) {
        this.form.controls[FormFields.searchString].setValue('');
        this.selectedElement.emit({} as SearchSelection);
        this.isSelected = false;
      }
    }, 500);
  }

  transmitDataToPopup(data: Group[]) {
    data.map(group => {
      const action = {} as PopupAction<SearchFieldComponent>;
      action.do = this.clickSearchesElement;
      action.self = this;
      action.name = group.name;
      action.apiId = group.apiId;
    })
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.header;
    _.input = data;
    _.type = DOMTypes.popup;
    _.option = PopupTypes.search;
    _.fromType = DOMTypes.searchField;
    _.action = ActionType.open;
    this.DOM.processEvent(_);
  }

  clickSearchesElement(popupAction: PopupAction<SearchFieldComponent>) {
    const _ = new  Result<any, any>();
    _.toId = DOMTypes.groupSelector;
    _.toApiId = popupAction.apiId;
    _.type = DOMTypes.searchField;
    _.action = ActionType.load;
    popupAction.self.DOM.processEvent(_);
  }
}
