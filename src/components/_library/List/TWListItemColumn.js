import { useMedia } from "react-use";
import { cn } from "../../../utils/cn";
import { cloneElement } from "react";

const ListItemColumn = ({
  query = "",
  children,
  className = "",
  style = {},
  align = "left",
  useWrapper = false,
  shouldTruncate = false,
  title = "",
}) => {
  const shouldNotRender = useMedia(`(${query})`);

  const columnClasses = cn(
    {
      "justify-self-end text-end text-right": align === "right",
      "justify-self-center text-center": align === "center",
      "text-ellipsis overflow-hidden whitespace-nowrap": shouldTruncate,
    },
    className
  );
  if (useWrapper || !children || typeof children === "string") {
    return shouldNotRender && query ? null : (
      <div className={columnClasses} style={style}>
        {children}
      </div>
    );
  }

  const clonedChildren = cloneElement(children, {
    className: cn(children.props?.className || "", columnClasses),
    title,
  });

  return shouldNotRender && query ? null : clonedChildren;
};

export default ListItemColumn;
