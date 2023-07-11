import { MainMenu } from '@excalidraw/excalidraw';
import { ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { usePlugin } from '@remnote/plugin-sdk';
import { useCallback } from 'react';

export const ExcalidrawMainMenu = ({
  excalidrawAPI,
}: {
  excalidrawAPI?: ExcalidrawImperativeAPI;
}) => {
  const plugin = usePlugin();
  const viewModeEnabled = excalidrawAPI?.getAppState()?.viewModeEnabled;

  const handleToggleViewMode = useCallback(() => {
    excalidrawAPI?.updateScene({
      appState: { viewModeEnabled: !viewModeEnabled },
    });
  }, [viewModeEnabled, excalidrawAPI]);

  return (
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
          onSelect={handleToggleViewMode}
          icon={
            <img
              className={viewModeEnabled ? '-ml-1' : '-ml-1.5'}
              src={`${plugin.rootURL}${viewModeEnabled ? 'edit' : 'view'}.svg`}
              height={viewModeEnabled ? 16 : 20}
              width={viewModeEnabled ? 16 : 20}
            />
          }
        >
          {viewModeEnabled ? 'Edit' : 'View'} mode
        </MainMenu.Item>
        <MainMenu.DefaultItems.ChangeCanvasBackground />
      </MainMenu.Group>
    </MainMenu>
  );
};
