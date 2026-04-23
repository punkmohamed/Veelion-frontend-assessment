# Code Review: Frontend Assessment

This document reviews the frontend located in frontend/ (app, components, hooks, lib) with emphasis on the Task Dashboard and Activity Feed modules. Issues are organized like the backend REVIEW: for each finding there is:
- What is wrong
- Why it is a problem
- How to improve it

## Bugs / Functional issues

1. **Activity page spams renders via tick timer**
   **What is wrong**: Activity page uses setInterval(1400ms) updating a "tick" state and clones lists on every tick (forcedList), causing frequent re-renders.
   **Why it is a problem**: Excessive re-renders lead to poor performance, high CPU/battery usage on clients, and unnecessary DOM churn.
   **How to improve it**: Remove the interval or gate it behind visibility checks. Use a debounced/controlled polling strategy or upgrade to WebSocket/SSE if live updates are required. Avoid cloning lists every tick; update only when the underlying data changes.

2. **Inconsistent data fetching boundaries (extra network hop)**
   **What is wrong**: Client hooks (useTasks) fetch from local API routes (/api/tasks) while server routes and lib/backendApi already fetch the backend; there is duplicated request/error parsing logic.
   **Why it is a problem**: Adds latency, duplicate parsing code, and increases maintenance points.
   **How to improve it**: Prefer server components fetching directly via lib/backendApi for initial render. If API routes are needed, keep them as thin adapters and centralize error parsing in one place.

3. **Activity filtering/search implemented twice**
   **What is wrong**: applyFilterA and applyFilterB exist with near-identical behavior; two formatTime functions also duplicate logic.
   **Why it is a problem**: Confusion and potential for diverging bugs; harder to maintain.
   **How to improve it**: Consolidate filtering and formatting helpers into a util (e.g., utils/format.ts) or create useActivity hook to encapsulate logic.

4. **Frontend only uses GET endpoints - no add/update/delete operations**
   **What is wrong**: Frontend only implements getTasks and getActivity read-only flows; no UI for creating, updating, or deleting tasks or activities.
   **Why it is a problem**: App is effectively read-only; users cannot mutate state. Backend endpoints for mutations exist but aren't consumed.
   **How to improve it**: Implement TaskForm and ActivityForm components; wire POST/PUT/PATCH/DELETE calls to backend via lib/backendApi; add optimistic updates or SWR revalidation.


## Performance

1. **Large client bundles due to overuse of `use client`**
   **What is wrong**: Many components and pages are client components but only need server rendering for initial data.
   **Why it is a problem**: Increases JS payload, slows TTFB/TTI and reduces SEO benefits.
   **How to improve it**: Convert pages that only render lists to server components; keep only interactive widgets (filters, toggles) as client components.

2. **No debounce on search input**
   **What is wrong**: Search/filter runs on every keystroke synchronously.
   **Why it is a problem**: Causes jank on large lists and degrades perceived performance.
   **How to improve it**: Debounce input (200–400ms) and memoize filter results with useMemo.

3. **Client-side polling and cloning**
   **What is wrong**: setInterval + cloning forcedList causes unnecessary memory churn.
   **Why it is a problem**: Increased GC pressure, potential memory spikes on low-end devices.
   **How to improve it**: Only update state when remote data changes; use structured compare or IDs to determine minimal updates.

4. **Overuse of client rendering**
   **What is wrong**: Several pages/components are client-rendered although server rendering (SSR/SSG/ISR) is suitable.
   **Why it is a problem**: Larger client bundles and degraded first paint/SEO.
   **How to improve it**: Move non-interactive pages to server components and use SSR/SSG/ISR as appropriate.


## Maintainability

1. **Duplicate HTTP/error parsing logic**
   **What is wrong**: requestJson in useTasks duplicates parseError and fetch logic in lib/backendApi.
   **Why it is a problem**: Bug surface area increases; fixing one copy may leave others inconsistent.
   **How to improve it**: Centralize network helpers in lib and import them where needed. Provide small adapters for client code when necessary.

2. **Sparse componentization for Activity UI**
   **What is wrong**: Activity page renders list markup inline with inline styles rather than extracting ActivityItem/ActivityList components.
   **Why it is a problem**: Reduced reusability, harder to unit-test, and more brittle UI changes.
   **How to improve it**: Extract ActivityItem and ActivityList components and a useActivity hook. Keep markup/tests/styles in single places.

3. **Tasks structured; Activity is not**
   **What is wrong**: Tasks area is organized with TaskDashboard, TaskList, TaskItem and useTasks hook; Activity uses ad-hoc inline code without dedicated components or hooks.
   **Why it is a problem**: Makes Activity harder to maintain and extend, and increases duplication.
   **How to improve it**: Mirror the Tasks structure: create ActivityDashboard, ActivityList, ActivityItem and a useActivity hook; reuse shared UI primitives.

4. **No validation library in place**
   **What is wrong**: There is no validation/schema library used for potential forms or inputs.
   **Why it is a problem**: Manual validation is error-prone and inconsistent; no safety when adding mutation forms.
   **How to improve it**: Adopt zod with react-hook-form or a similar combination for future forms/validation.

5. **No state management for scaling**
   **What is wrong**: App uses local state and ad-hoc hooks only.
   **Why it is a problem**: As features grow, coordinating state and caching becomes harder.
   **How to improve it**: Consider react-query/SWR for server state, or Context/recoil for client state depending on needs.

6. **No axios / centralized HTTP client**
   **What is wrong**: Fetch calls are scattered; no shared HTTP client config (timeouts, interceptors, defaults).
   **Why it is a problem**: Hard to standardize auth headers, retry logic, logging across all requests.
   **How to improve it**: Introduce axios or a thin wrapper around fetch in lib/backendApi with centralized config.

7. **Inline styles scattered across components**
   **What is wrong**: Repeated inline style objects in TaskItem, TaskList, page components.
   **Why it is a problem**: Hard to theme and maintain; inconsistent style variations.
   **How to improve it**: Move styles to globals.css, CSS modules, or adopt a utility CSS framework (Tailwind). Define shared class names for cards, stacks, buttons.

8. **No testing or CI in frontend**
   **What is wrong**: No unit tests or lint scripts detected in frontend package.json.
   **Why it is a problem**: Refactoring is risky; regressions might be introduced undetected.
   **How to improve it**: Add basic Jest/React Testing Library tests for useTasks and TaskItem, and add ESLint/Prettier and CI workflow.


## UX / Accessibility

1. **Missing global navigation**
   **What is wrong**: RootLayout lacks a global navbar; navigation is duplicated per page using a small Back link.
   **Why it is a problem**: Inconsistent navigation and poor discoverability of app areas.
   **How to improve it**: Introduce a header in RootLayout with links to Tasks and Activity and an active state. Add Reports nav link when /reports is implemented.

2. **Activity feed presentation is terse and duplicative**
   **What is wrong**: Feed shows action/info and two identical timestamps (formatTimeA/B).
   **Why it is a problem**: Hard to scan; duplicate information wastes space.
   **How to improve it**: Present a single human-friendly relative timestamp and use a tooltip or expanded view for full timestamp. Improve semantic HTML (use `<time>` element with datetime attribute). Add clear action keys/labels so each entry is scannable.

3. **Missing error/loading components for Activity**
   **What is wrong**: Activity silently falls back to empty arrays on fetch errors and has no loading UI.
   **Why it is a problem**: Users get no feedback during load or on failure.
   **How to improve it**: Add a loading skeleton/card and an error card with retry for the Activity page, matching the Tasks patterns.

4. **No CSS library for consistent styling**
   **What is wrong**: App uses custom CSS only; no utility or component library is used.
   **Why it is a problem**: Slower to implement consistent UIs across screens; harder to achieve polished results.
   **How to improve it**: Consider Tailwind or a component library (Radix + Tailwind) to speed styling and maintain consistency. Bootstrap is acceptable if preferred.

5. **Activity page filter UI incomplete**
   **What is wrong**: Activity has only a search input; other filters are hinted but not implemented.
   **Why it is a problem**: Partial UI confuses users.
   **How to improve it**: Implement filter controls (e.g., by action type, date range) or remove placeholders.

6. **Accessibility gaps**
   **What is wrong**: Some interactive controls miss aria-labels; focus/contrast not explicit.
   **Why it is a problem**: Users relying on assistive tech will have worse experience; potential WCAG issues.
   **How to improve it**: Add aria-labels for search/controls, ensure color contrast, add keyboard focus styles and test with axe.

7. **Activity UI lacks meaningful keys and scannability**
   **What is wrong**: Activity items do not clearly highlight action keys and contextual metadata; timestamps are duplicated and hard to distinguish.
   **Why it is a problem**: Users must parse verbose text; poor information hierarchy reduces usability.
   **How to improve it**: Add clear action/type labels, distinct timestamp (single relative + full datetime), and structured metadata. Use consistent keys (e.g., taskId, actor, action) so items are skim-friendly.


## Code Quality

1. **Confusing variable names and leftover state**
   **What is wrong**: tick, forcedList, and similar variables obfuscate intent.
   **Why it is a problem**: Reduces readability, onboarding friction, and bugs during refactor.
   **How to improve it**: Rename variables to intent-driven names or remove them if unused. Add short comments for complex logic.

2. **No validation library**
   **What is wrong**: Validation is done manually rather than via a schema library.
   **Why it is a problem**: Manual validation is inconsistent and error-prone; will compound as forms are added.
   **How to improve it**: Adopt zod (or similar) for validation/schemas and integrate with forms.

3. **Client/server duplication of adapters**
   **What is wrong**: Multiple layers (client -> /api -> lib -> backend) implement similar parsing and error handling.
   **Why it is a problem**: Harder to trace errors and fix bugs.
   **How to improve it**: Choose a single authoritative place for parsing (lib) and keep adapters minimal.

4. **Generic error handling loses context**
   **What is wrong**: Errors are converted to simple strings and displayed while original stacks are lost.
   **Why it is a problem**: Debugging production issues becomes harder.
   **How to improve it**: Log full errors server-side and return concise, user-facing messages to the client.


## React / Next.js Best Practices

1. **Prefer server components for static/deterministic content**
   **What is wrong**: Pages that only render data are client-rendered instead of server-rendered.
   **Why it is a problem**: Loses SSR benefits (SEO, TTFB) and increases client bundle size.
   **How to improve it**: Convert Task listing and Activity listing to server components. Use client components for interactive child controls.

2. **Use SSR/SSG/ISR where appropriate**
   **What is wrong**: Entirely client-side fetching is used for initial data.
   **Why it is a problem**: Slower first paint and suboptimal caching.
   **How to improve it**: Use SSG/ISR for stable task lists; SSR for frequently updated pages; SWR or react-query for client-side mutations/refreshes.

3. **Limit `use client` to minimal interactive components**
   **What is wrong**: Top-level modules and pages are marked `use client` unnecessarily.
   **Why it is a problem**: Broadens the client bundle surface.
   **How to improve it**: Refactor to server components and only mark small interactive components as client.

4. **Overuse of client rendering**
   **What is wrong**: Many pages/components are marked `use client` even though SSR or SSG would be more appropriate.
   **Why it is a problem**: Increases bundle size and degrades first-pass rendering performance.
   **How to improve it**: Move data-fetching to server components and only keep minimal client interactivity where needed.


## Short-term recommended roadmap
1. Standardize networking helpers in lib and thin API adapters.
2. Convert Tasks page to a server component using lib/getTasksFromBackend.
3. Extract useActivity and ActivityItem components; unify formatting helpers.
4. Replace setInterval polling with conditional polling or real-time transport.
5. Improve loading/error UX and accessibility.
6. Add ESLint/Prettier and a handful of unit tests for hooks/components.
7. Migrate mutations to use centralized axios/lib layer and zod validation.
8. Implement global navbar and /reports page.