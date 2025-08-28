import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const CollapsibleSection = ({ title, children, preview = true }) => {
  const [isOpen, setIsOpen] = useState(!preview);

  return (
    <div className="w-full rounded-xl bg-white shadow-md overflow-hidden mb-8">
      {/* Header */}
      <button
        className="w-full flex justify-between border-none items-center px-4 py-3 bg-blue-500 text-white hover:bg-blue-600 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium mb-0">{title}</h3>
        {isOpen ? <FaChevronUp className="text-white" /> : <FaChevronDown className="text-white" />}
      </button>

      {/* Content */}
      <div
        className={`transition-all duration-300 ${
          isOpen
            ? "max-h-[2000px] opacity-100"
            : preview
            ? "max-h-[150px] opacity-100"
            : "max-h-0 opacity-0"
        } relative overflow-hidden`}
      >
        <div className="p-4">{children}</div>

        {/* Fade-out effect for preview mode */}
        {!isOpen && preview && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white pointer-events-none" />
        )}
      </div>
    </div>
  );
};

export default CollapsibleSection;
