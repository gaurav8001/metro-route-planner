import React, { useMemo } from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

const MetroGraph = ({ stations, graph, highlightedPath }) => {
  const nodes = useMemo(() => {
    return stations.map((station, index) => ({
      id: station.id.toString(),
      data: { label: station.name },
      position: { x: 220 * (index % 4), y: 150 * Math.floor(index / 4) },
      style: {
        width: 140,
        background: highlightedPath.includes(station.id) ? "#1e3a8a" : "#f8fafc",
        color: highlightedPath.includes(station.id) ? "#f8fafc" : "#1e293b",
        border: "2px solid #64748b",
        borderRadius: 10,
        padding: 10,
        fontWeight: "bold",
        boxShadow: "0 4px 12px rgba(30,58,138,0.3)",
        textAlign: "center",
        fontSize: 14,
      },
    }));
  }, [stations, highlightedPath]);

  const edges = useMemo(() => {
    const edgeSet = new Set();
    const generatedEdges = [];

    for (let from = 0; from < graph.length; from++) {
      for (const edge of graph[from]) {
        const id = `${from}-${edge.destination}`;
        if (!edgeSet.has(id)) {
          edgeSet.add(id);
          generatedEdges.push({
            id,
            source: from.toString(),
            target: edge.destination.toString(),
            animated: highlightedPath.includes(from) && highlightedPath.includes(edge.destination),
            style: {
              stroke: highlightedPath.includes(from) && highlightedPath.includes(edge.destination)
                ? "#1e3a8a"
                : "#64748b",
              strokeWidth: 2,
            },
            label: `Cost: ${edge.cost}`,
            labelBgPadding: [6, 3],
            labelBgBorderRadius: 4,
            labelBgStyle: { fill: "#f8fafc", color: "#1e293b" },
            labelStyle: { fontWeight: "600", fontSize: 12, fill: "#1e293b" },
          });
        }
      }
    }
    return generatedEdges;
  }, [graph, highlightedPath]);

  return (
    <div
      style={{
        width: "100%",
        height: "600px",
        background: "#f0f2f5",
        borderRadius: 10,
        padding: 10,
        boxSizing: "border-box",
        boxShadow: "0 6px 20px rgba(100, 116, 139, 0.1)",
      }}
    >
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <MiniMap
          nodeStrokeColor="#1e3a8a"
          nodeColor="#94a3b8"
          nodeBorderRadius={4}
        />
        <Controls />
        <Background color="#cbd5e1" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default MetroGraph;
