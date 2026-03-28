# 30-Day Learning Tracker – CodeX Implementation Guide

## 🧠 System Overview

This is a static React-based learning tracker that:

- Loads predefined tasks from a JSON file
- Releases tasks progressively based on a user-defined start date
- Stores user progress locally in the browser
- Displays progress via a growing task grid and completion metrics

---

## 🏗️ Architecture
Frontend (React)
├── tasks.json (static)
├── localStorage (progress + start date)
└── UI (tabs, list, grid, metrics)

- No backend
- No database

---

## 📁 Folder Structure
/src
  /data
    tasks.json
  /utils
    date.ts
    storage.ts
    progress.ts
  /components
    TaskList.tsx
    TaskItem.tsx
    ProgressGrid.tsx
    Tabs.tsx
    Metrics.tsx
    Onboarding.tsx
  App.tsx
  main.tsx

## 📦 tasks.json Schema (final)

[
  {
    "id": "task_001",
    "title": "Introduce yourself",
    "content": "Record a 2-minute self introduction",
    "category": "speaking",
    "day": 1
  },
  {
    "id": "task_002",
    "title": "Listen to a podcast",
    "content": "Listen for 10 minutes and summarize",
    "category": "listening",
    "day": 1
  }
]

## 💾 localStorage Design (critical)

Keys
learning_start_date
learning_progress_v1

Progress Structure
{
  "task_001": {
    "completed": true,
    "completed_at": "2026-03-27T10:00:00Z"
  }
}

## ⏱️ Core Logic (must be exact)

1. Current Day Calculation
const currentDay = Math.min(
  30,
  Math.max(
    1,
    Math.floor((today - startDate) / ONE_DAY) + 1
  )
);

2. Released Tasks
task.day <= currentDay

3. Today Tasks
task.day === currentDay

## 📊 Metrics Logic

Daily
completed_today / total_today

Released
completed_released / total_released

Overall
completed_all / total_all

## 🟩 Progress Grid

Each square = one task

Rendering logic:
tasks
  .filter(task.day <= currentDay)
  .map(task => ({
    completed: progress[task.id]?.completed
  }))

Color rules:
	• 🟩 Green → completed
	• 🟦 Blue → not completed

## UI Behavior

Tabs
	• Life Video / Tech Video / Interview Prep / Coding
	• filter tasks by category

Task List
	• show only:
        • selected category
        • AND released tasks
	• checkbox:
        • toggle completion
        • update localStorage

Grid
	• shows ALL released tasks (ignore tab filter)
	• grows daily

Onboarding
If no start_date:
Show:
	• short intro text
	• button: “Start Plan”

On click:
    localStorage.setItem("learning_start_date", today)

After day 30
	• clamp to day 30
	• all tasks visible
