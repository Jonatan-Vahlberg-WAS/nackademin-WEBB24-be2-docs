import {
  FaLightbulb,
  FaPencilRuler,
  FaCode,
  FaVial,
  FaRocket,
  FaTools,
  FaFlagCheckered,
} from "react-icons/fa";
import Timeline from "../_library/Timeline/TWTimeline";
import TimelinePoint from "../_library/Timeline/TWTimelinePoint";

const phases = [
  {
    title: "1. Idé & Planering",
    time: "Veckor 1-2",
    activities: [
      "Identifiera marknadsbehov",
      "Dokumentera krav i Jira",
      "Sätta mål för MVP",
    ],
    deliverables: ["Produktvision", "Funktionslista"],
    icon: <FaLightbulb />,
  },
  {
    title: "2. Design & Arkitektur",
    time: "Veckor 3-4",
    activities: [
      "Skapa wireframes i Figma",
      "Definiera systemarkitektur",
      "Välja teknikstack",
    ],
    deliverables: ["Designprototyper", "Systemarkitektur"],
    icon: <FaPencilRuler />,
  },
  {
    title: "3. Utveckling",
    time: "Veckor 5-10",
    activities: [
      "Utveckla i sprintar",
      "Versionshantering med GitHub",
      "Kodgranskningar",
    ],
    deliverables: ["Färdigställd kod", "Automatiserade tester"],
    icon: <FaCode />,
  },
  {
    title: "4. Testning & QA",
    time: "Veckor 7-12",
    activities: [
      "Funktionella och icke-funktionella tester",
      "CI/CD-pipeline med Jenkins",
      "Bugghantering",
    ],
    deliverables: ["Testprotokoll", "Godkännande för produktionssättning"],
    icon: <FaVial />,
  },
  {
    title: "5. Distribution & Release",
    time: "Vecka 13",
    activities: [
      "Distribuera till App Store och Google Play",
      "Canary release till 5% av användarna",
      "Aktivera övervakning med Datadog",
    ],
    deliverables: ["Version 1.0 lanserad", "Insamlad användarfeedback"],
    icon: <FaRocket />,
  },
  {
    title: "6. Underhåll & Support",
    time: "Vecka 14+",
    activities: [
      "Daglig bugghantering via ServiceNow",
      "Månatliga uppdateringar",
      "Kontinuerliga prestandaförbättringar",
    ],
    deliverables: ["Versionshistorik", "Release notes", "SLA-uppfyllelse"],
    icon: <FaTools />,
  },
  {
    title: "7. Avveckling",
    time: "Efter 5 år",
    activities: [
      "Ersätta med ny AI-baserad app",
      "Migrera användardata",
      "Gradvis nedstängning",
    ],
    deliverables: [
      "Nedstängningsplan",
      "Dokumenterad migrering",
      "Kundkommunikation",
    ],
    icon: <FaFlagCheckered />,
  },
];

const TimelinePhase = ({ point, index, moveToNext }) => (
  <TimelinePoint id={`point${index + 1}`} index={index} moveToNext={moveToNext}>
    <div className="text-xl font-semibold">{point.title}</div>
    <div className="text-sm text-gray-500">{point.time}</div>

    <div>
      <h4 className="font-medium">Aktiviteter:</h4>
      <ul className="list-disc list-inside ml-2">
        {point.activities.map((activity, i) => (
          <li key={i}>{activity}</li>
        ))}
      </ul>
    </div>

    <div>
      <h4 className="font-medium">Leveranser:</h4>
      <ul className="list-disc list-inside ml-2">
        {point.deliverables.map((deliverable, i) => (
          <li key={i}>{deliverable}</li>
        ))}
      </ul>
    </div>
  </TimelinePoint>
);

export default function AlmPayflowTimeline() {
  return (
    <Timeline
      points={phases}
      renderPoint={(point, index, moveToNext) => (
        <TimelinePhase point={point} index={index} moveToNext={moveToNext} />
      )}
    />
  );
}
