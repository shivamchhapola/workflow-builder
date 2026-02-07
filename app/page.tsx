'use client';

import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  type Connection,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useCallback } from 'react';
import ReactFlowControls from './components/ReactFlowControls';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
  { id: '2', position: { x: 200, y: 100 }, data: { label: 'Node 2' } },
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
          position: { x: 100 + offset, y: 100 + offset },
          data: { label: `Node ${nds.length + 1}` },
        },
      ];
    });
  }, [setNodes]);

  return (
    <div className="relative h-screen w-screen">
      <ReactFlow
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

      <button
        onClick={addNode}
        className="absolute top-4 left-4 rounded bg-blue-500 px-4 py-2 text-white cursor-pointer">
        Add Node
      </button>
    </div>
  );
}
