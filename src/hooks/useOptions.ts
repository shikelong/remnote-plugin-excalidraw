import { useTracker } from '@remnote/plugin-sdk';
import { THEME_SETTING, SETTING_IDs, CONTAINER_HEIGHT_VALIDATOR } from '../constants';
import { usePreferTheme } from './usePreferTheme';

export const useOptions = () => {
  const preferRemNoteTheme = usePreferTheme();

  const userSetTheme = useTracker<THEME_SETTING>(
    async (reactivePlugin) => await reactivePlugin.settings.getSetting(SETTING_IDs.theme),
    []
  );

  const userSetHeight =
    useTracker<number>(
      async (reactivePlugin) => await reactivePlugin.settings.getSetting(SETTING_IDs.height),
      []
    ) ?? CONTAINER_HEIGHT_VALIDATOR.default;

  const containerHeight =
    userSetHeight >= CONTAINER_HEIGHT_VALIDATOR.min &&
    userSetHeight <= CONTAINER_HEIGHT_VALIDATOR.max
      ? userSetHeight
      : userSetHeight < CONTAINER_HEIGHT_VALIDATOR.min
      ? CONTAINER_HEIGHT_VALIDATOR.min
      : CONTAINER_HEIGHT_VALIDATOR.max;

  const theme =
    userSetTheme === 'auto' || userSetTheme === undefined ? preferRemNoteTheme : userSetTheme;

  return {
    theme,
    containerHeight,
  };
};
