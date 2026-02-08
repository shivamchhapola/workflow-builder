type TooltipWrapperProps = {
  children: React.ReactNode;
  tooltip?: string;
};

const TooltipWrapper = ({ children, tooltip }: TooltipWrapperProps) => {
  return (
    <div className="relative cursor-pointer group">
      {children}

      {tooltip && (
        <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
          {tooltip}
        </div>
      )}
    </div>
  );
};

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
      {children}
    </div>
  );
};

TooltipWrapper.Tooltip = Tooltip;

export default TooltipWrapper;
