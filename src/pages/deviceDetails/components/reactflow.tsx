import React, { useCallback } from 'react';
import ReactFlow, { Background, Connection, Edge, MarkerType, MiniMap, Position, addEdge, useEdgesState, useNodesState } from 'reactflow';
import 'reactflow/dist/style.css';


const initialNodes: any = [
  {
    id: '1',
    type: 'input',
    data: {
      label: '工控机',
    },
    position: { x: 250, y: 50 },
  },
  {
    id: '2',
    data: {
      label: '监测设备',
    },
    position: { x: 100, y: 140 },
  },
  {
    id: '3',
    data: {
      label: '测向设备',
    },
    position: { x: 400, y: 140 },
  },
  {
    id: '4',
    data: {
      label: '环控设备',
    },
    position: { x: 600, y: 140 },
  },
  {
    id: '5',
    type: 'output',
    data: {
      label: '监测天线1',
    },
    position: { x: 20, y: 340 },
  },
  {
    id: '6',
    type: 'output',
    data: {
      label: '监测天线2',
    },
    position: { x: 200, y: 340 },
  },
  {
    id: '7',
    type: 'output',
    data: {
      label: '监测天线3',
    },
    position: { x: 450, y: 340 },
  },
  {
    id: '8',
    type: 'output',
    data: {
      label: '监测天线4',
    },
    position: { x: 650, y: 340 },
  },
];
const initialEdges = [{ id: 'e1-1', source: '1', target: '2' },
{ id: 'e1-2', source: '1', target: '3', animated: true },
{ id: 'e1-3', source: '1', target: '4' },
{ id: 'e1-4', source: '2', target: '5' },
{ id: 'e1-5', source: '2', target: '6' },
{ id: 'e1-6', source: '3', target: '7', animated: true },
{ id: 'e1-7', source: '4', target: '8', animated: true },
];
const IReactflow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      attributionPosition="top-right">
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
}


export default IReactflow