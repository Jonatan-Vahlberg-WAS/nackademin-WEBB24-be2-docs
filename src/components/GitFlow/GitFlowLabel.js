import React from "react";
import { cn } from "../../utils/cn";

const GitFlowLabel = ({ text, type = "branch", color = "white" }) => {
  return (
    <div
      className="absolute left-8 bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-md shadow-lg"
      style={{ top: type === "branch" ? "-20px" : "4px" }}
    >
      <span
        className={cn(
          "text-sm font-mono",
        )}
        style={{
          color: color,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export default GitFlowLabel;
