import { NgModule, InjectionToken } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ButtonComponent } from './components/button/button.component';
import { BodyComponent } from './components/body/body.component';
import { DOMService } from './services/DOM/dom-element.service';
import { AppComponent } from '../app.component';
import { SidenavItemComponent } from './components/sidenav/sidenavItem/sidenavItem.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidenavItemService } from './services/REST/sidenavItem.service';
import { OverlayComponent } from './components/overlay/overlay.component';
import { NoteComponent } from './components/note/note.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginDialogComponent } from './components/overlay/dialog/login/login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RegisterGroupDialogComponent } from './components/overlay/dialog/register-group/register-group';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { PopupComponent } from './components/popup/popup.component';
import { PopupHomeComponent } from './components/popup/popups/home/home.component';
import { GroupSelectorComponent } from './components/groupSelector/group-selector.component';
import { PopupSearchFieldComponent } from './components/popup/popups/searchField/searchField.component';
import { ContentComponent } from './components/content/content.component';
import { TextNodeComponent } from './components/content/content-nodes/text-node/text-node.component';
import { EditorComponent } from './components/content/content-nodes/text-node/editor/editor.component';
import { QuillModule, QUILL_CONFIG_TOKEN } from 'ngx-quill';
import { EditorService } from './components/content/content-nodes/text-node/editor/editor.service';
import { ContentTypeComponent } from './components/popup/popups/contentType/contentType.component';
import { FormularTextElementComponent } from './components/content/content-nodes/formular-node/formElements/text/text.component';
import { FormElementComponent } from './components/content/content-nodes/formular-node/formElements/formElement.component';
import { CashService } from './services/REST/cash.service';
import { TitleComponent } from './components/title/title.component';
import { FormularEnumElementComponent } from './components/content/content-nodes/formular-node/formElements/enum/enum.component';
import { FormularTypeComponent } from './components/popup/popups/formularType/formularType.component';
import { SelectComponent } from './components/popup/popups/select/select.component';
import { FormularDateElementComponent } from './components/content/content-nodes/formular-node/formElements/date/date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormularNumberElementComponent } from './components/content/content-nodes/formular-node/formElements/number/number.component';
import { FormularFileElementComponent } from './components/content/content-nodes/formular-node/formElements/file/file.component';
import { FormularTimeElementComponent } from './components/content/content-nodes/formular-node/formElements/time/time.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AgGridModule } from 'ag-grid-angular';
import { TableNodeComponent } from './components/content/content-nodes/table/table-node.component';
import { PopupSearchFormularComponent } from './components/popup/popups/searchFormular/searchFormular.component';
import { AgGridHeaderComponent } from './bridges/agGridHeader/agGridHeader.component';
import { SelectFormularComponent } from './components/overlay/dialog/selectFormular/selectFormular.component';
import { ChangeFormularComponent } from './components/overlay/dialog/changeFormular/changeFormular.component';
import { AgGridHeaderColumnComponent } from './bridges/agGridHeaderColumn/agGridHeaderColumn.component';
import { AddEditFormElementComponent } from './components/overlay/dialog/editFormElement/editFormElement';
import { FormularNodeComponent } from './components/content/content-nodes/formular-node/formular/formular.component';
import { FormularElementComponent } from './components/content/content-nodes/formular-node/formularElement/formularElement.component';
import { FormularCheckboxElementComponent }
  from './components/content/content-nodes/formular-node/formElements/checkbox/checkbox.component';
import { FormularTextAreaElementComponent }
  from './components/content/content-nodes/formular-node/formElements/textarea/textarea.component';

@NgModule({
  declarations:
  [
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    ButtonComponent,
    BodyComponent,
    SidenavItemComponent,
    OverlayComponent,
    NoteComponent,
    LoginDialogComponent,
    RegisterGroupDialogComponent,
    SearchFieldComponent,
    PopupComponent,
    PopupHomeComponent,
    GroupSelectorComponent,
    PopupSearchFieldComponent,
    FormularTypeComponent,
    ContentComponent,
    TextNodeComponent,
    EditorComponent,
    ContentTypeComponent,
    FormularElementComponent,
    FormElementComponent,
    FormularTextElementComponent,
    AddEditFormElementComponent,
    TitleComponent,
    FormularEnumElementComponent,
    FormularCheckboxElementComponent,
    FormularTextAreaElementComponent,
    SelectComponent,
    FormularDateElementComponent,
    FormularNumberElementComponent,
    FormularFileElementComponent,
    FormularTimeElementComponent,
    TableNodeComponent,
    PopupSearchFormularComponent,
    AgGridHeaderComponent,
    SelectFormularComponent,
    ChangeFormularComponent,
    AgGridHeaderColumnComponent,
    FormularNodeComponent
  ],
  imports: [
    QuillModule,
    CommonModule,
    BrowserModule,
    FlexLayoutModule,
    MatIconModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatMenuModule,
    MatTooltipModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule.setLocale('de-DE'),
    AgGridModule.withComponents([AgGridHeaderComponent, AgGridHeaderColumnComponent])
  ],
  exports:[
    EditorComponent,
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    ButtonComponent,
    BodyComponent,
    OverlayComponent,
    NoteComponent,
    LoginDialogComponent,
    SearchFieldComponent,
    RegisterGroupDialogComponent,
    PopupComponent,
    PopupHomeComponent,
    GroupSelectorComponent,
    PopupSearchFieldComponent,
    SidenavItemComponent,
    ContentComponent,
    TextNodeComponent,
    ContentTypeComponent,
    FormularElementComponent,
    FormElementComponent,
    FormularTextElementComponent,
    FormularNodeComponent,
    AddEditFormElementComponent,
    TitleComponent,
    PopupSearchFormularComponent,
    AgGridHeaderComponent,
    SelectFormularComponent,
    ChangeFormularComponent,
    AgGridHeaderColumnComponent
  ],
  providers: [
    EditorService,
    DOMService,
    HttpClient,
    SidenavItemService,
    CashService
  ],
  bootstrap: [AppComponent]
})
export class SharedModule { }
