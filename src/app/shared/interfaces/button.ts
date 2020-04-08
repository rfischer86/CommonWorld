import { ButtonState, ButtonTypes } from '../enums/button.enum';
import { HtmlState } from '../enums/htmlStates';

export interface Button {
  type: ButtonTypes,
  buttonState: ButtonState,
  htmlState: HtmlState,
  nextButton: number,
  action: (self, data) => void,
  self: object,
  icon: string,
  text: string,
  index: number,
  size: string,
  data: any
}
