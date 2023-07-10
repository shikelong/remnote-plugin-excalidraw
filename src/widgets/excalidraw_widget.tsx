import { Excalidraw } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState, BinaryFiles, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import {
  WidgetLocation,
  renderWidget,
  usePlugin,
  useRunAsync,
  useSyncedStorageState,
} from '@remnote/plugin-sdk';
import debounce from 'debounce';
import { useCallback, useEffect, useRef, useState, memo, ComponentProps } from 'react';
import { useRemId } from '../hooks';
import { RenderIfRemId } from '../components';

const ExcalidrawMemo = memo(({ remId }: { remId?: string }) => {
  const [initialValue, setSyncedValue] = useStoredData(remId);
  console.log('initialValue: ', initialValue);

  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | null>(null);

  const setRef = useCallback((api: ExcalidrawImperativeAPI) => setExcalidrawAPI(api), []);

  const handleChange = useCallback(
    debounce((elements: readonly ExcalidrawElement[], appState: AppState, file: BinaryFiles) => {
      console.log('save to', elements);
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
});

type ExcalidrawData = {
  elements: readonly ExcalidrawElement[];
  appState: AppState;
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

  console.log('syncedValue: ', syncedValue);

  useEffect(() => {
    if (remId && syncedValue?.elements.length) {
      console.log('set syncedValue: ', syncedValue);
      ref.current = syncedValue;
    }
  }, [remId, syncedValue]);

  console.log('return stored data: ', ref.current);
  return [ref.current, setSyncedValue];
};

export const ExcalidrawWidget = () => {
  // console.log('syncedValue: ');

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
