import { usePlugin, useTracker } from '@remnote/plugin-sdk';
import { useEffect, useState } from 'react';
import { CONTAINER_HEIGHT_VALIDATOR, EMBED_EXCALIDRAW_POWERUP } from '../constants';
import { useOptions } from './useOptions';
import { getValidNumber } from '../utils';

export const useCustomHeight = (
  remId?: string
): {
  height?: number;
  isLoading: boolean;
} => {
  const plugin = usePlugin();
  const [customHeight, setCustomHeight] = useState<number | undefined>();
  const [isLoading, setLoading] = useState(true);
  const { containerHeight } = useOptions();

  const heightInSlot = useTracker(
    async (reactivePlugin) => {
      const rem = await reactivePlugin.rem.findOne(remId);
      const data = await rem?.getPowerupProperty(EMBED_EXCALIDRAW_POWERUP, 'height');
      const numeralData = getValidNumber(
        Number(data),
        CONTAINER_HEIGHT_VALIDATOR.min,
        CONTAINER_HEIGHT_VALIDATOR.max
      );
      return numeralData;
    },
    [remId]
  );

  useEffect(() => {
    const setData = async () => {
      const rem = await plugin.rem.findOne(remId);

      //init slot-height's value as height in option
      if (Number.isNaN(heightInSlot) && containerHeight) {
        await rem?.setPowerupProperty(EMBED_EXCALIDRAW_POWERUP, 'height', [
          containerHeight.toString(),
        ]);
      }

      if (!Number.isNaN(heightInSlot)) {
        setCustomHeight(heightInSlot);
      } else {
        setCustomHeight(containerHeight);
      }

      setLoading(false);
    };

    if (!remId || heightInSlot === undefined) {
      return;
    }

    setData();
  }, [remId, containerHeight, heightInSlot]);

  return { height: customHeight, isLoading };
};
