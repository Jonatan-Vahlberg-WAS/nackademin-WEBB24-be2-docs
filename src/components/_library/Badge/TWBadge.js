import { cn } from "../../../utils/cn";

export const badgeProps = {
  variant: "info",
  shade: "normal",
  size: "xs",
  border: "none",
  className: "",
  children: "",
  background: "",
  hoverable: false,
};

const Badge = (_props = badgeProps) => {
  const {
    variant,
    shade,
    size,
    border,
    className,
    wrapperClassName,
    children,
    background,
    hoverable,
    ...props
  } = {
    ...badgeProps,
    ..._props,
  };
  const badgeClasses = cn(
    "px-2.5 py-1 rounded-full font-medium leading-none box-border",
    {
      "bg-gray-200 text-gray-900": variant === "default",
      "bg-blue-400 text-white": variant === "info",
      "bg-yellow-300 text-yellow-900": variant === "warning",
      "bg-green-600 text-white": variant === "success",
      "bg-red-200 text-red-900": variant === "danger",
      "text-xs px-3 py-1": size === "xs",
      "text-sm px-4 py-2": size === "sm",
      "bg-gray-50 text-gray-700": shade === "light" && variant === "default",
      "bg-gray-100 text-gray-700":
        background === "gray" && shade === "light" && variant === "default",
      "bg-blue-100 text-blue-700": shade === "light" && variant === "info",
      "bg-yellow-100 text-yellow-700":
        shade === "light" && variant === "warning",
      "bg-green-50 text-green-700": shade === "light" && variant === "success",
      "bg-red-50 text-red-700": shade === "light" && variant === "danger",
      border: border !== "none",
      "border-gray-400": border && variant === "default",
      "border-blue-400": border && variant === "info",
      "border-yellow-300": border && variant === "warning",
      "border-green-600": border && variant === "success",
      "border-red-200": border && variant === "danger",
      "border-gray-400/25": border === "thin",
      "border-blue-400/25": border === "thin" && variant === "info",
      "border-yellow-300/25": border === "thin" && variant === "warning",
      "border-green-600/25": border === "thin" && variant === "success",
      "border-red-200/25": border === "thin" && variant === "danger",
      "cursor-pointer transition-all duration-300": hoverable,
      "hover:bg-gray-300": hoverable && variant === "default",
      "hover:bg-blue-300": hoverable && variant === "info",
      "hover:bg-yellow-300": hoverable && variant === "warning",
      "hover:bg-green-300": hoverable && variant === "success",
      "hover:bg-red-300": hoverable && variant === "danger",
    },
    className || ""
  );

  const badgeWrapperClasses = cn({
    "h-6.5": size === "xs",
    "h-9.5": size === "sm",
  }, wrapperClassName || "");

  return (
    <div className={badgeWrapperClasses}>
      <span pill color="primary" className={badgeClasses} {...props}>
        {children}
      </span>
    </div>
  );
};

export default Badge;
