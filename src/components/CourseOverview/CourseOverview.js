import moment from "moment";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import CourseOverviewHero from "./CourseOverviewHero";
import T from "../_library/Ui/TWTypography";
import Badge from "../_library/Badge/TWBadge";
import courseDetails from "../../../courseDetails";
import { useState } from "react";
import Dialog from "../_library/Dialog/TWDialog";
import { cn } from "../../utils/cn";
import CourseSchedule from "./CourseSchedule";
import CourseConsultantDialog from "./CourseConsultantDialog";

const CourseOverview = () => {
  const { siteConfig } = useDocusaurusContext();

  const [consultantDialogOpen, setConsultantDialogOpen] = useState(false);
  const toggleConsultantDialog = () =>
    setConsultantDialogOpen(!consultantDialogOpen);

  const [schemaDialogOpen, setSchemaDialogOpen] = useState(false);
  const toggleSchemaDialog = () => setSchemaDialogOpen(!schemaDialogOpen);

  const startDate = moment(
    `${courseDetails.startYear}-W${courseDetails.startWeek}-1`,
    "YYYY-W[0-9]-1"
  );
  const endDate = moment(
    `${courseDetails.endYear}-W${courseDetails.endWeek}-1`,
    "YYYY-W[0-9]-1"
  );

  return (
    <div>
      <CourseOverviewHero
        title={siteConfig.title}
        tagline={siteConfig.tagline}
      />
      <div className="container p-4">
        <T.PageTitle>Detaljer</T.PageTitle>
        <T.Text>
          <strong>Program:</strong> {courseDetails.program}
        </T.Text>
        <T.Text>
          <strong>Klass:</strong> {courseDetails.class}
        </T.Text>
        <T.Text>
          <strong>Antal YH-poäng:</strong> {courseDetails.yhPoints}
        </T.Text>
        <div className="flex items-center gap-2 mb-2">
          <T.Text className={cn("mb-0")}>
            <strong>Utbildningskonsult:</strong>&nbsp;
          </T.Text>
          <Badge
            wrapperClassName="inline-block"
            shade="light"
            hoverable
            onClick={toggleConsultantDialog}
          >
            {courseDetails.consultantDetails.name} /{" "}
            {courseDetails.consultantDetails.role}
          </Badge>
        </div>
        <T.Text>
          <strong>Antal undervisningstimmar:</strong> {courseDetails.hours}{" "}
          timmar
        </T.Text>
        <div className="flex items-center gap-2 mb-2">
          <T.Text className="mb-0">
            <strong>Kursperiod:</strong>
          </T.Text>
          <Badge
            shade="light"
            variant="info"
            hoverable
            onClick={toggleSchemaDialog}
          >
            Schema - ({courseDetails.start})
          </Badge>
        </div>
        {courseDetails.tags && (
          <div className="flex flex-wrap gap-2 mt-2">
            {courseDetails.tags.map((tag) => (
              <Badge key={tag} shade="light" variant="info">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        <T.PageTitle>Kursplan</T.PageTitle>
        <a href={courseDetails.plan} download>
          kursplan.pdf
        </a>
        <T.PageTitle>Kursmaterial</T.PageTitle>
        <a href={"/docs/course/overview"}>Gå till kursmaterial</a>
      </div>
      <CourseConsultantDialog
        open={consultantDialogOpen}
        toggle={toggleConsultantDialog}
        consultant={courseDetails.consultantDetails}
      />
      <Dialog open={schemaDialogOpen} toggle={toggleSchemaDialog} size="6xl">
        <T.Title>Schema</T.Title>
        <T.Text>
          <T.Text>
            {startDate.format("YYYY-MM-DD")} - {endDate.format("YYYY-MM-DD")}
          </T.Text>
        </T.Text>
        <CourseSchedule />
      </Dialog>
    </div>
  );
};

export default CourseOverview;
