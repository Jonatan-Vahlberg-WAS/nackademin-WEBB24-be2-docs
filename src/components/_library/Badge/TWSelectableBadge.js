import Badge, { badgeProps } from "./TWBadge";
import { cn } from "../../../utils/cn";

const selectableBadgeProps = {
  ...badgeProps,
  isSelected: false,
  iconPlacedInFront: false,
  selectedVariant: "info",
  unselectedVariant: "default",
  onClick: () => {},
};

const SelectableBadge = (_props = selectableBadgeProps) => {
  const {
    isSelected,
    iconPlacedInFront,
    selectedVariant,
    unselectedVariant,
    onClick,
    children,
    ...props
  } = {
    ...selectableBadgeProps,
    ..._props,
  };

  const badgeClasses = cn(
    "cursor-pointer",
    "hover:!filter hover:!brightness-95"
  );

  const iconClasses = cn("text-xs tw-line-9 leading-none", {
    "fas fa-minus": isSelected,
    "fas fa-plus": !isSelected,
    "ml-1": iconPlacedInFront,
    "mr-1": !iconPlacedInFront,
  });

  return (
    <Badge
      role="button"
      {...props}
      className={badgeClasses}
      variant={isSelected ? selectedVariant : unselectedVariant}
      border={isSelected && props.border !== "none" ? props.border : "none"}
      onClick={onClick}
    >
      {!iconPlacedInFront && <i className={iconClasses} />}
      {children}
      {iconPlacedInFront && <i className={iconClasses} />}
    </Badge>
  );
};

export default SelectableBadge;
