import T from "../_library/Ui/TWTypography";
import Card from "../_library/Card/TWCard";
import Badge from "../_library/Badge/TWBadge";
import moment from "moment";
import "moment/locale/sv";
import CourseLesson from "./CourseLesson";
import { cn } from "../../utils/cn";

export default function CourseLessonWeek({ year, week, lessons, lessonstoSkip }) {
  moment.locale("sv");

  const isThisWeek = moment().isSame(moment(lessons[0].date, "DD/MM"), "week");
  const weekHasPassed = moment().isAfter(moment(lessons[0].date, "DD/MM"));

  const weekClass = cn(
    "overflow-hidden",
    {
      "bg-blue-500 text-white": isThisWeek,
      "bg-gray-200/50 hover:bg-gray-200/50": weekHasPassed
    }
  );

  return (
    <Card key={week} className={`overflow-hidden ${weekClass}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <T.Title className="mb-0">Vecka {week}</T.Title>
        </div>
        <Badge variant="info" shade="light">
          {lessons.length} lektion{lessons.length !== 1 ? "er" : ""}
        </Badge>
      </div>

      <div className="space-y-3">
        {lessons
          .filter((lesson) => !lessonstoSkip.includes(lesson.lesson))
          .map((lesson, index) => (
            <CourseLesson key={lesson.lesson} year={year} lesson={lesson} index={index} isThisWeek={isThisWeek} weekHasPassed={weekHasPassed} />
          ))}
      </div>
    </Card>
  );
}
