import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './layout/components/main/main.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { TitleComponent } from './shared/components/title/title.component';
import { ButtonPanelComponent } from './shared/components/button-panel/button-panel.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import { FooterComponent } from './shared/components/footer/footer.component';
import { BodyComponent } from './shared/components/body/body.component';
import { DOMService } from './shared/services/DOM/dom-element.service';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    TitleComponent,
    ButtonPanelComponent,
    BodyComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [DOMService],
  bootstrap: [AppComponent]
})
export class AppModule { }
