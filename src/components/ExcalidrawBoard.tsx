import { Excalidraw, WelcomeScreen } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState, BinaryFiles } from '@excalidraw/excalidraw/types/types';
import debounce from 'debounce';
import deepEqual from 'deep-equal';
import { memo, useCallback, useState } from 'react';
import { DEFAULT_SLOT_OPTIONS, SLOT_IDs } from '../constants';
import { useCustomHeight, useOptions, useSlotData } from '../hooks';
import { ExcalidrawData, SlotOptions } from '../types';
import { ExcalidrawMainMenu } from './ExcalidrawMainMenu';
import { usePlugin } from '@remnote/plugin-sdk';

const handleStoredExcalidrawData = (storedData: ExcalidrawData) => {
  //TODO: use a better solution later.
  // After JSON.parse, the collaborator will be a plain object, causing a 'forEach not defined' error.
  // To temporarily fix this issue, we rewrite it as a new Map. This is acceptable as the collaboration feature is not yet supported.
  storedData.appState.collaborators = new Map();
};

export const ExcalidrawBoard = memo(
  ({ remId, openInModal }: { remId?: string; openInModal?: boolean }) => {
    const [{ data: initialData, isLoading }, saveData] = useSlotData<ExcalidrawData>(
      SLOT_IDs.data,
      remId,
      undefined,
      handleStoredExcalidrawData
    );
    const [{ data: slotOptions }, saveSlotOptions] = useSlotData<SlotOptions>(
      SLOT_IDs.options,
      remId,
      DEFAULT_SLOT_OPTIONS,
      undefined,
      true
    );

    const plugin = usePlugin();

    const { theme } = useOptions();
    const { height, isLoading: isHeightLoading } = useCustomHeight(remId);

    const onViewModeChanged = useCallback(() => {
      if (slotOptions) {
        saveSlotOptions({ ...slotOptions, viewModeEnabled: !slotOptions.viewModeEnabled });
      }
    }, [slotOptions, saveSlotOptions]);

    const handleChange = useCallback(
      debounce((elements: readonly ExcalidrawElement[], appState: AppState, files: BinaryFiles) => {
        saveData({ elements, appState, files });
      }, 500),
      []
    );

    const viewModeEnabled = slotOptions?.viewModeEnabled ?? DEFAULT_SLOT_OPTIONS.viewModeEnabled;

    const [isOpenPopup, setIsOpenPopup] = useState(false);

    const onPopupModeChanged = async () => {
      if (isOpenPopup) {
        plugin.widget.closePopup();
      } else {
        plugin.widget.openPopup('excalidraw_popup_widget', { remId, caller: 'test' }, true);
      }

      setIsOpenPopup((v) => !v);
    };

    if (isHeightLoading) {
      return null;
    }

    return (
      <div
        style={{
          height: openInModal ? '100%' : height,
          borderColor: '#ddd',
          transition: 'height 0.6s ease-in-out',
        }}
        className="border border-solid"
      >
        {!isLoading || initialData ? (
          <Excalidraw
            onChange={handleChange}
            initialData={initialData}
            theme={theme}
            viewModeEnabled={viewModeEnabled}
          >
            <WelcomeScreen />
            <ExcalidrawMainMenu
              onViewModeChanged={onViewModeChanged}
              viewModeEnabled={viewModeEnabled}
              onPopupModeChanged={onPopupModeChanged}
              popupModeEnabled={isOpenPopup}
            />
          </Excalidraw>
        ) : (
          <>loading...</>
        )}
      </div>
    );
  },
  deepEqual
);
