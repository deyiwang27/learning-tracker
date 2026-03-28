# Build a clean React (TypeScript) web app for a 30-day learning tracker.

## Requirements:

### 1. Data:
- Load tasks from a local JSON file (tasks.json)
- Each task has: id, title, content, category, day

### 2. State:
- Store user progress in localStorage
- Key: "learning_progress_v1"
- Structure:
  {
    [task_id]: {
      completed: boolean,
      completed_at: ISO string
    }
  }

- Store start date:
  "learning_start_date"

### 3. Logic:
- currentDay = floor((today - start_date) / 1 day) + 1
- Clamp between 1 and 30

- Released tasks: task.day <= currentDay
- Today tasks: task.day === currentDay

### 4. UI:

A. Onboarding
- If no start_date:
  - show intro text + button "Start Plan"
  - clicking sets start_date to today

B. Tabs
- speaking, listening, interview, coding
- filter task list by category

C. Task List
- show only released tasks
- filtered by selected category
- checkbox to toggle completion

D. Progress Grid
- show ALL released tasks (ignore category filter)
- each cell = one task
- completed = green
- not completed = blue

E. Metrics
- Daily: completed_today / total_today
- Released: completed_released / total_released
- Overall: completed_all / total_all

### 5. Style:
- Clean modern UI
- Use Tailwind CSS
- Simple, minimal, visually clean

### 6. Constraints:
- No backend
- No database
- Everything runs in frontend

Structure code into components:
- TaskList
- TaskItem
- ProgressGrid
- Tabs
- Metrics
- Onboarding

Keep code modular and readable.