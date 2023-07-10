import { declareIndexPlugin, ReactRNPlugin, WidgetLocation } from '@remnote/plugin-sdk';
import '../style.css';
import '../App.css';
import { EMBED_EXCALIDRAW_POWERUP } from '../constants';

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
    'EmbedExcalidraw',
    EMBED_EXCALIDRAW_POWERUP,
    'Embed Excalidraw into RemNote',
    {
      slots: [{ code: 'data', name: 'data' }],
    }
  );

  // Register a sidebar widget.
  await plugin.app.registerWidget('excalidraw_widget', WidgetLocation.UnderRemEditor, {
    dimensions: { height: 'auto', width: '100%' },
    powerupFilter: EMBED_EXCALIDRAW_POWERUP,
  });
}

async function onDeactivate(_: ReactRNPlugin) {}

declareIndexPlugin(onActivate, onDeactivate);
