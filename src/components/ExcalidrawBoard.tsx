import { Excalidraw, WelcomeScreen } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { ExcalidrawImperativeAPI, AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types';
import debounce from 'debounce';
import deepEqual from 'deep-equal';
import { memo, useState, useCallback, useEffect } from 'react';
import { useStoredData } from '../hooks';

export const ExcalidrawBoard = memo(({ remId }: { remId?: string }) => {
  const [initialValue, setSyncedValue] = useStoredData(remId);

  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);

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
    </Excalidraw>
  );
}, deepEqual);
