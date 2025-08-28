import { useEffect, useState } from "react";
import moment from "moment";
import { cn } from "../../utils/cn";
import FrostedGlassCard from "../_library/Card/TWFrostedGlassCard";
import T from "../_library/Ui/TWTypography";

const pad = (num) => String(num).padStart(2, "0");

function getTimeLeft(target) {
  const now = moment();
  const end = moment(target);
  const duration = moment.duration(end.diff(now));
  return {
    days: Math.max(0, Math.floor(duration.asDays())),
    hours: pad(duration.hours()),
    minutes: pad(duration.minutes()),
    seconds: pad(duration.seconds()),
    isPast: now.isSameOrAfter(end),
  };
}

const ContentCountdownWrapper = ({
  datetime,
  children,
  title = "Materialet är snart tillgängligt",
}) => {
  const [showContent, setShowContent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(datetime));

  useEffect(() => {
    if (timeLeft.isPast) return;
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(datetime));
    }, 1000);
    return () => clearInterval(interval);
  }, [datetime, timeLeft.isPast]);

  if (timeLeft.isPast || showContent) {
    return <>{children}</>;
  }

  const countdownClasses = cn(
    "flex flex-col items-center justify-center py-8",
    "text-white tw-animate-gradient-shift"
  );
  const gridClasses = cn("grid grid-cols-4 gap-4 items-end mb-2");
  const timeValueClasses = cn(
    "text-4xl font-mono font-bold tracking-widest text-center"
  );
  const labelClasses = cn(
    "text-xs font-bold uppercase tracking-wider text-white/80 text-center"
  );
  const borderAnimatedClasses = cn(
    "border-2 border-white rounded-xl p-6 mb-2",
    "shadow-lg",
    "animate-[pulse-border_2s_ease-in-out_infinite]",
    // fallback for browsers without arbitrary animate
    "[animation-name:pulse-border]"
  );

  return (
    <div className={countdownClasses}>
      <FrostedGlassCard blur="lg">
        <T.PageTitle>
          <T.FrostedGlassText>{title}</T.FrostedGlassText>
        </T.PageTitle>
        <div className={borderAnimatedClasses}>
          <div className={gridClasses}>
            <span className={timeValueClasses}>{timeLeft.days}</span>
            <span className={timeValueClasses}>{timeLeft.hours}</span>
            <span className={timeValueClasses}>{timeLeft.minutes}</span>
            <span className={timeValueClasses}>{timeLeft.seconds}</span>
            <span className={labelClasses}>Dagar</span>
            <span className={labelClasses}>Timmar</span>
            <span className={labelClasses}>Minuter</span>
            <span className={labelClasses}>Sekunder</span>
          </div>
          {process.env.NODE_ENV === "development" && (
              <button
                onClick={() => setShowContent(true)}
                className="mt-4 border-white text-black border-2 px-4 py-2 rounded-md"
              >
                Visa innehåll (dev)
              </button>
            )}
        </div>
      </FrostedGlassCard>
      <style>{`
        @keyframes pulse-border {
            0%, 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0.7); }
            50% { box-shadow: 0 0 16px 4px rgba(255,255,255,0.9); }
            }
            
      `}</style>
    </div>
  );
};

export default ContentCountdownWrapper;
