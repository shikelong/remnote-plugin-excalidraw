import { WidgetLocation, usePlugin, useRunAsync } from '@remnote/plugin-sdk';

export const useRemId = (): string | undefined => {
  const plugin = usePlugin();

  const widgetContext = useRunAsync(
    () => plugin.widget.getWidgetContext<WidgetLocation.UnderRemEditor>(),
    []
  );
  return widgetContext?.remId;
};
