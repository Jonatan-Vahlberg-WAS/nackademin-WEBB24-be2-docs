import { cn } from "../../utils/cn";
import FrostedGlassCard from "../_library/Card/TWFrostedGlassCard";
import T from "../_library/Ui/TWTypography";

const CourseOverviewHero = ({ title, tagline }) => {
  const heroClasses = cn(
    "text-white py-12 min-h-[50vh]",
    "flex flex-col items-center justify-center",
    "tw-animate-gradient-shift"
  );
  return (
    <>
      <div className={heroClasses}>
        <FrostedGlassCard blur="lg">
          <T.PageTitle>
            <T.FrostedGlassText>{title}</T.FrostedGlassText>
          </T.PageTitle>
          <T.Text className="text-xl font-bold">{tagline}</T.Text>
        </FrostedGlassCard>
      </div>
    </>
  );
};

export default CourseOverviewHero;
