import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { createCustomElement } from '@angular/elements';
import { OsmComponent } from './osm.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { InfoPopupComponent } from './info-popup/info-popup.component';
import { ImageService } from '@shared/images/image.service';

@NgModule({
  declarations: [
    OsmComponent,
    InfoPopupComponent
  ],
  imports: [
    CommonModule,
    LeafletModule.forRoot()
  ],
  exports: [
    OsmComponent
   ],
   bootstrap: [OsmComponent],
   entryComponents: [InfoPopupComponent],
   providers: [
    ImageService
   ]
})
export class OsmModule {
  constructor(private injector: Injector) {
    const PopupElement = createCustomElement(InfoPopupComponent, {injector});
    // Register the custom element with the browser.
    if (!customElements.get('info-popup')) {
      customElements.define('info-popup', PopupElement);
    }
  }
}
