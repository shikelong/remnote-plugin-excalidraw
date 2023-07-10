import { Excalidraw, Footer, MainMenu, WelcomeScreen } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { ExcalidrawImperativeAPI, AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types';
import debounce from 'debounce';
import deepEqual from 'deep-equal';
import { memo, useState, useCallback, useEffect } from 'react';
import { useStoredData } from '../hooks';
import { usePlugin } from '@remnote/plugin-sdk';

export const ExcalidrawBoard = memo(({ remId }: { remId?: string }) => {
  const [initialValue, setSyncedValue] = useStoredData(remId);
  const plugin = usePlugin();

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
      <MainMenu>
        <MainMenu.Group>
          <MainMenu.DefaultItems.LoadScene />
          <MainMenu.DefaultItems.Export />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.ClearCanvas />
        </MainMenu.Group>
        <MainMenu.Separator></MainMenu.Separator>
        <MainMenu.Group>
          <MainMenu.DefaultItems.ToggleTheme />
          <MainMenu.Item
            onSelect={() => window.alert('Item1')}
            icon={
              <img className="-ml-1" src={`${plugin.rootURL}view.svg`} height={20} width={20} />
            }
          >
            View mode
          </MainMenu.Item>
          <MainMenu.Item
            onSelect={() => window.alert('Item1')}
            icon={<img src={`${plugin.rootURL}zen.svg`} height={18} width={18} />}
          >
            Zen Mode
          </MainMenu.Item>
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu.Group>
      </MainMenu>
    </Excalidraw>
  );
}, deepEqual);
