import { useRef, useState } from "react";
import Button from "./TWButton";
import { cn } from "@/utils/cn";

const ButtonDropdown = ({
  variant = "info",
  align = "left",
  Toggle = "",
  toggleProps,
  children,
  menuClassName,
  menuProps,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const dropdownMenuClasses = cn(
    "absolute top-full left-0 w-full z-10",
    "bg-white shadow-xl rounded-lg p-2 min-w-[200px] bottom-2",
    {
      "right-full translate-x-full": align === "left",
      "left-full -translate-x-full": align === "right",
      hidden: !isOpen,
      "w-fit h-fit gap-2 flex flex-col p-2": isOpen,
    },
    menuClassName
  );

  return (
    <div ref={wrapperRef}>
      <Button
        variant={variant}
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
        {...toggleProps}
      >
        {Toggle}
        <div className={dropdownMenuClasses}>{children}</div>
      </Button>
    </div>
  );
};

export default ButtonDropdown;
