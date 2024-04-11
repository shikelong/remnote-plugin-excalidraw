import { renderWidget, usePlugin } from '@remnote/plugin-sdk';
import { ExcalidrawBoard, RenderIfRemId } from '../components';
import { useState } from 'react';

export const ExcalidrawPopupWidget = () => {
  const plugin = usePlugin();
  const [remId, setRemId] = useState<string | undefined>(undefined);
  const context = plugin.widget.getWidgetContext();

  context.then(async (context) => {
    setRemId((context as { contextData: { remId: string } }).contextData.remId);
    const v = await plugin.widget.getDimensions(+context.widgetInstanceId);
    console.log('dimensions', v);
  });

  return <>{remId && <ExcalidrawBoard remId={remId} openInModal></ExcalidrawBoard>}</>;
};

renderWidget(ExcalidrawPopupWidget);
