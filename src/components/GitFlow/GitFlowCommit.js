import React from "react";
import GitFlowDot from "./GitFlowDot";
import GitFlowLabel from "./GitFlowLabel";
import { getBranchColor } from ".";

const getBranchData = (branchName, branches) => {
  return branches[branchName] || branches.main;
};



const GitFlowCommit = ({ item, index, isHovered, onHover, branches, offset = 100 }) => {
  const branchData = getBranchData(item.branch, branches);
  const x = 138 + branchData.offset * offset;
  const y = 88 + index * 80;
  const color = getBranchColor(branchData.color);
  console.log(color);

  return (
    <div className="relative" style={{ left: `${x}px`, top: `${y}px` }}>
      <GitFlowDot
        branch={item.branch}
        commit={item.commit}
        commands={item.commands}
        isHovered={isHovered}
        onHover={onHover}
        branches={branches}
        color={color}
      />
      <GitFlowLabel text={item.branch} type="branch" />
      <GitFlowLabel text={item.commit} type="commit" color={color} />
    </div>
  );
};

export default GitFlowCommit;
