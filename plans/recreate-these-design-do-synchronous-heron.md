# Recreate "Sortable" Mid-Fidelity Wireframe Deck

## Context
The project is an empty Vite + React + Tailwind v4 scaffold (`src/App.tsx` renders a blank div). The user supplied a 10-page PDF wireframe deck ("SORTABLE · MID-FIDELITY WIREFRAMES") covering 5 screens of a savings-goal app, each shown in phone, tablet, and desktop layouts. The goal is a faithful **presentation-deck recreation** that matches the PDF: the labeled pages, section headers, and device mockup frames rendered on screen. **No extra info, colors, icons, or layout changes** — reproduce exactly what is in the mockups.

## Approach
Build a vertically scrolling deck of 10 "pages", each matching one PDF page. Reuse device-frame chrome and screen-content components across pages. Wireframe aesthetic: grey neutrals, white cards, a single teal/petrol pop color used only for active/interactive elements (as the PDF notes repeatedly). Follow the `make:aesthetic-stance` skill at implementation start for token/font commitment, but the palette and layout are fixed by the mockups.

### Design tokens (in `src/index.css`, Tailwind v4 `@theme`)
- Pop color: teal/petrol `~#0d6a83` (buttons, active chips, active nav, progress fill, links, radio selection).
- Neutrals: page bg `#ffffff`, deck bg light grey, card borders `~#e5e7eb`, muted text `~#6b7280`, strong text near-black, chip/tag fills light grey.
- Font: a clean grotesque/sans wired via Google Fonts CSS2 `@import` in `index.css` (e.g. Inter) — matches the wireframe's neutral sans.

### File structure (`src/`)
- `App.tsx` — renders `<Deck>`: light-grey scroll surface listing all 10 pages in order.
- `components/deck/Page.tsx` — per-page shell: top rule with "SORTABLE · MID-FIDELITY WIREFRAMES" + page number (e.g. `04 / 13`), numbered section title + optional "desktop layout" suffix, description paragraph, and a device-label row (`PHONE`, `TABLET`, `DESKTOP`) with the framed mockups below.
- `components/deck/frames/PhoneFrame.tsx` — rounded phone frame with status bar (`0:00`, wifi/battery) and optional bottom tab bar (Goals/Archive/Accounts/Settings).
- `components/deck/frames/TabletFrame.tsx` — tablet frame with left icon rail (S logo, Goals/Archive) and status bar.
- `components/deck/frames/DesktopFrame.tsx` — browser-chrome window (traffic lights + address bar) with left sidebar (Sortable logo, nav, optional SAVED VIEWS block).
- `components/deck/primitives.tsx` — shared bits: `SortChip`, `Tag`, `ProgressBar`, `Radio`, `Toggle`, `NewBadge`, `PriorityFlag`, `StatTile`, `ActivityRow`, `DetailRow`, `GoalCard`, `GoalTableRow`. Icons: use `lucide-react` (install) limited to the exact icons shown (chevrons, flag, tag, calendar, wallet, plus, filter, check-circle, list, archive, bank, gear, wifi, battery, x, funnel, sort arrows).
- `components/screens/*` — the five screens' content, each exporting phone/tablet/desktop variants used by the pages:
  - `GoalList.tsx` (pages 04, 05)
  - `SortFilter.tsx` (pages 06, 07) — phone bottom sheet, tablet side drawer, desktop popover, over a dimmed list.
  - `GoalDetail.tsx` (pages 08, 09) — phone full screen, tablet two-column, desktop side panel.
  - `AddGoal.tsx` (pages 10, 11) — phone full screen, tablet modal, desktop modal over dimmed list.
  - `Archive.tsx` (pages 12, 13) — phone list, tablet w/ 3 stat tiles + table, desktop w/ 4 stat tiles + wider table.

### Content specifics to reproduce verbatim (from the PDF)
- Goals list: `Goals`, `0 active · $XXX,XX0 remaining` (tablet adds `of $XXX,XX0`; desktop adds `committed`). Sort keys per breakpoint exactly as shown (phone: Deadline/Amount/Priority + filter icon; tablet: Deadline/Amount remaining/Priority/Category; desktop adds Recently completed + Save view). Goals A–E with amounts `$0X,XX0`/`$XX,XX0`, categories, `MM / 30…31` dates, High/High/Med/Med/Low, progress 94/65/44/30/12%. Desktop table columns: GOAL, AMOUNT REMAINING, DEADLINE (active/teal, ↑), PRIORITY, CATEGORY + row chevron.
- Sort & filter: all 8 keys (Deadline, Amount remaining, Priority, Category, Closest to completion, Recently completed [NEW], Newest [NEW], Projected ROI). Phone: Reset, radio list, Ascending/Descending toggle, FILTER CATEGORY chips (All active), Apply. Tablet drawer adds THEN BY "Secondary key" select, DIRECTION Asc/Desc, all 4 category chips, Apply + "Save as a view", close X. Desktop popover: two-column layout (PRIMARY SORT | DIRECTION/THEN BY/FILTER CATEGORY), Apply + Save view, anchored under the "Deadline ▾" sort chip.
- Goal detail: `REMAINING` label, display-size `$0X,XX0`, `of $XX,XX0 · due MM / 30`, `94% complete` / `$XX,XX0 saved`, progress bar, detail rows (Category/Priority/Account ····0000/Created; tablet+desktop add Sort position 1 of 5), RECENT ACTIVITY rows (Activity label 1/2/3 with MM dates and +$ amounts), Complete + Add funds buttons. Layout per breakpoint (phone stacked w/ back+…, tablet 2-col details|activity, desktop right side panel with X over dimmed list).
- Add/edit goal: TARGET AMOUNT display input `$XX,XX0` with teal underline, GOAL NAME `Goal F`, CATEGORY chips (Category A active; phone shows A/B/C + "+ New"; tablet A–D; desktop A–D + "+ New category"), DEADLINE + ACCOUNT/FUNDING ACCOUNT fields, PRIORITY High/Med/Low segmented (High active), Reminder at 90% toggle (on), Create goal / Cancel. Desktop subtitle "Joins the list at the position the current sort gives it" and footer note "Editing reuses this form, pre-filled".
- Archive: `Archive`, `00 cleared · $XXX,XX0 funded` (desktop: `00 goals cleared · $XXX,XX0 funded to date`). Sort keys per breakpoint. Stat tiles — tablet 3 (This quarter 0 / Total funded $XXX,XX0 / Median clear XX d), desktop 4 (adds Still active 0). Goals F–I with grey completion check icons, amounts, Category A/B/A/C tags, MM dates (desktop + XX days). "Set the next focus goal — Choose ›" prompt (phone/tablet). Export / Export CSV / Set next focus goal actions as shown.

### Fidelity rules
- Reproduce only text, icons, and colors present in the mockups; the teal pop color appears only on the exact interactive/active elements the PDF calls out.
- Keep placeholder tokens literal (`$XX,XX0`, `MM / 30`, `····0000`, `XX days`).
- Match relative sizing/weights (display amounts large; section labels small uppercase grey letter-spaced; muted metadata).

## Verification
- Vite dev server is already running on `$PORT`; open the preview and scroll through all 10 deck pages.
- Visually compare each page against the corresponding PDF page (headers, page numbers, device frames, content, and single-pop-color usage).
- Confirm no console errors via `figma logs` only if something fails to render.

## Out of scope
- No interactivity/routing (static deck matching the PDF).
- No content, colors, icons, or layout beyond what the mockups show.
