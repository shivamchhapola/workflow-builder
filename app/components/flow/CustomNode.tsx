import { Handle, Position } from '@xyflow/react';

export type CustomNodeData = {
  inputs?: string[];
  outputs?: string[];
  label?: string;
  width?: number;
  height?: number;
};

const CustomNode = ({ data }: { data: CustomNodeData }) => {
  const {
    inputs = ['in'],
    outputs = ['out'],
    label = 'Node',
    width = 100,
    height = 40,
  } = data;

  return (
    <div
      style={{ width: Math.max(width, 60), height: Math.max(height, 30) }}
      className="relative rounded-md border bg-white text-xs shadow px-2">
      {/* Inputs */}
      {inputs.map((input, i) => (
        <div
          key={input}
          className="absolute left-0 flex items-center gap-1"
          style={{
            top: `${((i + 1) / (inputs.length + 1)) * 100}%`,
            transform: 'translateY(-50%)',
          }}>
          <Handle
            type="target"
            position={Position.Left}
            id={`in-${i}`}
            style={{ left: 0 }}
          />

          <span className="ml-1.5 text-[0.5rem] text-gray-600 max-w-10 truncate">
            {input}
          </span>
        </div>
      ))}

      {/* Content */}
      <div className="flex h-full items-center justify-center font-medium">
        {label}
      </div>

      {/* Outputs */}
      {outputs.map((output, i) => (
        <div
          key={output}
          className="absolute right-0 flex items-center gap-1"
          style={{
            top: `${((i + 1) / (outputs.length + 1)) * 100}%`,
            transform: 'translateY(-50%)',
          }}>
          <span className="mr-1.5 text-[0.5rem] text-gray-600 max-w-10 truncate">
            {output}
          </span>

          <Handle
            type="source"
            position={Position.Right}
            id={`out-${i}`}
            style={{ right: 0 }}
          />
        </div>
      ))}
    </div>
  );
};

export default CustomNode;
