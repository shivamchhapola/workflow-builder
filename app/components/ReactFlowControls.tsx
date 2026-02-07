import { useReactFlow, useOnViewportChange } from '@xyflow/react';
import { useCallback, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const ReactFlowControls = () => {
  const { zoomIn, zoomOut, setViewport, getViewport } = useReactFlow();
  const [zoom, setZoom] = useState(100);

  useOnViewportChange({
    onChange: ({ zoom }) => {
      setZoom(Math.round((zoom / 2) * 100));
    },
  });

  const handleZoomIn = useCallback(() => {
    zoomIn();
  }, [zoomIn]);

  const handleZoomOut = useCallback(() => {
    zoomOut();
  }, [zoomOut]);

  const handleResetZoom = useCallback(() => {
    const { x, y } = getViewport();

    setViewport({ x, y, zoom: 1 }, { duration: 100 });
  }, [getViewport, setViewport]);

  return (
    <div>
      <div className="absolute bottom-6 right-6 z-50 flex items-center gap-2 rounded-md bg-[#f1f2f6] shadow-[0px_0px_10px_rgba(0,0,0,0.075)]">
        <button
          onClick={handleZoomOut}
          className="flex size-9 items-center justify-center rounded hover:bg-black/5"
          aria-label="Zoom out">
          <FaMinus />
        </button>

        <div
          onClick={handleResetZoom}
          className="relative cursor-pointer group">
          <div className="min-w-[48px] text-center text-xs font-medium">
            {zoom}%
          </div>

          <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
            Reset zoom
          </div>
        </div>

        <button
          onClick={handleZoomIn}
          className="flex size-9 items-center justify-center rounded hover:bg-black/5"
          aria-label="Zoom in">
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ReactFlowControls;
