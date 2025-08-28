import { cn } from "../../../utils/cn";

const FrostedGlassCard = ({
  shadowed = true,
  modal = false,
  size = "md",
  children,
  className,
  blur = "md",
  ...props
}) => {
  const cardClasses = cn(
    "relative",
    "bg-gradient-to-br from-white/0 to-white/0",
    "backdrop-blur-md",
    "rounded-[8px]",
    "border border-white/30",
    "shadow-[0_8px_32px_0_rgba(31,38,135,0.15)]",
    "before:absolute before:inset-0",
    "before:bg-gradient-to-br before:from-white/20 before:to-transparent",
    "before:rounded-[8px]",
    "before:pointer-events-none",
    {
      "mb-0": modal,
      "mb-4": !modal,
      "shadow-custom": shadowed,
      "p-6": size === "md",
      "p-4": size === "sm",
      "p-2": size === "xs",
      "backdrop-blur-sm": blur === "sm",
      "backdrop-blur-md": blur === "md",
      "backdrop-blur-lg": blur === "lg",
    },
    className
  );
  return (
    <div shadowed={shadowed} className={cardClasses} {...props}>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default FrostedGlassCard;
