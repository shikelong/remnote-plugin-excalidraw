import { Excalidraw } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState, BinaryFiles, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { renderWidget, useSyncedStorageState } from '@remnote/plugin-sdk';
import debounce from 'debounce';
import deepEqual from 'deep-equal';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { RenderIfRemId } from '../components';

const ExcalidrawMemo = memo(({ remId }: { remId?: string }) => {
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

  return <Excalidraw onChange={handleChange} initialData={initialValue} ref={setRef} />;
}, deepEqual);

type ExcalidrawData = {
  elements: readonly ExcalidrawElement[];
  appState: AppState;
  scrollToContent?: boolean;
};

const useStoredData = (
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

export const ExcalidrawWidget = () => {
  return (
    <div className="p-2 m-2 rounded-lg rn-clr-background-light-positive rn-clr-content-positive">
      <div style={{ height: '500px' }}>
        <RenderIfRemId>
          <ExcalidrawMemo></ExcalidrawMemo>
        </RenderIfRemId>
      </div>
    </div>
  );
};

renderWidget(ExcalidrawWidget);
