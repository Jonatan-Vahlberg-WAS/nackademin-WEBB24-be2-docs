import moment from "moment";
import "moment/locale/sv";
import { cn } from "../../utils/cn";
import T from "../_library/Ui/TWTypography";
import Badge from "../_library/Badge/TWBadge";

export default function CourseLesson({ year, lesson, index, isThisWeek }) {
  const lessonHasPassed = moment().isAfter(moment(lesson.date, "DD/MM").set("hour", 17));
  console.log("LESSON HAS PASSED", lesson.date, lessonHasPassed);
  const currentYear = moment().year();

  const getLessonTypeVariant = (content) => {
    if (content.toLowerCase().includes("mentortid")) return "warning";
    if (content.toLowerCase().includes("presentation")) return "success";
    if (content.toLowerCase().includes("genomgång")) return "info";
    return "default";
  };

  const formatLessonDate = (dateString) => {
    // Parse the date string (e.g., "15/9" or "15/09")
    const [day, month] = dateString.split("/");
    const date = moment(
      `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`
    );

    return {
      dayName: date.format("dddd"), // e.g., "måndag"
      shortDate:
        currentYear === year ? date.format("D/M") : date.format("D/M/YY"), // e.g., "15/9"
      fullDate:
        currentYear === year
          ? date.format("D MMMM")
          : date.format("D MMMM YYYY"), // e.g., "15 september"
    };
  };

  const linkClasses = cn(
    "group",
    "block p-4 rounded-lg border border-gray-200",
    "transition-all duration-200 ease-in-out",
    "hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30",
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50",
    {
      "bg-blue-500 text-white": isThisWeek,
      "bg-gray-300/50 hover:bg-gray-300/50": lessonHasPassed,
    }
  );

  const titleClasses = cn(
    "mb-1 font-semibold text-gray-800",
    "group:hover:text-blue-700 transition-colors duration-200",
    {
      "text-white group-hover:text-white group-hover:underline": isThisWeek,
      "text-gray-800 group-hover:text-gray-800 group-hover:underline":
        lessonHasPassed,
    }
  );

  const mentorTimeClasses = cn("text-sm text-gray-600 mb-0", {
    "text-white": isThisWeek,
    "text-gray-600": lessonHasPassed,
  });
  const isMentoring = lesson.kind === "mentoring";
  const href = isMentoring
    ? `#lesson-${lesson.lesson}`
    : `/docs/category/${lesson.lesson}`;

  const Wrapper = ({ children, ...props }) => {
    if (isMentoring) {
      return (
        <div
          id={`lesson-${lesson.lesson}`}
          className="flex items-start justify-between p-4"
        >
          {children}
        </div>
      );
    }
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };

  const formattedDate = formatLessonDate(lesson.date);

  return (
    <Wrapper key={`${lesson.lesson}-${index}`} className={linkClasses}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              <Badge
                variant={getLessonTypeVariant(lesson.content)}
                shade="light"
                className="text-xs font-medium"
              >
                {formattedDate.dayName}
              </Badge>
              <Badge variant="default" shade="light" className="text-xs">
                {formattedDate.fullDate}
              </Badge>
            </div>
            {lesson.time && (
              <Badge variant="info" shade="light" className="text-xs">
                {lesson.time}
              </Badge>
            )}
          </div>

          {!isMentoring && (
            <T.Text className={cn(titleClasses)}>{lesson.content}</T.Text>
          )}

          {!isMentoring && lesson.mentorTime && (
            <T.Text className={cn(mentorTimeClasses)}>
              <strong>Mentortid:</strong> {lesson.mentorTime}
            </T.Text>
          )}

          {isMentoring && (
            <T.Text className={cn(titleClasses, "text-sm underline")}>
              Ingen lektion idag, utbildare finns tillgänglig i klassrummet
              eller på distans baserat på vad som har kommunicerats.
            </T.Text>
          )}
        </div>

        <div
          className={cn(
            "ml-4 opacity-0 group-hover:opacity-100",
            "transition-opacity duration-200",
            "text-blue-500"
          )}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </Wrapper>
  );
}
