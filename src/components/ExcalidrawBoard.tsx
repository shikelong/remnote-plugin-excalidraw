import { Excalidraw, WelcomeScreen } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState, BinaryFiles, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import debounce from 'debounce';
import deepEqual from 'deep-equal';
import { memo, useCallback, useEffect, useState } from 'react';
import { useCustomHeight, useOptions, usePersistentData } from '../hooks';
import { ExcalidrawMainMenu } from './ExcalidrawMainMenu';

export const ExcalidrawBoard = memo(({ remId }: { remId?: string }) => {
  const [{ initialData, isLoading }, saveData] = usePersistentData(remId);

  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | undefined>(
    undefined
  );

  const { theme } = useOptions();
  const { height, isLoading: isHeightLoading } = useCustomHeight(remId);

  const setRef = useCallback((api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api), []);

  const handleChange = useCallback(
    debounce((elements: readonly ExcalidrawElement[], appState: AppState, files: BinaryFiles) => {
      saveData({ elements, appState, files });
    }, 500),
    []
  );

  if (isHeightLoading) {
    return null;
  }

  return (
    <div
      style={{
        height,
        borderColor: '#ddd',
        transition: 'height 0.6s ease-in-out',
      }}
      className="border border-solid"
    >
      {!isLoading || initialData ? (
        <Excalidraw onChange={handleChange} initialData={initialData} ref={setRef} theme={theme}>
          <WelcomeScreen />
          <ExcalidrawMainMenu excalidrawAPI={excalidrawAPI} />
        </Excalidraw>
      ) : (
        <>loading...</>
      )}
    </div>
  );
}, deepEqual);
