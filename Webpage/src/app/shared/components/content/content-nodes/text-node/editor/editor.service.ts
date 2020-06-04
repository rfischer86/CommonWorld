import { Injectable } from  '@angular/core';
import Quill from 'quill';
import QuillAutoLink from './quill/quillAutolink';

@Injectable({
  providedIn: 'root'
})
export class EditorService {
  constructor () {
    const Link = Quill.import('formats/link');
    Link.sanitize = (url) => {
      if (url.ondexOf('http') <= -1) {
        url = 'https://' + url;
      }
      return url;
    }
    Quill.register('modules/autoLink', QuillAutoLink);
  }
}