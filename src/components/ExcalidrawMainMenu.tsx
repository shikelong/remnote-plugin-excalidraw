import { MainMenu } from '@excalidraw/excalidraw';

export const ExcalidrawMainMenu = ({
  viewModeEnabled,
  onViewModeChanged,
}: {
  viewModeEnabled: boolean;
  onViewModeChanged: () => void;
}) => {
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
        <MainMenu.Item onSelect={onViewModeChanged} style={{ paddingLeft: '1.8em' }}>
          Switch to {viewModeEnabled ? 'edit' : 'view'} mode
        </MainMenu.Item>
        <MainMenu.DefaultItems.ChangeCanvasBackground />
      </MainMenu.Group>
    </MainMenu>
  );
};
