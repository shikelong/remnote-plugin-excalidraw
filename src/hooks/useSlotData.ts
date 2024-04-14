import { usePlugin } from '@remnote/plugin-sdk';
import { useCallback, useEffect, useState } from 'react';
import { EMBED_EXCALIDRAW_POWERUP } from '../constants';

export function useSlotData<T>(
  slotId: string,
  remId?: string,
  defaultData?: T,
  handleDataFromSlot?: (data: T) => void,
  reactive = false
): [
  {
    data?: T;
    isLoading: boolean;
  },
  (data: T) => void,
  () => T
] {
  const plugin = usePlugin();
  const [data, setData] = useState<T | undefined>();
  const [isLoading, setLoading] = useState(true);

  const getData = useCallback(async () => {
    if (!remId) {
      return;
    }
    const rem = await plugin.rem.findOne(remId);
    const data = await rem?.getPowerupProperty(EMBED_EXCALIDRAW_POWERUP, slotId);

    let storedData: T = data ? JSON.parse(data) : undefined;

    if (defaultData) {
      if (typeof defaultData === 'object' && defaultData !== null) {
        storedData = { ...defaultData, ...(storedData ?? {}) };
      } else {
        storedData = storedData || defaultData;
      }
    }

    if (handleDataFromSlot && storedData) {
      handleDataFromSlot(storedData);
    }

    return storedData;
  }, [remId]);

  useEffect(() => {
    getData().then((storedData) => {
      setData(storedData);
      setLoading(false);
    });
  }, [remId]);

  const saveData = useCallback(
    async (data: T) => {
      const rem = await plugin.rem.findOne(remId);
      await rem?.setPowerupProperty(EMBED_EXCALIDRAW_POWERUP, slotId, [JSON.stringify(data)]);
      if (reactive) {
        setTimeout(() => {
          getData().then((storedData) => {
            setData(storedData);
            setLoading(false);
          });
        }, 100);
      }
    },
    [remId, plugin, reactive]
  );

  return [{ data, isLoading }, saveData, getData];
}
