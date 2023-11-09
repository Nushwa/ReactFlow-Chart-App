import React, { useCallback } from "react";
import ReactFlow, {
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";

import "reactflow/dist/style.css";

export default function Flowchart({ data }) {
  const initialEdges = [];

  const initialNodes = [
    {
      id: "grandparent",
      position: { x: 450, y: 50 },
      data: { label: data.name },
    },

    // first 5 matchday
    ...data.rounds.slice(0, 5).flatMap((matchday, matchdayIndex) => {
      const parentNode = {
        id: `parent-${matchdayIndex}`,
        position: { x: 200 * matchdayIndex, y: 150 },
        data: { label: matchday.name },
      };

      const grandparentEdge = {
        id: `edge-grandparent-${parentNode.id}`,
        source: "grandparent",
        target: parentNode.id,
      };

      initialEdges.push(grandparentEdge);

      const matchNodes = matchday.matches
        .slice(0, 3)
        .map((match, dateIndex) => ({
          id: `team-${matchdayIndex}-${dateIndex}`,
          position: {
            x: 200 * matchdayIndex,
            y: 250 + 100 * dateIndex,
          },
          data: { label: `${match.team1} vs ${match.team2}` },
        }));
      // console.log("mn", matchNodes);

      const teamEdges = matchNodes.map((matchNode) => ({
        id: `edge-${matchdayIndex}-${parentNode.id}-${matchNode.id}`,
        source: parentNode.id,
        target: matchNode.id,
      }));

      initialEdges.push(...teamEdges);

      return [parentNode, ...matchNodes];
    }),
  ];

  // console.log("Initial Nodes: ", initialNodes);
  // console.log("Initial Edges: ", initialEdges);

  const nodesArray = [...initialNodes];
  const edgesArray = [...initialEdges];

  const [nodes, setNodes, onNodesChange] = useNodesState(nodesArray);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesArray);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Controls />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
