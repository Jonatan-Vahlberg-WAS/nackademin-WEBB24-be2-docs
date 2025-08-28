import { useEffect, useRef, useState } from "react";
import {
  FaLightbulb,
  FaPencilRuler,
  FaCode,
  FaVial,
  FaRocket,
  FaTools,
  FaFlagCheckered,
} from "react-icons/fa";

const phaseIcons = {
  1: <FaLightbulb />,
  2: <FaPencilRuler />,
  3: <FaCode />,
  4: <FaVial />,
  5: <FaRocket />,
  6: <FaTools />,
  7: <FaFlagCheckered />,
};

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
  },
];

const TimelinePhase = ({ phase, index, moveToNext }) => (
  <div
    id={`phase${index + 1}`}
    className="relative flex flex-col gap-4 p-6 bg-white shadow-md rounded-lg border-l-4 border-blue-500 mb-10"
  >
    <div className="text-xl font-semibold">{phase.title}</div>
    <div className="text-sm text-gray-500">{phase.time}</div>

    <div>
      <h4 className="font-medium">Aktiviteter:</h4>
      <ul className="list-disc list-inside ml-2">
        {phase.activities.map((activity, i) => (
          <li key={i}>{activity}</li>
        ))}
      </ul>
    </div>

    <div>
      <h4 className="font-medium">Leveranser:</h4>
      <ul className="list-disc list-inside ml-2">
        {phase.deliverables.map((deliverable, i) => (
          <li key={i}>{deliverable}</li>
        ))}
      </ul>
    </div>

    <button
      onClick={() => moveToNext(index + 1)}
      className="self-start mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      {index === phases.length - 1 ? "Tillbaka till början ↑" : "Nästa fas →"}
    </button>
  </div>
);

export default function Timeline() {
  const [currentPhase, setCurrentPhase] = useState(1);
  const bubbleRef = useRef(null);

  const updateBubblePosition = (phaseNumber) => {
    const phaseEl = document.getElementById(`phase${phaseNumber}`);
    const containerEl = document.querySelector(".timeline-container");

    if (phaseEl && containerEl && bubbleRef.current) {
      const phaseRect = phaseEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      const top = phaseRect.top - containerRect.top + phaseRect.height / 2;
      bubbleRef.current.style.top = `${top}px`;
    }
  };

  const moveToNext = (phaseNumber) => {
    let next = phaseNumber + 1;
    if (next > phases.length) next = 1;
    setCurrentPhase(next);
    const nextEl = document.getElementById(`phase${next}`);
    if (nextEl) {
      nextEl.scrollIntoView({ behavior: "smooth", block: "center" });
      updateBubblePosition(next);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const mid = window.innerHeight / 2;
      document.querySelectorAll(".timeline-item").forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          setCurrentPhase(i + 1);
          updateBubblePosition(i + 1);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    updateBubblePosition(currentPhase);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative timeline-container px-8 py-12 max-w-3xl mx-auto">
      {/* Timeline Bubble */}
      <div
        ref={bubbleRef}
        className="absolute -left-10 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 text-white text-lg"
      >
        {phaseIcons[currentPhase]}
      </div>

      {/* Timeline Items */}
      {phases.map((phase, index) => (
        <div className="timeline-item" key={index}>
          <TimelinePhase
            phase={phase}
            index={index}
            moveToNext={moveToNext}
          />
        </div>
      ))}
    </div>
  );
}
