import React, { useState, useEffect } from "react";
import { Tooltip as TooltipStrap } from "reactstrap";
import { cn } from "../../../utils/cn";

const IconTooltip = ({
  icon = "fa fa-info-circle",
  variant = "default",
  classname = "",
  message = "",
  tooltipProps = {},
  ...props
}) => {
  const [tooltipId, setTooltipId] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setTooltipId(`TOOLTIP_ID_${Math.floor(Math.random() * 1000)}`);
  }, []);

  const iconClasses = cn(
    "cursor-pointer transition duration-300 ease-in-out text-sm",
    {
      "text-red-500 hover:!text-red-700": variant === "danger",
      "text-blue-500 hover:!text-blue-700": variant === "info",
      "text-yellow-500 hover:!text-yellow-700": variant === "warning",
      "text-green-600 hover:!text-green-800": variant === "success",
      "text-gray-500 hover:!text-gray-700":
        variant !== "danger" &&
        variant !== "info" &&
        variant !== "warning" &&
        variant !== "success",
    },
    icon,
    classname
  );

  if (!tooltipId) return null;
  return (
    <>
      <i id={tooltipId} className={iconClasses}></i>
      <TooltipStrap
        className="custom-tooltip__popover"
        placement="right"
        isOpen={isOpen}
        toggle={toggle}
        target={tooltipId}
        {...tooltipProps}
      >
        {message}
      </TooltipStrap>
    </>
  );
};

export default IconTooltip;
