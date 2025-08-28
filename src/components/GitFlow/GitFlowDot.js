import React from "react";
import PropTypes from "prop-types";
import { cn } from "../../utils/cn";

const GitFlowDot = ({
  branch,
  commit,
  commands,
  isHovered,
  onHover,
  branches,
  color,
}) => {
  return (
    <div
      className={cn(
        "absolute w-6 h-6 rounded-full border-3 border-white shadow-lg transition-all duration-300",
        isHovered && "scale-125"
      )}
      style={{
        backgroundColor: color,
      }}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      title={`${commit}\n${commands.join("\n")}`}
    />
  );
};

GitFlowDot.propTypes = {
  branch: PropTypes.string.isRequired,
  commit: PropTypes.string.isRequired,
  commands: PropTypes.arrayOf(PropTypes.string).isRequired,
  isHovered: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired,
  branches: PropTypes.objectOf(
    PropTypes.shape({
      branch: PropTypes.string.isRequired,
      offset: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default GitFlowDot;
