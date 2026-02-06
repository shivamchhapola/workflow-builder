'use client';

import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  {
    id: '1',
    position: { x: 0, y: 0 },
    data: { label: 'Node 1' },
  },
  {
    id: '2',
    position: { x: 200, y: 100 },
    data: { label: 'Node 2' },
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

export default function Page() {
  return (
    <div className="h-screen w-screen">
      <ReactFlow nodes={initialNodes} edges={initialEdges} fitView>
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </div>
  );
}
