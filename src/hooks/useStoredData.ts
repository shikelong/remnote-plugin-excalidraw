import { useSyncedStorageState } from '@remnote/plugin-sdk';
import { useRef, useEffect } from 'react';
import { ExcalidrawData } from '../types';

export const useStoredData = (
  remId?: string
): [ExcalidrawData | undefined, (data: ExcalidrawData) => void] => {
  const storeKey = `excalidraw_${remId}`;
  const ref = useRef<ExcalidrawData>();

  const [syncedValue, setSyncedValue] = useSyncedStorageState<ExcalidrawData | null>(
    storeKey,
    null
  );

  useEffect(() => {
    if (remId && syncedValue?.elements.length && !ref.current) {
      ref.current = { ...syncedValue, scrollToContent: true };
    }
  }, [remId, syncedValue]);

  return [ref.current, setSyncedValue];
};
