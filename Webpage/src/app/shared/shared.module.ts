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
    ContentComponent,
    TextNodeComponent,
    EditorComponent,
    ContentTypeComponent
  ],
  imports: [
    QuillModule,
    CommonModule,
    BrowserModule,
    FlexLayoutModule,
    MatIconModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatMenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
    ContentTypeComponent
  ],
  providers: [
    EditorService,
    DOMService,
    HttpClient,
    SidenavItemService,
  ],
  bootstrap: [AppComponent]
})
export class SharedModule { }
