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

@NgModule({
  declarations:
  [
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    TitleComponent,
    ButtonComponent,
    BodyComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
    TranslateModule
  ],
  exports:[
    FooterComponent,
    HeaderComponent,
    SidenavComponent,
    TitleComponent,
    ButtonComponent,
    BodyComponent
  ],
  providers: [DOMService],
  bootstrap: [AppComponent]
})
export class SharedModule { }
