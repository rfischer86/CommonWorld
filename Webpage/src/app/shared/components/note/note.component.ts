import { Component, Input } from '@angular/core';
import { Note } from './note.interface';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent {
  @Input() note: Note;
  constructor( ) { }
}
