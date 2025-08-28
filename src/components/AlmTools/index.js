import { useState } from "react";
import {
  FaTasks,
  FaCheck,
  FaVial,
  FaRocket,
} from "react-icons/fa";
import { FaGitAlt } from "react-icons/fa6";

const cards = [
  {
    id: "krav",
    icon: <FaTasks className="text-4xl text-inherit mb-4" />,
    title: "Kravhantering",
    content: "Definiera, spåra och hantera krav genom hela projektets livscykel.",
    tools: ["Jira", "Azure DevOps", "Trello"],
    detail: {
      intro:
        "Kravhantering är en kritisk del av ALM som hjälper till att säkerställa att alla intressenter har en gemensam förståelse för projektets mål.",
      features: [
        "Definiera och dokumentera krav",
        "Spåra ändringar och versioner",
        "Hantera prioriteringar",
        "Kommunikation mellan team",
      ],
      tools: [
        "Jira - För agil projektplanering",
        "Azure DevOps - Helhetslösning för ALM",
        "Trello - Enkel och visuell kravhantering",
      ],
    },
  },
  {
    id: "version",
    icon: <FaGitAlt className="text-4xl text-blue-500 mb-4" />,
    title: "Versionshantering",
    content: "Håller reda på olika versioner av koden och samarbete.",
    tools: ["Git", "GitHub", "GitLab"],
    detail: {
      intro:
        "Versionshantering är grundläggande för modern mjukvaruutveckling och samarbete.",
      features: [
        "Spåra kodändringar",
        "Hantera olika versioner",
        "Samarbete mellan utvecklare",
        "Code review och merge",
      ],
      tools: [
        "Git - Distribuerad versionshantering",
        "GitHub - Plattform för kodhantering",
        "GitLab - Helhetslösning med CI/CD",
      ],
    },
  },
  {
    id: "test",
    icon: <FaVial className="text-4xl text-blue-500 mb-4" />,
    title: "Utveckling och testning",
    content: "CI/CD och automatiserad testning för kodkvalitet.",
    tools: ["Jest", "Selenium", "Cypress"],
    detail: {
      intro:
        "Automatiserad testning och CI/CD är viktiga för att säkerställa kodkvalitet och snabb leverans.",
      features: [
        "Automatiserade tester",
        "Kontinuerlig integration",
        "Kontinuerlig deployment",
        "Kodkvalitetskontroll",
      ],
      tools: [
        "Jest - JavaScript-testramverk",
        "Selenium - Automatiserad webbtestning",
        "Cypress - Modern webbtestning",
      ],
    },
  },
  {
    id: "distribution",
    icon: <FaRocket className="text-4xl text-blue-500 mb-4" />,
    title: "Distribution och driftsättning",
    content: "Strategier för koddistribution och DevOps-praxis.",
    tools: ["Docker", "Kubernetes", "Terraform"],
    detail: {
      intro:
        "Modern distribution och driftsättning kräver robusta verktyg för att hantera komplexa miljöer.",
      features: [
        "Containerisering",
        "Orkestrering",
        "Infrastructure as Code",
        "Automatiserad deployment",
      ],
      tools: [
        "Docker - Containerplattform",
        "Kubernetes - Containerorkestrering",
        "Terraform - Infrastructure as Code",
      ],
    },
  },
];

export default function ALMTools() {
  const [active, setActive] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">ALM Verktyg & Komponenter</h2>
        <p className="text-gray-600 text-lg">Application Lifecycle Management - Verktyg och metoder för effektiv mjukvaruutveckling</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => setActive(card.id)}
            className={`bg-white rounded-xl p-6 shadow-md cursor-pointer transition hover:-translate-y-1 hover:shadow-lg relative overflow-hidden border-2 ${
              active === card.id ? "border-blue-500" : "border-transparent"
            }`}
          >
            {card.icon}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {card.title}
            </h3>
            <p className="text-gray-600 mb-4">{card.content}</p>
            <ul className="space-y-1">
              {card.tools.map((tool) => (
                <li key={tool} className="flex items-center text-gray-700">
                  <FaCheck className="text-blue-500 mr-2 text-sm" /> {tool}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {active && (
        <div className="mt-10 bg-blue-500 text-white rounded-xl shadow-md p-8 animate-fade-in">
          <div className="flex items-center mb-4">
            {cards.find((c) => c.id === active)?.icon}
            <h2 className="text-2xl font-bold text-white ml-4">
              {cards.find((c) => c.id === active)?.title}
            </h2>
          </div>
          <div className="text-white">
            <p>{cards.find((c) => c.id === active)?.detail.intro}</p>

            <h3 className="mt-6 mb-2 text-lg font-semibold text-white">Nyckelfunktioner:</h3>
            <ul className="list-disc list-inside ml-4">
              {cards.find((c) => c.id === active)?.detail.features.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <h3 className="mt-6 mb-2 text-lg font-semibold text-white">Vanliga verktyg:</h3>
            <ul className="list-disc list-inside ml-4">
              {cards.find((c) => c.id === active)?.detail.tools.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
