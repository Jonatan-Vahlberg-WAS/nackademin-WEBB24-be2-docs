import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import GitFlowCommit from "./GitFlowCommit";
import GitFlowGrid from "./GitFlowGrid";
import GitFlowLine from "./GitFlowLine";
import { cn } from "../../utils/cn";

const defaultBranches = {
  main: {
    branch: "main",
    offset: 0,
    color: "blue",
  },
};

const defaultWorkflow = [
  {
    branch: "main",
    commit: "Initial commit",
    commands: [],
    offset: 0,
    index: 0,
    from: undefined,
    mergeFrom: undefined,
    isMerge: false,
  },
];

export const getBranchColor = (color) => {
  if (color === "blue") return "#3b82f6";
  if (color === "red") return "#ef4444";
  if (color === "yellow") return "#f59e0b";
  if (color === "green") return "#22c55e";
  if (color === "purple") return "#8b5cf6";
  if (color === "orange") return "#f97316";
  if (color === "pink") return "#ec4899";
  if (color === "brown") return "#a855f7";
  if (color === "gray") return "#6b7280";
  if (color === "black") return "#000000";
  if (color === "white") return "#ffffff";
  return "#3b82f6";
};

const GitFlow = ({ branches = defaultBranches, workflow = defaultWorkflow, offset = 100 }) => {
  const containerRef = useRef(null);
  const [hoveredCommit, setHoveredCommit] = useState(null);

  const getBranchData = (branchName) => {
    return branches[branchName] || branches.main;
  };

  const getBranchOffset = (branchName) => {
    const branch = getBranchData(branchName);
    return branch.offset;
  };

  const renderLines = () => {
    return workflow.map((item, index) => {
      if (typeof item.from === "undefined") return null;

      const fromItem = workflow[item.from];
      const fromX = 150 + getBranchOffset(fromItem.branch) * offset;
      const fromY = 100 + fromItem.index * 80;
      const toX = 150 + getBranchOffset(item.branch) * offset;
      const toY = 100 + item.index * 80;

      return (
        <GitFlowLine
          key={`line-${index}`}
          fromX={fromX}
          fromY={fromY}
          toX={toX}
          toY={toY}
          branch={item.branch}
          branches={branches}
        />
      );
    });
  };

  const renderMergeLines = () => {
    return workflow.map((item, index) => {
      if (typeof item.mergeFrom === "undefined") return null;

      const fromItem = workflow[item.mergeFrom];
      const fromX = 150 + getBranchOffset(fromItem.branch) * offset;
      const fromY = 100 + fromItem.index * 80;
      const toX = 150 + getBranchOffset(item.branch) * offset;
      const toY = 100 + item.index * 80;
      const color = getBranchData(item.branch).color;

      return (
        <GitFlowLine
          key={`merge-${index}`}
          fromX={fromX}
          fromY={fromY}
          toX={toX}
          toY={toY}
          branch={fromItem.branch}
          branches={branches}
          isMerge={true}
          color={color}
        />
      );
    });
  };

  const containerClasses = cn(
    "relative w-full min-h-[600px] bg-gray-900 rounded-xl shadow-lg overflow-hidden",
  )
  const containerStyle = {
    height: `${workflow.length * 95}px`,
  }

  return (
    <div className="relative min-w-[700px] my-8 font-mono">
      <div
        ref={containerRef}
        className={containerClasses}
        style={containerStyle}
      >
        <GitFlowGrid workflow={workflow} />
        {renderLines()}
        {renderMergeLines()}
        {workflow.map((item, index) => (
          <GitFlowCommit
            key={index}
            item={item}
            index={index}
            isHovered={hoveredCommit === index}
            onHover={(isHovered) => setHoveredCommit(isHovered ? index : null)}
            branches={branches}
            offset={offset}
          />
        ))}
      </div>
    </div>
  );
};

GitFlow.propTypes = {
  branches: PropTypes.objectOf(
    PropTypes.shape({
      branch: PropTypes.string.isRequired,
      offset: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  workflow: PropTypes.arrayOf(
    PropTypes.shape({
      branch: PropTypes.string.isRequired,
      commit: PropTypes.string.isRequired,
      commands: PropTypes.arrayOf(PropTypes.string).isRequired,
      index: PropTypes.number.isRequired,
      from: PropTypes.number,
      mergeFrom: PropTypes.number,
    })
  ).isRequired,
};

export default GitFlow;
