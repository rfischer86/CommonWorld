import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { TitleComponent } from './components/title/title.component';
import { ButtonComponent } from './components/button/button.component';
import { BodyComponent } from './components/body/body.component';
import { DOMService } from './services/DOM/dom-element.service';
import { AppComponent } from '../app.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidenavItemComponent } from './components/sidenav/sidenavItem/sidenavItem.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidenavItemService } from './components/sidenav/sidenavItem/sidenavItem.service';
import { ArcordeonComponent } from './components/arcordeon/arcordeon.component';

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
    ArcordeonComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    TranslateModule,
    HttpClientModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    TitleComponent,
    ButtonComponent,
    BodyComponent
  ],
  providers: [
    DOMService,
    HttpClient,
    SidenavItemService
  ],
  bootstrap: [AppComponent]
})
export class SharedModule { }
