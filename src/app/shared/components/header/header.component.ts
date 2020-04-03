import { Component, OnInit } from '@angular/core';
import { DOMService } from '../../services/DOM/dom-element.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private DOMservcie: DOMService
  ) { }

  ngOnInit() {
  }

}
