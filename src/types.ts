import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types';

export type ExcalidrawData = {
  elements: readonly ExcalidrawElement[];
  appState: AppState;
  files?: BinaryFiles;
  scrollToContent?: boolean;
};
