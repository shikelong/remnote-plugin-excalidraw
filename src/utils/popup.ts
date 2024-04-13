import { WidgetOptions } from '@remnote/plugin-sdk';

export const getPopupDimensions = (): WidgetOptions['dimensions'] => {
  return {
    height: window.screen.availHeight - 80,
    width: window.screen.availWidth - 80,
  };
};
