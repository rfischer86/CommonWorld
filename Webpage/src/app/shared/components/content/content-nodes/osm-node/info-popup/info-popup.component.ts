
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-popup',
  templateUrl: './info-popup.component.html',
  styleUrls: ['./info-popup.component.scss']
})
export class InfoPopupComponent implements OnInit {
  @Input() placeData;
  isLoading = true;
  constructor ( ) {}

  ngOnInit() {
  }

}
