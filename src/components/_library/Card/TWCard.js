import { cn } from "../../../utils/cn";

const Card = ({
  shadowed = true,
  modal = false,
  size = "md",
  children,
  className,
  ...props
}) => {
  const cardClasses = cn(
    "bg-white",
    "rounded-[4px]",
    "p-6",
    {
      "mb-0": modal,
      "mb-4": !modal,
      "shadow-custom": shadowed,
      "p-6": size === "md",
      "p-4": size === "sm",
      "p-2": size === "xs",
    },
    className
  );
  return (
    <div shadowed={shadowed} className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
