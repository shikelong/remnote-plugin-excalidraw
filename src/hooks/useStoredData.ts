import { usePlugin } from '@remnote/plugin-sdk';
import { useCallback, useEffect, useState } from 'react';
import { EMBED_EXCALIDRAW_POWERUP } from '../constants';
import { ExcalidrawData } from '../types';

export const useStoredData = (
  remId?: string
): [ExcalidrawData | undefined, (data: ExcalidrawData) => void] => {
  const plugin = usePlugin();
  const [data, _setData] = useState<ExcalidrawData>();

  useEffect(() => {
    const getData = async () => {
      const rem = await plugin.rem.findOne(remId);
      const data = await rem?.getPowerupProperty(EMBED_EXCALIDRAW_POWERUP, 'data');
      const storedData: ExcalidrawData = data ? JSON.parse(data) : null;
      if (storedData !== null) {
        //TODO: use a better solution later.
        // After JSON.parse, the collaborator will be a plain object, causing a 'forEach not defined' error.
        // To temporarily fix this issue, we rewrite it as a new Map. This is acceptable as the collaboration feature is not yet supported.
        storedData.appState.collaborators = new Map();
      }
      _setData(storedData);
    };

    getData();
  }, [remId]);

  const setData = useCallback(
    async (data: ExcalidrawData) => {
      const rem = await plugin.rem.findOne(remId);
      await rem?.setPowerupProperty(EMBED_EXCALIDRAW_POWERUP, 'data', [JSON.stringify(data)]);
    },
    [remId, plugin]
  );

  return [data, setData];
};
