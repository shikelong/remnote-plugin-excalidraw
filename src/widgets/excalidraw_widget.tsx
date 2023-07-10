import { renderWidget } from '@remnote/plugin-sdk';
import { ExcalidrawBoard, RenderIfRemId } from '../components';

export const ExcalidrawWidget = () => {
  return (
    <div className="p-2 m-2" style={{ height: '500px' }}>
      <RenderIfRemId>
        <ExcalidrawBoard></ExcalidrawBoard>
      </RenderIfRemId>
    </div>
  );
};

renderWidget(ExcalidrawWidget);
