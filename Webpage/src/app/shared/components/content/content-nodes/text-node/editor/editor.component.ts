import { Component, ViewChild, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss', ]
})
export class EditorComponent implements OnInit {
  @ViewChild('editor', { read: true }) editor: QuillEditorComponent;
  @Input() contentData: string;
  @Output() outputData: EventEmitter = new EventEmitter();

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
  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      editor: ['']
    });
  }

  ngOnInit() {
    this.form.get('editor').setValue(this.contentData);
  }

  onSubmit() {
    if (this.isEditMode) {
      this.contentData = this.form.get('editor').value;
      this.isEditMode = this.isEditMode ? false : true;
      this.outputData.emit(this.contentData);
    }
  }

  setControl() {
    this.form.setControl('editor', new FormControl('test - new Control'));
  }

  patchValue() {
    this.form.get('editor').patchValue(`${this.form.get('editor').value} patched!`);
  }

}
