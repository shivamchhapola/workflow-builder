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
import CustomNode from './components/flow/CustomNode';

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes = [
  {
    id: '1',
    type: 'custom',
    position: { x: 100, y: 100 },
    data: {
      label: 'Processor',
      inputs: 3,
      outputs: 2,
      width: 200,
      height: 100,
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

  const addNode = useCallback(() => {
    setNodes((nds) => {
      const id = crypto.randomUUID();
      const offset = nds.length * 40;

      return [
        ...nds,
        {
          id,
          type: 'custom',
          position: { x: 100 + offset, y: 100 + offset },
          data: {
            label: `Node ${nds.length + 1}`,
            inputs: 2,
            outputs: 2,
            width: 160,
            height: 80,
          },
        },
      ];
    });
  }, [setNodes]);

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
