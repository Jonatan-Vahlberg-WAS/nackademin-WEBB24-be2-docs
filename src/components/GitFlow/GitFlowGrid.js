import React from "react";

const GitFlowGrid = ({ workflow }) => {
  return (
    <div className="absolute inset-0">
      {[...Array(workflow.length)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-px bg-white/5"
          style={{ top: `${100 + i * 80}px` }}
        />
      ))}
    </div>
  );
};

export default GitFlowGrid;
