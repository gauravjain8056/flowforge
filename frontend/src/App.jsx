import { useState, useCallback } from "react";
import ReactFlow, { Background, Controls, applyNodeChanges } from "reactflow";
import "reactflow/dist/style.css";

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

const initialEdges = [{ id: "e1-2", source: "1", target: "2", animated: true }];

export default function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  // --- NEW: The Save Function ---
  const saveWorkflow = async () => {
    try {
      // 1. Send the data to your Express backend
      const response = await fetch("http://localhost:5000/api/workflows", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "My First AI Workflow",
          nodes: nodes,
          edges: edges,
        }),
      });

      const data = await response.json();

      // 2. Give the user feedback
      if (data.success) {
        alert("✅ Workflow successfully saved to MongoDB Atlas!");
      } else {
        alert("❌ Failed to save workflow.");
      }
    } catch (error) {
      console.error("Error saving workflow:", error);
      alert("❌ Server error. Is your backend running?");
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* NEW: The Floating Save Button */}
      <div style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}>
        <button
          onClick={saveWorkflow}
          style={{
            padding: "12px 24px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
          }}
        >
          Save Workflow
        </button>
      </div>

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
