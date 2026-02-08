import { useReactFlow, useOnViewportChange } from '@xyflow/react';
import { useCallback, useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { MdFitScreen } from 'react-icons/md';
import TooltipWrapper from '../ui/TooltipWrapper';

const ReactFlowControls = () => {
  const { zoomIn, zoomOut, setViewport, getViewport, fitView } = useReactFlow();
  const [zoom, setZoom] = useState(100);

  useOnViewportChange({
    onChange: ({ zoom }) => {
      const percent = Math.round((zoom / 2) * 100);
      setZoom(Math.min(200, Math.max(25, percent)));
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

    setViewport({ x, y, zoom: 2 }, { duration: 150 });
  }, [getViewport, setViewport]);

  const handleFitToScreen = useCallback(() => {
    fitView({ padding: 0.1, duration: 150 });
  }, [fitView]);

  return (
    <div className="absolute bottom-6 right-6 z-50 flex gap-4">
      <div className="flex items-center gap-2 rounded-md bg-[#f1f2f6] shadow-[0px_0px_10px_rgba(0,0,0,0.075)]">
        <TooltipWrapper tooltip="Zoom Out">
          <button
            onClick={handleZoomOut}
            className="flex size-9 items-center justify-center rounded hover:bg-black/5"
            aria-label="Zoom out">
            <FaMinus />
          </button>
        </TooltipWrapper>

        <TooltipWrapper tooltip="Reset Zoom">
          <button
            className="flex size-9 items-center justify-center rounded hover:bg-black/5 text-xs font-medium"
            aria-label="Reset Zoom"
            onClick={handleResetZoom}>
            {zoom}%
          </button>
        </TooltipWrapper>

        <TooltipWrapper tooltip="Zoom In">
          <button
            onClick={handleZoomIn}
            className="flex size-9 items-center justify-center rounded hover:bg-black/5"
            aria-label="Zoom in">
            <FaPlus />
          </button>
        </TooltipWrapper>
      </div>

      <div className="flex items-center justify-center rounded-md bg-[#f1f2f6] shadow-[0px_0px_10px_rgba(0,0,0,0.075)]">
        <TooltipWrapper tooltip="Fit to Screen">
          <button
            onClick={handleFitToScreen}
            className="flex size-9 items-center justify-center rounded hover:bg-black/5"
            aria-label="Fit to Screen">
            <MdFitScreen />
          </button>
        </TooltipWrapper>
      </div>

      <div className="flex items-center justify-center rounded-md bg-[#f1f2f6] shadow-[0px_0px_10px_rgba(0,0,0,0.075)]">
        <TooltipWrapper tooltip="Fit to Screen">
          <button
            onClick={handleFitToScreen}
            className="flex size-9 items-center justify-center rounded hover:bg-black/5"
            aria-label="Fit to Screen">
            <MdFitScreen />
          </button>
        </TooltipWrapper>
      </div>
    </div>
  );
};

export default ReactFlowControls;
