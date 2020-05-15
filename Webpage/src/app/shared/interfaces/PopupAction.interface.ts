import { PopupHomeComponent } from '../components/popup/popups/home/home.component';

export interface PopupAction <T> {
  name: string;
  do: (self, data) => void;
  self: T;
  apiId: string;
}

