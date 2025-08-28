import React from "react";
import GitFlow from "../GitFlow";

const branchTypes = {
  main: {
    branch: "main",
    offset: 0,
    color: "blue",
  },
  dev: {
    branch: "dev",
    offset: 2,
    color: "orange",
  },
  staging: {
    branch: "staging",
    offset: 1,
    color: "yellow",
  },
  "feature/user-auth": {
    branch: "feature/user-auth",
    offset: 3,
    color: "green",
  },
  "feature/payment": {
    branch: "feature/payment",
    offset: 4,
    color: "purple",
  },
  "hotfix/security": {
    branch: "hotfix/security",
    offset: 5,
    color: "red",
  },
};

const branchTypesWorkflow = [
  // Initial state
  {
    branch: branchTypes.main.branch,
    commit: "Release v1.0.0",
    commands: ["git tag -a v1.0.0 -m 'Release v1.0.0'"],
    index: 0,
  },
  // Create dev branch
  {
    branch: branchTypes.dev.branch,
    commit: "Skapa dev branch",
    commands: [
      "git checkout main",
      "git checkout -b dev",
      "git push origin dev",
    ],
    index: 1,
    from: 0,
  },
  // Create staging branch
  {
    branch: branchTypes.staging.branch,
    commit: "Skapa staging branch",
    commands: [
      "git checkout main",
      "git checkout -b staging",
      "git push origin staging",
    ],
    index: 2,
    from: 0,
  },
  // Feature 1 branch creation
  {
    branch: branchTypes["feature/user-auth"].branch,
    commit: "Skapa feature branch för användarautentisering",
    commands: [
      "git checkout dev",
      "git pull origin dev",
      "git checkout -b feature/user-auth",
    ],
    index: 3,
    from: 1,
  },
  // Feature 2 branch creation
  {
    branch: branchTypes["feature/payment"].branch,
    commit: "Skapa feature branch för betalning",
    commands: [
      "git checkout dev",
      "git pull origin dev",
      "git checkout -b feature/payment",
    ],
    index: 4,
    from: 1,
  },
  // Feature 1 development
  {
    branch: branchTypes["feature/user-auth"].branch,
    commit: "Implementera användarautentisering",
    commands: [
      "git add .",
      'git commit -m "feat: implement user authentication"',
    ],
    index: 5,
    from: 3,
  },
  // Feature 2 development
  {
    branch: branchTypes["feature/payment"].branch,
    commit: "Implementera betalningshantering",
    commands: ["git add .", 'git commit -m "feat: implement payment handling"'],
    index: 6,
    from: 4,
  },
  // Merge Feature 1 to dev
  {
    branch: branchTypes.dev.branch,
    commit: "Merge feature/user-auth",
    commands: [
      "git checkout dev",
      "git merge feature/user-auth",
      "git push origin dev",
    ],
    index: 7,
    from: 1,
    mergeFrom: 5,
  },
  // Merge Feature 2 to dev
  {
    branch: branchTypes.dev.branch,
    commit: "Merge feature/payment",
    commands: [
      "git checkout dev",
      "git merge feature/payment",
      "git push origin dev",
    ],
    index: 8,
    from: 7,
    mergeFrom: 6,
  },
  // Merge dev to staging
  {
    branch: branchTypes.staging.branch,
    commit: "Merge dev till staging",
    commands: [
      "git checkout staging",
      "git merge dev",
      "git push origin staging",
    ],
    index: 9,
    from: 2,
    mergeFrom: 8,
  },
  // Hotfix creation from main
  {
    branch: branchTypes["hotfix/security"].branch,
    commit: "Skapa hotfix för säkerhetsproblem",
    commands: ["git checkout main", "git checkout -b hotfix/security"],
    index: 10,
    from: 0,
  },
  // Hotfix implementation
  {
    branch: branchTypes["hotfix/security"].branch,
    commit: "Fixa säkerhetsproblem",
    commands: [
      "git add .",
      'git commit -m "fix: patch security vulnerability"',
    ],
    index: 11,
    from: 10,
  },
  // Merge hotfix to main
  {
    branch: branchTypes.main.branch,
    commit: "Merge hotfix/security",
    commands: [
      "git checkout main",
      "git merge hotfix/security",
      "git tag -a v1.0.1 -m 'Security patch'",
      "git push origin main --tags",
    ],
    index: 12,
    from: 0,
    mergeFrom: 11,
  },
 

  // Final merge to main
  {
    branch: branchTypes.main.branch,
    commit: "Release v1.1.0",
    commands: [
      "git checkout main",
      "git merge staging",
      "git tag -a v1.1.0 -m 'Release v1.1.0'",
      "git push origin main --tags",
    ],
    index: 13,
    from: 12,
  },
  // pull main into staging
  {
    branch: branchTypes.staging.branch,
    commit: "Pull main into staging",
    commands: ["git checkout staging", "git pull origin main"],
    index: 14,
    from: 9,
    mergeFrom: 13,
  },
  // pull staging into dev
  {
    branch: branchTypes.dev.branch,
    commit: "Pull staging into dev",
    commands: ["git checkout dev", "git pull origin staging"],
    index: 15,
    from: 8,
    mergeFrom: 13,
  },
];

const BranchTypesGitFlow = () => {
  return (
    <GitFlow
      branches={branchTypes}
      workflow={branchTypesWorkflow}
      offset={80}
    />
  );
};

export default BranchTypesGitFlow;
