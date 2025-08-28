import { cn } from "@/utils/cn";

const LanguageContainer = ({
  children,
  isSelected,
  index,
  className,
  softHidden = false,
}) => {
  const languageContainerClasses = cn({
    "h-0 opacity-0 invisible hidden": !isSelected,
    block: !isSelected && softHidden,
    [`mt-${index * -23}px`]: !!index,
    className,
  });
  return <div className={languageContainerClasses}>{children}</div>;
};

export default LanguageContainer;
