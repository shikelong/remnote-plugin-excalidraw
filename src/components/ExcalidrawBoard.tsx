import { Excalidraw, WelcomeScreen } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState, BinaryFiles, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import debounce from 'debounce';
import deepEqual from 'deep-equal';
import { memo, useCallback, useEffect, useState } from 'react';
import { usePreferTheme, useStoredData } from '../hooks';
import { ExcalidrawMainMenu } from './ExcalidrawMainMenu';
import { SETTING_IDs, THEME_SETTING } from '../constants';
import { useTracker } from '@remnote/plugin-sdk';

export const ExcalidrawBoard = memo(({ remId }: { remId?: string }) => {
  const [initialValue, setSyncedValue] = useStoredData(remId);

  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawImperativeAPI | undefined>(
    undefined
  );

  const preferRemNoteTheme = usePreferTheme();

  const useSettingTheme = useTracker<THEME_SETTING>(
    async (reactivePlugin) => await reactivePlugin.settings.getSetting(SETTING_IDs.theme),
    []
  );

  const theme =
    useSettingTheme === 'auto' || useSettingTheme === undefined
      ? preferRemNoteTheme
      : useSettingTheme;

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
    <Excalidraw onChange={handleChange} initialData={initialValue} ref={setRef} theme={theme}>
      <WelcomeScreen />
      <ExcalidrawMainMenu excalidrawAPI={excalidrawAPI} />
    </Excalidraw>
  );
}, deepEqual);
