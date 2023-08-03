import { SlotOptions } from './types';

export const EMBED_EXCALIDRAW_POWERUP = 'embed_excalidraw_powerup';
export const EMBED_EXCALIDRAW_POWERUP_NAME = 'EmbedExcalidraw';

export const SETTING_IDs = {
  theme: 'excalidraw_theme',
  height: 'excalidraw_container_height',
};

export const CONTAINER_HEIGHT_VALIDATOR = {
  min: 450,
  max: 1300,
  default: 600,
};

export type THEME = 'dark' | 'light';
export type THEME_SETTING = THEME | 'auto';

export const SLOT_IDs = {
  data: 'data',
  height: 'height',
  options: 'options',
};

export const DEFAULT_SLOT_OPTIONS: SlotOptions = {
  viewModeEnabled: false,
};
