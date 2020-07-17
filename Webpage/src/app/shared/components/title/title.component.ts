import { Component, Input } from '@angular/core';
import { TitleTypes } from '../../enums/TitleTypes';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent {
  @Input() title: string;
  @Input() type: TitleTypes;
  constructor( ) { }
}
