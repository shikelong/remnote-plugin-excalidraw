import { renderWidget, usePlugin } from '@remnote/plugin-sdk';
import { useState } from 'react';
import { ExcalidrawBoard } from '../components';

export const ExcalidrawPopupWidget = () => {
  const plugin = usePlugin();
  const [remId, setRemId] = useState<string | undefined>(undefined);
  const context = plugin.widget.getWidgetContext();

  context.then(async (context) => {
    setRemId((context as { contextData: { remId: string } }).contextData.remId);
  });

  return <>{remId && <ExcalidrawBoard remId={remId} openInModal></ExcalidrawBoard>}</>;
};

renderWidget(ExcalidrawPopupWidget);
