# MemberStack — Membership Dashboard

A clean, responsive membership management dashboard built as a Software Engineering Internship take-home challenge.

---

## Approach

I started by breaking the problem into three clear pages — Dashboard, Members list, and Add Member — and planned the data flow before writing any code. Since member data needed to be shared across pages, I reached for Zustand as a lightweight global store.

For the mock API integration (bonus), I built a dedicated `mockApi.js` layer that simulates real network latency with randomised delays. This kept the API contract clean and separate from UI state, which mirrors how a real frontend would talk to a backend. Each action (fetching members, fetching stats, adding a member) has its own loading flag in the store so the UI can respond independently — for example, the stat cards can skeleton-load separately from the members list.

Revenue is computed dynamically from active members rather than hardcoded, using a pricing model of Basic = $10/mo, Pro = $25/mo, Enterprise = $100/mo. Inactive members don't contribute — matching real subscription logic.

---

## Features

| Feature | Status |
|---|---|
| Dashboard with live stat cards | ✅ |
| Members list with search | ✅ |
| Sort by any column (asc/desc) | ✅ |
| Filter by plan and status | ✅ |
| Add member with form validation | ✅ |
| Duplicate email detection (client + API) | ✅ |
| Mock API integration with per-action loading | ✅ |
| Loading skeleton states | ✅ |
| Empty states | ✅ |
| Dark mode (respects OS preference) | ✅ |
| Responsive design (mobile-first) | ✅ |
| localStorage persistence | ✅ |
| Unit tests | ✅ |

---

## Tech Stack

| Concern | Tool | Reason |
|---|---|---|
| Framework | React 18 + Vite | Fast dev experience, great Vercel support |
| Styling | Tailwind CSS v3 | Utility-first, dark mode and responsive out of the box |
| Routing | React Router v6 | Clean nested layouts |
| State | Zustand | Minimal boilerplate, easy to test |
| Forms | React Hook Form | Uncontrolled inputs, straightforward validation |
| Icons | Lucide React | Consistent, tree-shakeable |
| Testing | Vitest + React Testing Library | Native Vite integration |

---

## Project Structure

```
src/
├── components/
│   ├── layout/       # AppLayout, Sidebar, Topbar
│   ├── ui/           # Badge, Button, Input/Select, StatCard
│   └── members/      # MemberTable, MemberFilters
├── pages/
│   ├── Dashboard.jsx
│   ├── Members.jsx
│   └── AddMember.jsx
├── store/
│   └── memberStore.js   # Zustand store with async actions
├── data/
│   ├── mockMembers.js   # 20 seed members + pricing constants
│   └── mockApi.js       # Simulated REST API with network delay
├── hooks/
│   ├── useMembers.js    # Search, sort, filter logic
│   └── useDarkMode.js   # Dark mode toggle + localStorage
└── tests/
    ├── store.test.js
    ├── useMembers.test.js
    └── setup.js
```

---

## Getting Started

```bash
npm install
npm run dev       # http://localhost:5173
npm test          # run unit tests
npm run build     # production build
```

---

## Deploying to Vercel

**Option A — Vercel CLI**
```bash
npm i -g vercel
vercel
```

**Option B — GitHub Import**
1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Vercel auto-detects Vite — click Deploy

The `vercel.json` handles SPA client-side routing so direct links like `/members/add` work correctly after deploy.

---

## Tools Used

- **Claude (Anthropic)** — architecture planning, component scaffolding, test writing, debugging
- **React Hook Form docs** — forwardRef pattern for custom input components
- **Zustand docs** — async actions and store structure
- **Tailwind CSS docs** — dark mode class strategy, responsive utilities
- **Vite docs** — Vitest configuration and setup
- **Lucide React** — icon library

---

## Challenges & How I Solved Them

**1. React Hook Form not reading custom input values**

Spreading `{...register()}` onto a custom `<Input>` component wasn't forwarding the `ref`, so RHF couldn't read field values and always reported them as empty. Fixed by wrapping `Input` and `Select` with `forwardRef` and passing `ref` down to the native DOM element.

**2. Keeping derived stats reactive**

Revenue and active count are derived from the members array. Instead of storing them separately (and risking them going stale), I compute stats via a dedicated `apiGetStats()` call that re-runs after every `addMember()`. This keeps a clean separation: the API owns the computation, the store owns the cache.

**3. Per-action loading states without coupling**

Rather than a single global `isLoading` flag, I used three independent flags — `loadingMembers`, `loadingStats`, `addingMember` — so each part of the UI can respond to its own async operation. This meant the stat cards could show skeletons while the members table loaded independently.

**4. Dark mode flash on first load**

Reading `localStorage` synchronously inside the `useState` initializer (before the first render) prevents the white flash that would otherwise appear while the effect runs.

---

## What I'd Improve With One More Day

- **Edit / deactivate members** — click a row to open a slide-over panel for changing status or plan
- **Pagination or virtual scroll** — for lists beyond a few hundred members
- **Real API integration** — swap `mockApi.js` for `React Query` hitting a real REST or GraphQL endpoint; the store interface wouldn't need to change
- **Revenue trend chart** — a simple line chart on the dashboard showing member growth over time using Recharts
- **Integration tests** — cover the full Add Member form flow end-to-end with React Testing Library
- **Role-based access** — admin vs viewer with a simple mock auth layer and protected routes
