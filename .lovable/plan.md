

# Fix All Dashboard Features & Add Login Bypass

## Overview
Ensure every sidebar link works, all dashboard features function properly, add login bypass buttons, and create a full Organization dashboard with farmer management.

## Changes

### 1. Add Login Bypass Buttons (`src/pages/Login.tsx`)
- Add two bypass buttons below the Google login: "Bypass as Farmer" and "Bypass as Organization"
- These call a helper that signs in with a test account or sets a mock user in AuthContext
- Simplest approach: create two test accounts via `signUp` on first click, then `signIn` automatically
- Alternative (faster): add a `bypassLogin` method to AuthContext that sets a fake user/session locally without hitting Supabase auth, allowing dashboard access

Best approach: Add a `bypassLogin(accountType)` method to `AuthContext` that creates a mock user object and profile, sets `user` and `profile` state directly, bypassing Supabase. The `ProtectedRoute` only checks `if (!user)` so this works.

### 2. Create Missing Pages

The sidebar has links to `/crops`, `/labour`, `/ai-assistant`, `/settings` — none have routes or pages.

**Create `src/pages/CropsManagement.tsx`:**
- Crop registry (name, type, field/plot, planting date, expected harvest, status)
- Add crop form dialog
- Summary cards (total crops, active fields, upcoming harvests)
- Simple table with demo data

**Create `src/pages/LabourServices.tsx`:**
- Book labour form (task type, date, workers needed, location, notes)
- Requests table showing status (Pending, Confirmed, Completed)
- Demo data with sample requests

**Create `src/pages/AIAssistant.tsx`:**
- Simple chat-style UI with a text input
- Placeholder responses or connect to Lovable AI (gemini-2.5-flash)
- Show suggestions like "Ask about pig breeding", "Crop disease diagnosis"

**Create `src/pages/Settings.tsx`:**
- Profile editing form (farm name, phone, location, farm type)
- Uses `useAuth().updateProfile()` to save
- Avatar upload placeholder
- Account info display (email, account type, trial status)

### 3. Create Organization Dashboard (`src/pages/OrgDashboard.tsx`)

When `profile.account_type === 'organization'`, the Dashboard page shows an organization view:

- **Farmers Management section:** Table of farmers under the organization, with "Add Farmer" button
- **Aggregated Stats:** Total animals across all farmers, total revenue, total staff
- **Farm Overview:** Cards for each farmer showing their farm name, location, animal count
- For now, this uses local state with demo data (no new DB tables yet)

Alternatively, modify `Dashboard.tsx` to conditionally render Org vs Farmer dashboard based on `profile.account_type`.

### 4. Add All Missing Routes (`src/App.tsx`)
Add routes for:
- `/crops` → CropsManagement
- `/labour` → LabourServices  
- `/ai-assistant` → AIAssistant
- `/settings` → Settings

All wrapped in `ProtectedDashboard`.

### 5. Fix Existing Feature Issues
- **Inventory "Add New Item":** The save button doesn't actually add items to the list — wire up `handleAddItem` to append to state
- **Store cart:** Cart button shows count but clicking it does nothing — add a cart drawer/dialog showing items with remove/checkout buttons

## Files to Create
1. `src/pages/CropsManagement.tsx`
2. `src/pages/LabourServices.tsx`
3. `src/pages/AIAssistant.tsx`
4. `src/pages/Settings.tsx`

## Files to Modify
1. `src/pages/Login.tsx` — Add bypass buttons
2. `src/contexts/AuthContext.tsx` — Add `bypassLogin` method
3. `src/App.tsx` — Add 4 new routes
4. `src/pages/Dashboard.tsx` — Add org dashboard view conditionally
5. `src/pages/InventoryManagement.tsx` — Fix add item to actually save to state
6. `src/pages/Store.tsx` — Add cart drawer with item list and checkout

## Technical Notes
- Bypass login creates a mock user with `id: 'bypass-farmer'` or `'bypass-org'` and sets profile with appropriate `account_type`
- No database changes needed — all new pages use local state with demo data
- Organization dashboard shows a "Farmers" tab with ability to add/view farmer entries (local state)
- Settings page uses existing `updateProfile` from AuthContext for real saves

