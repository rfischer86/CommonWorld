import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TitleComponent } from './components/title/title.component';
import { ButtonComponent } from './components/button/button.component';
import { BodyComponent } from './components/body/body.component';
import { DOMService } from './services/DOM/dom-element.service';
import { AppComponent } from '../app.component';
import { SidenavItemComponent } from './components/sidenav/sidenavItem/sidenavItem.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidenavItemService } from './services/REST/sidenavItem.service';
import { ArcordeonComponent } from './components/arcordeon/arcordeon.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { NoteComponent } from './components/note/note.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginDialogComponent } from './components/dialog/login/login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatMenuModule } from '@angular/material/menu';
import { RegisterGroupDialogComponent } from './components/dialog/register-group/register-group';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { PopupComponent } from './components/popup/popup.component';
import { PopupHomeComponent } from './components/popup/popups/home/home.component';

@NgModule({
  declarations:
  [
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    TitleComponent,
    ButtonComponent,
    BodyComponent,
    SidenavItemComponent,
    ArcordeonComponent,
    OverlayComponent,
    NoteComponent,
    LoginDialogComponent,
    RegisterGroupDialogComponent,
    SearchFieldComponent,
    PopupComponent,
    PopupHomeComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FlexLayoutModule,
    MatIconModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatMenuModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    TitleComponent,
    ButtonComponent,
    BodyComponent,
    OverlayComponent,
    ArcordeonComponent,
    NoteComponent,
    LoginDialogComponent,
    SearchFieldComponent,
    RegisterGroupDialogComponent,
    PopupComponent,
    PopupHomeComponent
  ],
  providers: [
    DOMService,
    HttpClient,
    SidenavItemService,
  ],
  bootstrap: [AppComponent]
})
export class SharedModule { }
