import React from "react";
import { getBezierPath } from "reactflow";

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
}) => {
  // Calculate edge path using built-in utility
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Calculate center coordinates manually
  const labelX = (sourceX + targetX) / 2;
  const labelY = (sourceY + targetY) / 2;

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <text
        x={labelX}
        y={labelY - 10} // 10px above edge center
        textAnchor="middle"
        style={{
          fontSize: 12,
          fill: "#343a40",
          fontWeight: "bold",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        {label}
      </text>
    </>
  );
};

export default CustomEdge;
