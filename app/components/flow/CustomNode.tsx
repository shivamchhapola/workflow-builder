import { Handle, Position } from '@xyflow/react';

type CustomNodeData = {
  inputs?: number;
  outputs?: number;
  label?: string;
  width?: number;
  height?: number;
};

const CustomNode = ({ data }: { data: CustomNodeData }) => {
  const {
    inputs = 1,
    outputs = 1,
    label = 'Node',
    width = 160,
    height = 80,
  } = data;

  return (
    <div
      style={{ width, height }}
      className="rounded-md border bg-white text-xs shadow">
      {/* Inputs */}
      {Array.from({ length: inputs }).map((_, i) => (
        <Handle
          key={`in-${i}`}
          type="target"
          position={Position.Left}
          id={`in-${i}`}
          style={{
            top: `${((i + 1) / (inputs + 1)) * 100}%`,
          }}
        />
      ))}

      {/* Content */}
      <div className="flex h-full items-center justify-center font-medium">
        {label}
      </div>

      {/* Outputs */}
      {Array.from({ length: outputs }).map((_, i) => (
        <Handle
          key={`out-${i}`}
          type="source"
          position={Position.Right}
          id={`out-${i}`}
          style={{
            top: `${((i + 1) / (outputs + 1)) * 100}%`,
          }}
        />
      ))}
    </div>
  );
};

export default CustomNode;
