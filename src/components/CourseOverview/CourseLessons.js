import courseDetails from "../../../courseDetails";
import { cn } from "../../utils/cn";
import T from "../_library/Ui/TWTypography";
import Card from "../_library/Card/TWCard";
import Badge from "../_library/Badge/TWBadge";
import moment from "moment";
import "moment/locale/sv";
import CourseLessonWeek from "./CourseLessonWeek";

export default function CourseLessons({ lessonstoSkip = [] }) {
  // Set Swedish locale
  moment.locale("sv");

  const groupedByWeek = courseDetails.schedule.reduce((acc, lesson) => {
    if (lessonstoSkip.includes(lesson.lesson)) return acc;
    acc[lesson.week] = acc[lesson.week] || [];
    acc[lesson.week].push(lesson);
    return acc;
  }, {});



  return (
    <div className="space-y-6">
      <T.PageTitle>Lektioner</T.PageTitle>

      <div className="grid gap-6">
        {Object.entries(groupedByWeek).map(([week, lessons]) => {
            if (lessons.length > 0) {
                return (
                    <CourseLessonWeek
                      year={courseDetails.startYear}
                      week={week}
                      lessons={lessons}
                      lessonstoSkip={lessonstoSkip}
                    />
                  ) }
            return null;
        })}
      </div>
    </div>
  );
}
