'use client';

import { useState } from 'react';
import { FiPlus, FiChevronDown } from 'react-icons/fi';
import { CustomNodeData } from './CustomNode';

type AddNodeProps = {
  addNode: (data: CustomNodeData) => void;
};

const AddNode = ({ addNode }: AddNodeProps) => {
  const [open, setOpen] = useState(true);

  const [label, setLabel] = useState('');
  const [inputs, setInputs] = useState('');
  const [outputs, setOutputs] = useState('');
  const [width, setWidth] = useState('100');
  const [height, setHeight] = useState('40');

  const handleAdd = () => {
    addNode({
      label: label || 'Node',
      inputs: inputs
        ? inputs
            .split(',')
            .map((i) => i.trim())
            .filter(Boolean)
        : undefined,
      outputs: outputs
        ? outputs
            .split(',')
            .map((o) => o.trim())
            .filter(Boolean)
        : undefined,
      width: width ? Number(width) : undefined,
      height: height ? Number(height) : undefined,
    });

    setLabel('');
    setInputs('');
    setOutputs('');
    setWidth('');
    setHeight('');
  };

  return (
    <div className="absolute top-4 left-4 w-64 rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
        <span className="flex items-center gap-2">
          <FiPlus className="text-gray-500" />
          Add Node
        </span>

        <FiChevronDown
          className={`text-gray-500 transition ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Body */}
      {open && (
        <div className="space-y-3 border-t border-gray-100 p-3 text-sm relative">
          <Field label="Label">
            <Input value={label} onChange={setLabel} placeholder="Node name" />
          </Field>

          <Field label="Inputs">
            <Input value={inputs} onChange={setInputs} placeholder="A, B, C" />
          </Field>

          <Field label="Outputs">
            <Input
              value={outputs}
              onChange={setOutputs}
              placeholder="Result, Error"
            />
          </Field>

          <div className="flex gap-2">
            <Field label="Width" className="flex-1 max-w-[6.875rem]">
              <Input
                type="number"
                value={width}
                onChange={setWidth}
                placeholder="160"
                min={60}
                max={600}
              />
            </Field>

            <Field label="Height" className="flex-1 max-w-[7rem]">
              <Input
                type="number"
                value={height}
                onChange={setHeight}
                placeholder="60"
                min={30}
                max={500}
              />
            </Field>
          </div>

          <button
            onClick={handleAdd}
            className="
    mt-2 flex w-full items-center justify-center gap-2
    rounded-md
    border border-[color:var(--primary-border)]
    bg-[color:var(--primary)]
    px-3 py-2
    text-sm text-white
    hover:bg-[color:var(--primary-hover)]
    focus:outline-none
  ">
            <FiPlus size={14} />
            Add
          </button>
        </div>
      )}
    </div>
  );
};

export default AddNode;

const Field = ({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label className="text-xs text-gray-500">{label}</label>
    {children}
  </div>
);

const Input = ({
  value,
  onChange,
  placeholder,
  type = 'text',
  min = 0,
  max = 1000,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  min?: number;
  max?: number;
}) => {
  const handleBlur = () => {
    if (type !== 'number') return;

    const num = Number(value);
    if (Number.isNaN(num)) return;

    const clamped = Math.min(max, Math.max(min, num));
    onChange(String(clamped));
  };

  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={handleBlur}
      placeholder={placeholder}
      min={min}
      max={max}
      className="flex-1 rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-400 focus:outline-none"
    />
  );
};
