import { cn } from "../../../utils/cn";

const ButtonSpinner = ({ noPadding }) => (
  <i
    className="fa fa-spinner fa-spin"
    style={{ padding: noPadding ? 0 : "0 16px" }}
  />
);

const Button = ({
  variant = "default",
  outline = false,
  size,
  loading = false,
  noPadding,
  aspect,
  className = "",
  children,
  ...props
}) => {
  const buttonClasses = cn(
    "tw-button h-10",
    {
      "tw-button-warning": variant === "warning",
      "tw-button-danger": variant === "danger",
      "tw-button-success": variant === "success",
      "tw-button-info": variant === "info",
      "tw-button": variant === "success",
      "tw-button-sm h-8": size === "sm",
      "tw-button-xs h-6": size === "xs",
      "tw-button-outline": outline,
      "aspect-square": aspect === "square",
    },
    className
  );

  return (
    <button className={buttonClasses} {...props}>
      {loading ? <ButtonSpinner noPadding={noPadding} /> : children}
    </button>
  );
};

export default Button;
