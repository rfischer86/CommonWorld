import { PopupHomeComponent } from '../components/popup/popups/home/home.component';

export interface PopupAction <T> {
  name: string;
  do: (self, data) => void;
  data: any;
  self: T;
  apiId: string;
  parentParentId: string;
}

