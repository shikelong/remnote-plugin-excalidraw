import { Excalidraw, WelcomeScreen } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState, BinaryFiles, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import debounce from 'debounce';
import deepEqual from 'deep-equal';
import { memo, useCallback, useEffect, useState } from 'react';
import { useStoredData } from '../hooks';
import { ExcalidrawMainMenu } from './ExcalidrawMainMenu';

export const ExcalidrawBoard = memo(({ remId }: { remId?: string }) => {
  const [initialValue, setSyncedValue] = useStoredData(remId);

  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | undefined>(
    undefined
  );

  const setRef = useCallback((api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api), []);

  const handleChange = useCallback(
    debounce((elements: readonly ExcalidrawElement[], appState: AppState, file: BinaryFiles) => {
      setSyncedValue({ elements, appState });
    }, 500),
    []
  );

  useEffect(() => {
    if (initialValue) {
      excalidrawAPI?.updateScene(initialValue);
    }
  }, [initialValue]);

  return (
    <Excalidraw onChange={handleChange} initialData={initialValue} ref={setRef}>
      <WelcomeScreen />
      <ExcalidrawMainMenu excalidrawAPI={excalidrawAPI} />
    </Excalidraw>
  );
}, deepEqual);
