import React from "react";
import { getBranchColor } from ".";


const GitFlowLine = ({
  fromX,
  fromY,
  toX,
  toY,
  branch,
  isMerge = false,
  branches,
}) => {
  const branchData = branches[branch] || branches.main;
  const color = branchData.color || "blue";
  const strokeColor = getBranchColor(color);

  return (
    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
      <line
        x1={fromX}
        y1={fromY}
        x2={toX}
        y2={toY}
        stroke={strokeColor}
        strokeWidth="4"
        strokeOpacity="0.3"
        strokeDasharray={isMerge ? "8,8" : "none"}
        className="transition-all duration-300"
      />
    </svg>
  );
};

export default GitFlowLine;
