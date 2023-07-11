export const EMBED_EXCALIDRAW_POWERUP = 'embed_excalidraw_powerup';

export const SETTING_IDs = {
  theme: 'excalidraw_theme',
  height: 'excalidraw_container_height',
};

export const CONTAINER_HEIGHT_VALIDATOR = {
  min: 450,
  max: 1000,
  default: 600,
};

export type THEME = 'dark' | 'light';
export type THEME_SETTING = THEME | 'auto';
