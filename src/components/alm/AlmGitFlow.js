import React from "react";
import GitFlow from "../GitFlow";

const almBranches = {
  main: {
    branch: "main",
    offset: 0,
    color: "blue",
  },
  "feature/add-password-reset": {
    branch: "feature/add-password-reset",
    offset: 1,
    color: "red",
  },
  "hotfix/fix-password-reset": {
    branch: "hotfix/fix-password-reset",
    offset: 2,
    color: "yellow",
  },
};

const almWorkflow = [
  {
    branch: almBranches.main.branch,
    commit: "Initial commit",
    commands: [],
    index: 0,
  },
  {
    branch: almBranches["feature/add-password-reset"].branch,
    commit: "Skapa feature branch",
    commands: ["git checkout -b feature/add-password-reset"],
    index: 1,
    from: 0,
  },
  {
    branch: almBranches.main.branch,
    commit: 'Annat arbete "indraget" på main',
    commands: [],
    index: 2,
    from: 0,
  },
  {
    branch: almBranches["feature/add-password-reset"].branch,
    commit: "Lägger till formulär och logik",
    commands: ["git add .", 'git commit -m "Add password reset form"'],
    index: 3,
    from: 1,
  },
  {
    branch: almBranches.main.branch,
    commit: "Merge pull request från feature/add-password-reset",
    commands: [],
    index: 4,
    from: 2,
    mergeFrom: 3,
  },
  {
    branch: almBranches["hotfix/fix-password-reset"].branch,
    commit: "Fixa bugg i password reset",
    commands: ["git add .", 'git commit -m "Fix password reset bug"'],
    index: 5,
    from: 4,
  },
  {
    branch: almBranches.main.branch,
    commit: "Merge pull request från hotfix/fix-password-reset",
    commands: [],
    index: 6,
    from: 4,
    mergeFrom: 5,
  },
  {
    branch: almBranches.main.branch,
    commit: "Fortsatt arbete på main",
    commands: [],
    index: 7,
    from: 6,
  },
];

const AlmGitFlow = () => {
  return <GitFlow branches={almBranches} workflow={almWorkflow} />;
};

export default AlmGitFlow;
