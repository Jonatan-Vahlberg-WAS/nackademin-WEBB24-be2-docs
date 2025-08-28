import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import Card from "../Card/TWCard";
import { cn } from "../../../utils/cn";

const CollapsibleCard = ({ title, children, preview = true }) => {
  const [isOpen, setIsOpen] = useState(!preview);

  const headerClasses = cn(
    "w-[calc(100%+3rem)] mx-[-1.5rem] mt-[-1.5rem] flex justify-between border-none items-center px-4 py-3 bg-blue-500 text-white rounded-t-md",
    "hover:bg-blue-600 transition"
  );

  const contentClasses = cn(
    "tw-transition-all tw-duration-300 tw-overflow-hidden tw-relative",
    {
      "opacity-100": isOpen,
      "max-h-[150px] opacity-100": !isOpen && preview,
      "max-h-0 opacity-0": !preview,
    }
  );

  return (
    <Card className="overflow-hidden relative bg-ifm-background-color-tertiary rounded-t-md mb-6">
      <button className={headerClasses} onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-lg font-medium mb-0 text-white">{title}</h3>
        {isOpen ? (
          <FaChevronUp className="text-white" />
        ) : (
          <FaChevronDown className="text-white" />
        )}
      </button>
      <div
        className={contentClasses}
      >
        <div className="p-4">{children}</div>

        {!isOpen && preview && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-ifm-background-color-tertiary pointer-events-none" />
        )}
      </div>
    </Card>
  );
};

export default CollapsibleCard;
