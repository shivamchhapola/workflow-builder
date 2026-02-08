'use client';

import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback } from 'react';
import ReactFlowControls from './components/flow/ReactFlowControls';
import AddNode from './components/flow/AddNode';
import CustomNode, { CustomNodeData } from './components/flow/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

type CustomNodeType = {
  id: string;
  type: 'custom';
  position: { x: number; y: number };
  data: CustomNodeData;
};

const initialNodes: CustomNodeType[] = [
  {
    id: '1',
    type: 'custom',
    position: { x: 0, y: 0 },
    data: {
      label: 'Entry',
      inputs: [],
      outputs: ['Result', 'Error'],
      width: 100,
      height: 50,
    },
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Page() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  const addNode = useCallback(
    (data: CustomNodeData) => {
      setNodes((nds: CustomNodeType[]) => {
        const id = crypto.randomUUID();
        const offset = nds.length * 40;

        return [
          ...nds,
          {
            id,
            type: 'custom',
            position: { x: 100 + offset, y: 100 + offset },
            data: {
              label: data.label ?? `Node ${nds.length + 1}`,
              inputs: data.inputs ?? [],
              outputs: data.outputs ?? [],
              width: data.width ?? 100,
              height: data.height ?? 40,
            },
          },
        ];
      });
    },
    [setNodes]
  );

  return (
    <div className="relative h-screen w-screen">
      <ReactFlow
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        proOptions={{ hideAttribution: true }}>
        <Background />
        <ReactFlowControls />
      </ReactFlow>

      <AddNode addNode={addNode} />
    </div>
  );
}
