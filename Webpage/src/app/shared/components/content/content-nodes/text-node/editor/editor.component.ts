import { Component, ViewChild, Input, OnInit, Output, HostListener, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { States, State } from 'src/app/shared/classes/states/states';
import { EditorService } from './editor.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss', ]
})
export class EditorComponent implements OnInit {
  @ViewChild('editor', { read: true }) editor: QuillEditorComponent;
  @ViewChild('editorWrapper', { static: false }) editorWrapper;
  @Input() set setContentData(data: string) {
    this.contentData = data;
    this.form.get('editor').setValue(this.contentData);
  };
  contentData: string;
  @Output() outputData = new EventEmitter();

  text: string;
  hide = false;
  form: FormGroup;
  backgroundColor = '';
  hasFocus = false;
  isEditMode = false;
  isEVUAdmin = false;
  success: string = null;
  error: string = null;
  loading = false;
  clickTimeout = new State(false);
  quillConfig1 = {
    toolbar: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['code-block'],
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'header': [1, 2, 3, false] }],

        // [{ 'font': [] }],
        // [{ 'align': [] }],

        ['clean'],                                         // remove formatting button

        ['link'],
        // ['link', 'image', 'video']
        // ['emoji'],
    ],
    autoLink: true,
    keyboard: {
      bindings: {
        enter: {
          key: 13,
          handler: (range, context) => {
            return true;
          }
        }
      }
    }
  };
  quillConfig2 = {
    toolbar: false,
    autoLink: true,
    keyboard: {
      bindings: {
        enter: {
          key: 13,
          handler: (range, context) => {
            return true;
          }
        }
      }
    }
  };
  states = new States()
  constructor(
    private editorService: EditorService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      editor: ['']
    });
  }

  ngOnInit() {
    this.form.get('editor').setValue(this.contentData);
    this.states.finishInit.setTrue();
  }

  onSubmit() {
    if (this.isEditMode && this.outputData) {
      this.contentData = this.form.get('editor').value;
      this.outputData.emit(this.contentData);
    }
  }

  setControl() {
    this.form.setControl('editor', new FormControl('test - new Control'));
  }

  patchValue() {
    this.form.get('editor').patchValue(`${this.form.get('editor').value} patched!`);
  }
  
  @HostListener('document:click', ['$event'])
  public onClickOutside(targetElement: Event) {
    if (!this.editorWrapper) {return};
    this.clickTimeout.toggleState();
    setTimeout(() => this.clickTimeout.setFalse(), 300);
    if (this.clickTimeout.isFalse()) {
      this.isEditMode = true;
    } 
    if (this.clickTimeout.isTrue()) {
      setTimeout(() => { }, 290 );
    }

    const clickedInside = this.editorWrapper.nativeElement.contains(targetElement.target);
    if (!clickedInside && this.isEditMode ) {
      this.onSubmit();
      this.isEditMode = false;
    }
  }

}
