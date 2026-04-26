
# Multi-Species Livestock + Admin Dashboard + Mobile Polish

## Overview

Three coordinated upgrades:

1. **Multi-species livestock management** — Generalize the "Animals" section so users can manage Cattle, Goats, Sheep, and Poultry alongside Pigs, each with species-appropriate fields.
2. **Role-based dashboards** — Add a third role (Admin) with a platform-wide overview, alongside existing Farmer and Organization views. Wire bypass + role gating end-to-end.
3. **Mobile responsiveness pass** — Audit every dashboard page (tables, dialogs, sidebars, headers) so they work cleanly down to 360px width.

---

## 1. Livestock Management Restructure

### Animals Hub
Replace the single `/pigs` route with an `/animals` hub showing species cards (Pigs, Cattle, Goats, Sheep, Poultry). Each card links to its own management page. Keep `/pigs` working for backward compatibility (redirect to `/animals/pigs`).

### New species pages (each follows the same pattern)
- `src/pages/CattleManagement.tsx` — fields: tag, breed, DOB, weight, category (Cow/Bull/Heifer/Calf), milk yield (L/day), health status, last service, expected calving date.
- `src/pages/GoatManagement.tsx` — fields: tag, breed (Boer/Galla/Toggenburg/etc), DOB, weight, category (Doe/Buck/Kid), purpose (Dairy/Meat), milk yield, kidding records.
- `src/pages/SheepManagement.tsx` — fields: tag, breed (Dorper/Merino/etc), DOB, weight, category (Ewe/Ram/Lamb), wool yield (kg/year), lambing records.
- `src/pages/PoultryManagement.tsx` — managed by **flock** rather than individual: flock name, type (Layer/Broiler/Kienyeji), bird count, age in weeks, eggs/day, mortality, vaccination schedule.

Each page includes:
- Summary cards (total, healthy, needs attention, production metric)
- Searchable + filterable table
- Add / Edit / View dialogs
- Delete with confirmation
- Health status badges
- Demo seed data (3-5 records each)

### Sidebar restructure (`DashboardSidebar.tsx`)
Replace the single "Animals" item with a collapsible **Livestock** group:
```
Livestock
├── Pigs
├── Cattle
├── Goats
├── Sheep
└── Poultry
```
Uses a collapsible accordion-style section. Stays icon-only when sidebar is collapsed.

### Animals overview page (`src/pages/AnimalsOverview.tsx`)
Grid of species cards at `/animals` showing icon, name, total count, and a "Manage" button. Acts as a hub when users click the parent group.

---

## 2. Admin Role + Dashboard

### Database migration
The `user_roles` table + `app_role` enum already exist (`admin`, `moderator`, `user`). Add an RLS policy so admins can read all profiles:
```sql
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
```

### Auth context update
- Add `role` (`'admin' | 'user' | null`) to context, fetched from `user_roles` after login.
- Extend `bypassLogin` to accept `'farmer' | 'organization' | 'admin'`. Admin bypass sets role to `'admin'` and a synthetic profile.

### Login page
Add a third bypass button: **Bypass as Admin** (Shield icon). Layout becomes a 3-column grid on tablet+, stacked on mobile.

### Admin dashboard (`src/pages/AdminDashboard.tsx`)
Shown when `role === 'admin'`. Includes:
- **Platform stats**: total users, total organizations, total farmers, active trials, expired trials
- **Recent signups** table (last 10 profiles with farm name, type, signup date)
- **Trial management** table — extend / deactivate trials per user
- **Account type distribution** chart (simple bar/pie via recharts)
- **Quick actions**: View all farmers, View all organizations, System settings

### Dashboard router (`src/pages/Dashboard.tsx`)
Update the conditional:
```
if (role === 'admin') → AdminDashboard
else if (account_type === 'organization') → OrgDashboard
else → FarmerDashboard
```

### Admin-only sidebar section
Conditionally render an **Admin** group in `DashboardSidebar.tsx` (visible only when `role === 'admin'`):
- Platform Overview → `/dashboard`
- All Users → `/admin/users`
- Trial Management → `/admin/trials`

Create stub pages `src/pages/admin/Users.tsx` and `src/pages/admin/Trials.tsx` with searchable tables.

---

## 3. Mobile Responsiveness Pass

### Header (`DashboardLayout.tsx`)
- Add farm name label that hides on mobile (`hidden sm:inline`)
- Sidebar trigger always visible at top-left
- Avatar dropdown stays accessible

### All management tables
Wrap every `<Table>` in `<div className="overflow-x-auto">` and add `min-w-[600px]` so horizontal scroll works on small screens. Pages to update:
- `PigManagement`, `CattleManagement`, `GoatManagement`, `SheepManagement`, `PoultryManagement`
- `InventoryManagement`, `SalesManagement`, `StaffManagement`
- `CropsManagement`, `LabourServices`
- `Dashboard` (org farmers table)
- `admin/Users`, `admin/Trials`

### Dialogs
Add `max-h-[90vh] overflow-y-auto` to dialog content for tall forms (Add Pig/Cattle/etc).

### Stats cards
Already use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` — verify and apply same pattern to new pages.

### Quick actions grid
Use `grid-cols-2 sm:grid-cols-4` consistently.

### Store page
- Product grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- Cart drawer: full-width sheet on mobile

---

## Files to Create

1. `src/pages/AnimalsOverview.tsx`
2. `src/pages/CattleManagement.tsx`
3. `src/pages/GoatManagement.tsx`
4. `src/pages/SheepManagement.tsx`
5. `src/pages/PoultryManagement.tsx`
6. `src/pages/AdminDashboard.tsx`
7. `src/pages/admin/Users.tsx`
8. `src/pages/admin/Trials.tsx`

## Files to Modify

1. `src/components/DashboardSidebar.tsx` — Livestock group + admin section
2. `src/components/DashboardLayout.tsx` — mobile polish
3. `src/contexts/AuthContext.tsx` — role state, admin bypass
4. `src/pages/Login.tsx` — admin bypass button, responsive grid
5. `src/pages/Dashboard.tsx` — admin routing
6. `src/App.tsx` — register new routes
7. `src/pages/Store.tsx` — responsive product grid
8. `src/pages/InventoryManagement.tsx`, `SalesManagement.tsx`, `StaffManagement.tsx`, `CropsManagement.tsx`, `LabourServices.tsx` — table overflow wrapper

## Migration

```sql
-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update profiles (for trial management)
CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view all roles
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
```

## Routes Summary

| Path | Component | Access |
|---|---|---|
| `/animals` | AnimalsOverview | Authenticated |
| `/animals/pigs` (and `/pigs`) | PigManagement | Authenticated |
| `/animals/cattle` | CattleManagement | Authenticated |
| `/animals/goats` | GoatManagement | Authenticated |
| `/animals/sheep` | SheepManagement | Authenticated |
| `/animals/poultry` | PoultryManagement | Authenticated |
| `/admin/users` | admin/Users | Admin only |
| `/admin/trials` | admin/Trials | Admin only |

## Notes

- New livestock pages use local state with seed data (no DB tables yet). Persistence can be added later as a follow-up.
- Admin-only routes still render via `ProtectedDashboard` but redirect to `/dashboard` if `role !== 'admin'`.
- Bypass admin uses a mock role; real admins must be granted via inserting into `user_roles`.
