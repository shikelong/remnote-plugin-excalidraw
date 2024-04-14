import { Button, Excalidraw, WelcomeScreen } from '@excalidraw/excalidraw';
import { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import { AppState, BinaryFiles, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types/types';
import { useOnMessageBroadcast, usePlugin } from '@remnote/plugin-sdk';
import debounce from 'debounce';
import deepEqual from 'deep-equal';
import { memo, useCallback, useEffect, useState } from 'react';
import { DEFAULT_SLOT_OPTIONS, SLOT_IDs } from '../constants';
import { useCustomHeight, useOptions, useSlotData } from '../hooks';
import { ExcalidrawData, ModalClosedMessage, SlotOptions } from '../types';
import { ExcalidrawMainMenu } from './ExcalidrawMainMenu';
import CloseModal from './Icons/CloseModal';
import FullScreen from './Icons/FullScreen';

const handleStoredExcalidrawData = (storedData: ExcalidrawData) => {
  //TODO: use a better solution later.
  // After JSON.parse, the collaborator will be a plain object, causing a 'forEach not defined' error.
  // To temporarily fix this issue, we rewrite it as a new Map. This is acceptable as the collaboration feature is not yet supported.
  storedData.appState.collaborators = new Map();
};

export const ExcalidrawBoard = memo(
  ({ remId, openInModal = false }: { remId?: string; openInModal?: boolean }) => {
    const [{ data: initialData, isLoading }, saveData, getData] = useSlotData<ExcalidrawData>(
      SLOT_IDs.data,
      remId,
      undefined,
      handleStoredExcalidrawData,
      false
    );
    const [{ data: slotOptions }, saveSlotOptions] = useSlotData<SlotOptions>(
      SLOT_IDs.options,
      remId,
      DEFAULT_SLOT_OPTIONS,
      undefined,
      true
    );

    const [excalidrawApi, setExcalidrawApi] = useState<ExcalidrawImperativeAPI | null>(null);

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

    useOnMessageBroadcast(async (event) => {
      if (event.message.type === 'ModalClosed') {
        if ((event.message as ModalClosedMessage).remId === remId) {
          if (excalidrawApi?.updateScene) {
            const storedData = await getData();

            excalidrawApi?.updateScene({
              elements: storedData?.elements,
              appState: storedData?.appState,
            });
          } else {
            console.error('excalidraw api is not ready');
          }
        }
      }
    });

    const viewModeEnabled = slotOptions?.viewModeEnabled ?? DEFAULT_SLOT_OPTIONS.viewModeEnabled;

    const onPopupModeChanged = async () => {
      if (openInModal) {
        //Force Instance's update / re-render to sync the data between modal instance and main instance.
        plugin.messaging.broadcast({ remId, type: 'ModalClosed' } as ModalClosedMessage);
        await plugin.widget.closePopup();
      } else {
        //Disable close when clicking outside to make sure we have the chance to broadcast ModalClosedMessage.
        await plugin.widget.openPopup('excalidraw_popup_widget', { remId }, false);
      }
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
            ref={(api: ExcalidrawImperativeAPI) => setExcalidrawApi(api)}
            renderTopRightUI={() => (
              <div className="relative top-[2px]">
                <Button
                  onSelect={onPopupModeChanged}
                  title={openInModal ? 'close popup' : 'open in popup'}
                >
                  <div className="ToolIcon__icon">
                    {openInModal ? <CloseModal /> : <FullScreen />}
                  </div>
                </Button>
              </div>
            )}
            viewModeEnabled={viewModeEnabled}
          >
            <WelcomeScreen />
            <ExcalidrawMainMenu
              onViewModeChanged={onViewModeChanged}
              viewModeEnabled={viewModeEnabled}
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
