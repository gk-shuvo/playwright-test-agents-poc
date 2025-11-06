# Dashboard Page — Test Plan

## Executive Summary

This test plan covers the admin/e-commerce dashboard located at the `(admin)` route (`src/app/(admin)/page.tsx`). The dashboard shows metrics, multiple charts, a demographic map, and a Recent Orders table. The plan focuses on basic operations, UI interactions, and edge cases so QA can verify stability and usability.

## Assumptions

- Tests start from a fresh browser session (no cached auth or local storage).
- The application is served and reachable at a known base URL (e.g. `http://localhost:3000`). Tester will navigate to the admin route (e.g. `/` or `/admin`) depending on routing.
- Data rendered in components is static/seeding data from the UI components in `src/components/ecommerce`.
- Dynamic charts are provided by `react-apexcharts` and render client-side; flaky rendering is possible in headless runs and should be accounted for.

## Test Environment

- Browser: Chromium (Playwright)
- Viewports: Desktop: 1280x800; Tablet: 768x1024; Mobile: 375x812
- Starting state: blank/fresh session, not authenticated unless app requires.

---

## Test Scenarios

### 1. Page Load — Dashboard Visible

Assumption: App is running and route resolves to the admin dashboard.

Steps:
1. Navigate to the dashboard route (for example `http://localhost:3000/` or `http://localhost:3000/admin`).
2. Wait for the page to finish loading.

Expected Results:
- Page status loads without uncaught errors.
- Key sections are visible: "Monthly Sales", "Monthly Target", "Statistics", "Customers Demographic", "Recent Orders", and the metrics tiles showing "Customers" and "Orders".

Success criteria:
- All headings listed above are present in the DOM.
- No blocked network or console errors related to chart rendering (allow warnings from dynamic import).

Failure conditions:
- Page remains blank or major components fail to render.

---

### 2. Metric Tiles — Content and Badges

Steps:
1. Locate the metric tiles header values (look for the texts "Customers" and "Orders").
2. Verify the numeric values are present (e.g. `3,782`, `5,359`).
3. Verify the presence of percentage badges and their directions (ArrowUp/ArrowDown icons and percentage text).

Expected Results:
- Tiles display the correct label and numeric values.
- Badges are visible and display percentage text (e.g. `11.01%`).

Success criteria:
- Each metric tile shows label, count, and a badge with percent.

Failure conditions:
- Missing label, missing counts, or missing badge elements.

---

### 3. Monthly Sales Chart — Render and Dropdown

Steps:
1. Locate the "Monthly Sales" widget heading.
2. Confirm the chart area (Apex chart) is present (container with a rendered SVG or canvas).
3. Click the More (three-dot) button (element with class `dropdown-toggle` in the widget).
4. Verify the dropdown opens and shows options "View More" and "Delete".
5. Click outside the dropdown to close it and verify it closes.
6. Re-open dropdown and click the "View More" option.

Expected Results:
- The chart renders with axis labels (month names) or a visible chart canvas.
- Dropdown opens when More button clicked and closes on outside click.
- Clicking the dropdown item triggers its callback (no errors) and dropdown closes.

Success criteria:
- Dropdown opens and closes reliably; items are clickable.
- Chart is present and not blank.

Failure conditions:
- Dropdown does not open/close or throws errors.
- Chart container is empty or throws rendering errors.

---

### 4. Monthly Target — Radial Chart and CTA content

Steps:
1. Find the "Monthly Target" widget.
2. Check radial chart area is present and displays a value (e.g. `75%` or visible gauge).
3. Click the More (three-dot) button and validate dropdown items similar to scenario 3.
4. Verify the contextual summary text below the radial chart is readable (the paragraph with summary earnings).

Expected Results:
- Radial chart area is present and displays a value.
- Dropdown behaves as expected.
- Summary text content is visible and contains the expected sentence fragment.

Success criteria:
- Visual indicator for target and context text are present.

Failure conditions:
- Missing radial chart or unreadable summary text.

---

### 5. Statistics Chart — ChartTab toggles

Steps:
1. Locate the "Statistics" widget and the ChartTab buttons: `Monthly`, `Quarterly`, `Annually`.
2. Click each tab in sequence: `Monthly` → `Quarterly` → `Annually`.
3. Observe visual active state changes on the clicked tab (class change/highlight) and that chart updates (if chart changes data or appearance).

Expected Results:
- The active tab has distinct styling (shadow or different background/text color).
- Clicking tabs does not produce errors and the chart remains visible.

Success criteria:
- Each tab becomes active when clicked and shows a visible state change.

Failure conditions:
- Tabs not clickable or no visual active state change.

---

### 6. Customers Demographic — Map and Progress Bars

Steps:
1. Confirm the "Customers Demographic" widget is visible.
2. Verify the map container (`#mapOne`) exists and `CountryMap` component renders or placeholder is present.
3. Confirm the list entries for top countries (USA, France) are visible with counts and percentage bars.
4. Click the More (three-dot) button and validate the dropdown items.

Expected Results:
- Map container is present and not throwing console errors.
- Country rows display name, customer counts, progress bar and percent values (e.g. `79%`, `23%`).

Success criteria:
- Country rows are correctly rendered and progress bars have visible widths.

Failure conditions:
- Map missing and rows absent.

---

### 7. Recent Orders Table — Content, Buttons, and Status Badges

Steps:
1. Locate the "Recent Orders" table and check that headers exist: `Products`, `Category`, `Price`, `Status`.
2. Verify at least 1 row exists and contains a product image, product name, variant text, price, category, and a status Badge (Delivered/Pending/Canceled).
3. Click the `Filter` button and validate its clickable behavior (no action required but should not crash).
4. Click the `See all` button and verify navigation or no-op (depending on implementation). If it navigates, validate destination loads.

Expected Results:
- Table headers and rows are present.
- Status badges display one of `Delivered`, `Pending`, or `Canceled` with matching color classes (success/warning/error mapping).

Success criteria:
- Table rows rendered and buttons are interactive without console errors.

Failure conditions:
- Table is empty or images fail to load leading to broken layout.

---

### 8. Dropdown Behavior and Outside Click

Steps:
1. For any open dropdown (e.g. More button in different widgets), click to open.
2. Click somewhere outside the dropdown (e.g. page body) and confirm the dropdown closes.
3. While open, press `Escape` (if supported) and confirm dropdown closes.

Expected Results:
- Dropdown closes on outside click and on Escape key if implemented.

Success criteria:
- No lingering dropdowns and no console errors on close.

Failure conditions:
- Dropdown remains open or event handlers throw.

---

### 9. Accessibility & Keyboard Navigation

Steps:
1. Tab through the page from top to bottom.
2. Focus should land on interactive elements in logical order: dropdown toggles, ChartTab buttons, Filter/See all buttons, table links.
3. Use Enter/Space to activate focused elements (open dropdown, trigger buttons).

Expected Results:
- Interactive controls are reachable by keyboard and operable with Enter/Space.

Success criteria:
- Keyboard navigation reaches primary controls and activates them.

Failure conditions:
- Controls are inaccessible via keyboard.

---

### 10. Responsive Layout Checks

Steps:
1. Set viewport to tablet size (768x1024) and refresh. Verify the major widgets remain visible and layout is usable.
2. Set viewport to mobile size (375x812) and refresh. Confirm widgets stack appropriately and text remains readable.

Expected Results:
- Layout adapts without clipping critical content; charts may become horizontally scrollable.

Success criteria:
- No overflowing or unreadable text on smaller viewports; key actions remain reachable.

Failure conditions:
- Overflows, unreadable elements, or broken layout.

---

## Edge Cases and Negative Tests

- Chart library fails to initialize: verify UI degrades gracefully (placeholders or no JS errors).
- Rapidly toggle dropdowns multiple times to check for race conditions.
- Network error for images: verify placeholder behavior and layout stability.
- Table with zero rows: verify headers and empty state (if implemented) show correctly.

---

## Selectors & Notes (for automation)

- Headings: text selectors like `text=Monthly Sales`, `text=Monthly Target`, `text=Statistics`, `text=Customers Demographic`, `text=Recent Orders`.
- Dropdown toggle buttons: `.dropdown-toggle` class (click to open widget menu).
- ChartTab buttons: `text=Monthly`, `text=Quarterly`, `text=Annually`.
- Recent Orders table headers: `text=Products`, `text=Category`, `text=Price`, `text=Status`.
- Map container: `#mapOne`.
- Metric labels: text selectors `text=Customers`, `text=Orders`.

---

## Test Data and Environment Steps

- Start the app (e.g. `pnpm dev` or `npm run dev`).
- Confirm base URL (commonly `http://localhost:3000`).
- Run tests with Playwright using the specified viewports where applicable.

---

## Sign-off Criteria

- All high-priority scenarios (Page Load, Charts render, Dropdowns, Table) pass without critical console errors.
- Keyboard navigation and responsive checks pass on the defined viewports.

---

*Prepared by test planner — use this file to create automated Playwright tests or share with QA for manual runs.*
