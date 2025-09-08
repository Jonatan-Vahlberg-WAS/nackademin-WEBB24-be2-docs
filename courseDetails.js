export default {
  program: "KYHS FE24",
  class: "WEBB24",
  yhPoints: 40,
  hours: `112 Lektionstimmar, 208 Studietimmar`,
  start: "v.38-v.42",
  startYear: 2025,
  startWeek: 38,
  endYear: 2025,
  endWeek: 42,
  plan: "/files/kursplan_webb24_typescript.pdf",
  consultantDetails: {
    name: "Jonatan Vahlberg",
    email: "jonatan.vahlberg@nackademin.se",
    role: "Utbildningskonsult & Fullstackutvecklare",
    image: "/img/consultant.jpg",
  },
  tags: ["Typecript", "Flipped-classroom (Semi-flipped)", "React", "UML", "Hono", "PostgreSQL"],
  extraColumns: [
    {
      value: "time",
      label: "Tid",
      width: "40px",
    },
    {
      value: "mentorTime",
      label: "Mentortid",
      width: "120px",
    },
  ],
  schedule: [
    {
      week: 38,
      date: "15/9",
      content: "Vad är Typecript?",
      time: "7h",
      mentorTime: "08:30-09:00 + Eftermiddag",
      lesson: "lektion-1",
      kind: "lesson"
    },
    {
      week: 38,
      date: "18/9",
      content: "Typescript koncept",
      time: "7h",
      mentorTime: "08:30-09:00 + Eftermiddag",
      lesson: "lektion-2",
      kind: "lesson"
    },
    {
      week: 39,
      date: "22/9",
      content: "Typescript inom backend - Hono",
      time: "7h",
      mentorTime: "08:30-09:00 + Eftermiddag",
      lesson: "lektion-3",
      kind: "lesson"
    },
    {
      week: 39,
      date: "25/9",
      content: "Hono + TypeScript + Supabase",
      time: "7h",
      mentorTime: "08:30-09:00 + Eftermiddag",
      lesson: "lektion-4",
      kind: "lesson"
    },
    {
      week: 40,
      date: "29/9",
      content: "Supabase autentisering i Hono",
      time: "7h",
      mentorTime: "08:30-09:00, 14:00-16:00",
      lesson: "lektion-5",
      kind: "lesson"
    },
    {
      week: 40,
      date: "2/10",
      content: "UML-diagram + Gruppuppgift",
      time: "",
      mentorTime: "08:30-16:00",
      lesson: "lektion-6",
      kind: "lesson"
    },
    {
      week: 41,
      date: "6/10",
      content: "Repition av typescript inom backend",
      time: "7h",
      mentorTime: "08:30-16:00",
      lesson: "lektion-7",
      kind: "lesson"
    },
    {
      week: 41,
      date: "9/10",
      content: "Typescript inom frontend - state, props & promises",
      time: "7h",
      mentorTime: "08:30-16:00",
      lesson: "lektion-8",
      kind: "lesson"
    },
    {
      week: 42,
      date: "13/10",
      content: "Typescript inom frontend - Context",
      time: "7h",
      mentorTime: "08:30-16:00",
      lesson: "lektion-9",
      kind: "mentoring"
    },
    {
      week: 42,
      date: "16/10",
      content: "Typescript inom frontend 3 - Autentisering (Cookies)",
      time: "7h",
      mentorTime: "08:30-16:00",
      lesson: "lektion-10",
      kind: "lesson"
    },
    {
      week: 43,
      date: "20/10",
      content: "Mentortid",
      time: "7h",
      mentorTime: "08:30-16:00",
      lesson: "lektion-11",
      kind: "mentoring"
    },
    {
      week: 43,
      date: "23/10",
      content: "Repition av typescript inom frontend (Bygg en frontend mot en uppsatt backend)",
      time: "7h",
      mentorTime: "08:30-09:00 + Eftermiddag",
      lesson: "lektion-12",
      kind: "lesson"
      },
    {
      week: 44,
      date: "27/10",
      content: "Mentortid",
      time: "7h",
      mentorTime: "08:30-16:00",
      lesson: "lektion-13",
      kind: "mentoring"
    },
    {
      week: 44,
      date: "30/10",
      content: "Mentortid",
      time: "7h",
      mentorTime: "08:30-16:00",
      lesson: "lektion-14",
      kind: "mentoring"
    },
    {
      week: 45,
      date: "3/11",
      content: "Mentortid",
      time: "7h",
      mentorTime: "08:30-16:00",
      lesson: "lektion-15",
      kind: "mentoring"
    },
    {
      week: 45,
      date: "6/11",
      content: "Presentationer av individuella uppgiften",
      time: "7h",
      mentorTime: "08:30-16:00",
      lesson: "lektion-16",
      kind: "presentation"
    },
  ],
};
