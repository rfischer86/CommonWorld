import { PopupHomeComponent } from './home.component';

export interface PopupAction {
  name: string;
  do: (self) => void;
  self: PopupHomeComponent;
}

