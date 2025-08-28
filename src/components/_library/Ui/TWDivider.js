import { cn } from "../../../utils/cn";

const Divider = ({ className = "", shade = "light", style = {}, ...props }) => {
  const shades = ["lighter", "light", "dark", "darker"];

  const dividerClasses = cn(
    "border-t",
    {
      "border-gray-100": shade === "lighter",
      "border-gray-200": shade === "light" || !shades.includes(shade),
      "border-gray-300": shade === "dark",
      "border-gray-400": shade === "darker",
    },
    className
  );

  return <div className={dividerClasses} style={style} {...props} />;
};

export default Divider;
