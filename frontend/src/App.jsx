import { useState, useCallback } from "react";
import ReactFlow, { Background, Controls, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css"; // CRUCIAL: This makes it look like a real UI, not broken text

// 1. We define our starting boxes (Nodes)
const initialNodes = [
  {
    id: "1",
    position: { x: 250, y: 100 },
    data: { label: "Trigger: GitHub Issue" },
  },
  {
    id: "2",
    position: { x: 250, y: 250 },
    data: { label: "Action: Send Discord Message" },
  },
];

// 2. We define the line connecting them (Edges)
const initialEdges = [{ id: "e1-2", source: "1", target: "2", animated: true }];

export default function App() {
  // 3. We use standard React state to hold our nodes and edges
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // 4. This function updates the X/Y coordinates in state when you drag a node with your mouse
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        fitView
      >
        <Background variant="dots" gap={12} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
