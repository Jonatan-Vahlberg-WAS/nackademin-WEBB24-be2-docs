import { cn } from "../../../utils/cn";
import T from "../Ui/TWTypography";

const Banner = ({
  variant = "default",
  title = "",
  subtitle = "",
  children,
  icon,
  ...props
}) => {
  icon = icon || getIcon(icon, variant);

  const bannerClasses = cn(
    "flex items-center justify-between mb-4 border-2 rounded-md py-2 px-4",
    "bg-gray-100 border-gray-300",
    {
      "bg-yellow-100 border-yellow-300": variant === "warning",
      "bg-green-50 border-green-300": variant === "success",
      "bg-blue-100 border-blue-300": variant === "info",
      "bg-red-100 border-red-300": variant === "danger",
    }
  );

  const contentClasses = cn("flex items-center mr-2");
  const iconWrapperClasses = cn(
    "flex items-center justify-center p-2 w-9 h-9 rounded-full mr-2",
    "bg-gray-500",
    {
      "bg-yellow-500": variant === "warning",
      "bg-green-600": variant === "success",
      "bg-blue-500": variant === "info",
      "bg-red-500": variant === "danger",
    }
  );
  const iconClasses = cn("text-white text-lg tw-line-9", icon);
  const titleClasses = cn("text-gray-700 text-sm mb-1", {
    "text-yellow-700": variant === "warning",
    "text-green-700": variant === "success",
    "text-blue-900": variant === "info",
    "text-red-700": variant === "danger",
  });
  const subtitleClasses = cn("text-sm mb-0", {
    "text-yellow-700": variant === "warning",
    "text-green-900": variant === "success",
    "text-blue-700": variant === "info",
    "text-red-700": variant === "danger",
  });

  return (
    <div className={bannerClasses} {...props}>
      <div className={contentClasses}>
        <div>
          <div className={iconWrapperClasses}>
            <i className={iconClasses}></i>
          </div>
        </div>
        <div>
          <T.Title className={titleClasses}>{title}</T.Title>
          <T.Text className={subtitleClasses}>{subtitle}</T.Text>
        </div>
      </div>
      {children}
    </div>
  );
};

const getIcon = (icon, variant) => {
  if (icon) return icon;
  switch (variant) {
    case "warning":
      return "fas fa-warning";
    case "success":
      return "fas fa-check";
    case "info":
      return "fas fa-info";
    case "danger":
      return "fas fa-exclamation-triangle";
    default:
      return "fas fa-warning";
  }
};

export default Banner;
