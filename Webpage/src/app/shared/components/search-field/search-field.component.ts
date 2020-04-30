import { Component, OnInit, Input, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatMenuTrigger } from '@angular/material/menu';
import { SearchSelection, SearchServices } from './search-field.interface';
import { GroupService } from '../../services/REST/group.service';
import { UserService } from '../../services/User/user.service';
import { RoleService } from '../../services/REST/role.service';


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
    this.searchString = this.searchString ? this.searchString : '';
    const nextElementList = [];
    let subscription;
    switch (true) {
      case this.searchServices === SearchServices.user:
        subscription = this.userService.search(this.searchString);
        break;
      case this.searchServices === SearchServices.group:
        subscription = this.groupService.search(this.searchString);
        break;
      case this.searchServices === SearchServices.role:
        subscription = this.roleService.search(this.searchString);
        break;
    }
    subscription.subscribe(
      data => {
      data.map(el => {
        if (!this.isElementAllreadySelected(el)) {
          nextElementList.push({id: el.id, name: el.name});
          this.noResult = false;
        }
      });
      if (nextElementList.length === 0) {
        nextElementList.push({
          id: null, name: 'Kein Ergebnis'
        });
        this.noResult = true;
      }
      this.elementList = nextElementList;
      if (!this.isOpen) {
        this.isOpen = true;
      }
    });
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

  onDeleteClick() {
    this.deleteElement.emit();
  }

  @HostListener('document:click', ['$event'])
  public onClick(targetElement: Event) {
    targetElement.stopPropagation();
    targetElement.preventDefault();
    const clickedInside = this.searchField.nativeElement.contains(targetElement.target);
  }
}
