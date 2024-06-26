import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';
import {
  CONTAINER_HEIGHT_VALIDATOR,
  EMBED_EXCALIDRAW_POWERUP,
  EMBED_EXCALIDRAW_POWERUP_NAME,
  SETTING_IDs,
  SLOT_IDs,
} from '../constants';
import { getPopupDimensions } from '../utils';

async function onActivate(plugin: ReactRNPlugin) {
  await plugin.app.registerCommand({
    id: 'excalidraw',
    name: 'Excalidraw',
    action: async () => {
      const rem = await plugin.focus.getFocusedRem();
      await rem?.addPowerup(EMBED_EXCALIDRAW_POWERUP);
    },
  });

  await plugin.app.registerPowerup(
    EMBED_EXCALIDRAW_POWERUP_NAME,
    EMBED_EXCALIDRAW_POWERUP,
    'Embed Excalidraw into RemNote',
    {
      slots: [
        { code: SLOT_IDs.data, name: SLOT_IDs.data, hidden: true, onlyProgrammaticModifying: true },
        {
          code: SLOT_IDs.height,
          name: SLOT_IDs.height,
          hidden: false,
          onlyProgrammaticModifying: false,
        },
        {
          code: SLOT_IDs.options,
          name: SLOT_IDs.options,
          hidden: true,
          onlyProgrammaticModifying: true,
        },
      ],
    }
  );

  await plugin.settings.registerDropdownSetting({
    id: SETTING_IDs.theme,
    title: 'Theme',
    options: [
      { key: '1', value: 'auto', label: 'Auto' },
      { key: '2', value: 'light', label: 'Light' },
      { key: '3', value: 'dark', label: 'Dark' },
    ],
    defaultValue: 'auto',
  });

  await plugin.settings.registerNumberSetting({
    id: SETTING_IDs.height,
    title: 'Height',
    description: `Set the default height of the Excalidraw board. Valid values range from ${CONTAINER_HEIGHT_VALIDATOR.min} to ${CONTAINER_HEIGHT_VALIDATOR.max}, you can also set separated height via the height slot of each ${EMBED_EXCALIDRAW_POWERUP_NAME} powerup`,
    defaultValue: CONTAINER_HEIGHT_VALIDATOR.default,
  });

  await plugin.app.registerWidget('excalidraw_widget', WidgetLocation.UnderRemEditor, {
    dimensions: { height: 'auto', width: '100%' },
    powerupFilter: EMBED_EXCALIDRAW_POWERUP,
  });

  await plugin.app.registerWidget('excalidraw_popup_widget', WidgetLocation.Popup, {
    dimensions: getPopupDimensions(),
  });
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
