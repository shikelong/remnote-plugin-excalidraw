import { usePlugin } from '@remnote/plugin-sdk';
import { useCallback, useEffect, useState } from 'react';
import { EMBED_EXCALIDRAW_POWERUP } from '../constants';
import { ExcalidrawData } from '../types';

export const usePersistentData = (
  remId?: string
): [
  {
    initialData?: ExcalidrawData;
    isLoading: boolean;
  },
  (data: ExcalidrawData) => void
] => {
  const plugin = usePlugin();
  const [initialData, setInitialData] = useState<ExcalidrawData | undefined>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const rem = await plugin.rem.findOne(remId);
      const data = await rem?.getPowerupProperty(EMBED_EXCALIDRAW_POWERUP, 'data');
      const storedData: ExcalidrawData = data ? JSON.parse(data) : undefined;
      if (storedData) {
        //TODO: use a better solution later.
        // After JSON.parse, the collaborator will be a plain object, causing a 'forEach not defined' error.
        // To temporarily fix this issue, we rewrite it as a new Map. This is acceptable as the collaboration feature is not yet supported.
        storedData.appState.collaborators = new Map();
      }
      setInitialData(storedData);
      setLoading(false);
    };

    getData();
  }, [remId]);

  const saveData = useCallback(
    async (data: ExcalidrawData) => {
      const rem = await plugin.rem.findOne(remId);
      await rem?.setPowerupProperty(EMBED_EXCALIDRAW_POWERUP, 'data', [JSON.stringify(data)]);
    },
    [remId, plugin]
  );

  return [{ initialData, isLoading }, saveData];
};
