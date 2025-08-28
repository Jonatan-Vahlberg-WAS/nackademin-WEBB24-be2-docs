import { cn } from "../../../utils/cn";
import Card from "../Card/TWCard";

const Dialog = ({ 
    open = false, 
    toggle = () => {}, 
    size = "md",
    children, 
    ...props
}) => {
  const dialogClasses = cn("fixed inset-0 z-50 overflow-y-auto", {
    "opacity-0 pointer-events-none": !open,
    "opacity-100": open,
  });

  const backdropClasses = cn(
    "fixed inset-0 bg-black/50 transition-opacity duration-300 cursor-pointer",
    {
      "opacity-0 pointer-events-none": !open,
      "opacity-100": open,
    }
  );

  const contentClasses = cn("relative transform transition-all duration-300 cursor-default max-h-[60vh] overflow-y-auto", {
    "scale-95 opacity-0": !open,
    "scale-100 opacity-100": open,
    [`w-${size}`]: size !== "md",
  });

  return (
    <div
      className={dialogClasses}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className={backdropClasses} onClick={toggle} aria-hidden="true" />
        <div className={contentClasses} onClick={(e) => e.stopPropagation()}>
          <Card className="w-full mx-auto bg-ifm-background-color">{children}</Card>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
