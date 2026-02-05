
# AgriHerd Solutions - SaaS Transformation Plan

## Overview

This plan transforms the current AgriHerd Solutions application into a fully functional SaaS platform with:
- Neat, organized navigation menu
- User authentication (Email/Password + Google OAuth)
- Personalized user dashboards with data management
- M-Pesa payment integration for the store
- Database persistence using Supabase/Lovable Cloud

---

## Phase 1: Navigation Menu Reorganization

### Current Issues
- Menu items are cluttered and lack visual hierarchy
- "Show Demo" button pattern is confusing for a production SaaS
- Navigation needs clearer organization

### Proposed Navigation Structure

The navigation will be reorganized into logical groups:

```text
+-------------------------------------------------------------------+
|  [Logo] AgriHerd Solutions           [Login/Dashboard]  [Profile] |
+-------------------------------------------------------------------+
| Home | Farm Management v | Store | Calendar | My Dashboard        |
|                |                                                  |
|                +-- Pig Management                                 |
|                +-- Goat & Sheep (future)                          |
|                +-- Inventory                                      |
|                +-- Staff Management                               |
|                +-- Sales                                          |
+-------------------------------------------------------------------+
```

### Changes
- Remove "Show Demo" toggle - all features will be accessible directly
- Group farm management features under a dropdown menu
- Add Login/Signup buttons for unauthenticated users
- Add Dashboard and Profile links for authenticated users
- Improve mobile navigation with a proper hamburger menu

---

## Phase 2: Authentication System Setup

### Backend Setup (Supabase/Lovable Cloud)

1. **Enable Lovable Cloud** with Supabase backend
2. **Create database tables:**

   **profiles table:**
   - id (uuid, references auth.users)
   - farm_name (text)
   - contact_phone (text)
   - location (text)
   - farm_type (text) - pig, mixed, crop, etc.
   - avatar_url (text)
   - created_at (timestamp)
   - updated_at (timestamp)

   **user_roles table** (for future admin features):
   - id (uuid)
   - user_id (uuid, references auth.users)
   - role (enum: user, admin)

3. **Row Level Security (RLS) policies:**
   - Users can only read/update their own profile
   - Users can only access their own farm data

### Frontend Authentication Pages

1. **Login Page** (`/login`)
   - Email/password login form
   - "Sign in with Google" button
   - Link to signup page
   - Forgot password link

2. **Signup Page** (`/signup`)
   - Email/password registration
   - "Sign up with Google" button
   - Farm name, phone, location fields
   - Terms and conditions checkbox

3. **Password Reset Page** (`/reset-password`)
   - Email input for reset link

### Auth Context
- Create AuthContext provider to manage authentication state
- Protected route wrapper for authenticated-only pages
- Auto-redirect logged-in users to dashboard

---

## Phase 3: User Dashboard

### Dashboard Features (`/dashboard`)

The dashboard will be the central hub for logged-in users with:

1. **Welcome Section**
   - User's farm name and greeting
   - Quick stats overview (total pigs, pending tasks, recent sales)

2. **Quick Actions**
   - Add new pig
   - Record sale
   - Schedule event
   - View inventory alerts

3. **Overview Cards**
   - Total livestock count
   - Upcoming calendar events (next 7 days)
   - Recent sales (last 5)
   - Low stock alerts

4. **Activity Feed**
   - Recent actions taken
   - System notifications

### Data Migration to Database

All current in-memory data will be migrated to Supabase tables:

**pigs table:**
- All pig fields + user_id foreign key
- RLS: users see only their pigs

**staff table:**
- All staff fields + user_id foreign key
- RLS: users see only their staff

**inventory table:**
- All inventory fields + user_id foreign key
- RLS: users see only their inventory

**sales table:**
- All sales fields + user_id foreign key
- RLS: users see only their sales

**calendar_events table:**
- All event fields + user_id foreign key
- RLS: users see only their events

---

## Phase 4: Store Section with M-Pesa Integration

### Store Improvements

1. **Product Management** (for future admin panel)
   - Products stored in database
   - Admin can add/edit/remove products

2. **Cart Persistence**
   - Cart saved in localStorage for guests
   - Cart synced to database for logged-in users

3. **Checkout Flow**
   - Order summary page
   - Customer details form
   - M-Pesa payment integration

### M-Pesa Integration

**Important Note:** M-Pesa integration requires:
- Safaricom Daraja API credentials (Consumer Key, Consumer Secret)
- Business shortcode (Paybill/Till number)
- Passkey for STK Push

**Integration Architecture:**

```text
User clicks "Pay with M-Pesa"
        |
        v
Frontend sends order to Edge Function
        |
        v
Edge Function initiates STK Push via Daraja API
        |
        v
User receives M-Pesa prompt on phone
        |
        v
User enters PIN
        |
        v
Daraja callback notifies Edge Function
        |
        v
Edge Function updates order status
        |
        v
Frontend shows success/failure
```

**Edge Function Requirements:**
- `initiate-mpesa-payment` - Initiates STK Push
- `mpesa-callback` - Receives payment confirmation

**Orders Table:**
- id, user_id, items (json), total, status, mpesa_receipt, created_at

---

## Phase 5: Feature Testing & Polish

### All Features to Verify

1. **Pig Management**
   - Add, edit, view pigs - data persists to database
   - Heat cycle tracking works
   - Reports and charts display correctly

2. **Staff Management**
   - Add, edit staff members
   - Search and filter functionality
   - Data persists correctly

3. **Inventory Management**
   - Add items to produce/feed tabs
   - Low stock alerts work
   - Charts display correctly

4. **Sales Management**
   - Add new sales
   - Dashboard charts update
   - Filter and search work

5. **Calendar**
   - Add events
   - View upcoming events
   - Urgent alerts display

6. **Store**
   - Add to cart
   - Cart summary updates
   - M-Pesa checkout works

---

## Implementation Order

| Step | Task | Dependencies |
|------|------|--------------|
| 1 | Enable Lovable Cloud with Supabase | None |
| 2 | Create database schema and tables | Step 1 |
| 3 | Reorganize Navigation component | None |
| 4 | Create Auth pages (Login, Signup, Reset) | Step 1, 2 |
| 5 | Create AuthContext and protected routes | Step 4 |
| 6 | Build Dashboard page | Step 5 |
| 7 | Migrate Pig Management to database | Step 2, 5 |
| 8 | Migrate Staff Management to database | Step 2, 5 |
| 9 | Migrate Inventory to database | Step 2, 5 |
| 10 | Migrate Sales to database | Step 2, 5 |
| 11 | Migrate Calendar to database | Step 2, 5 |
| 12 | Request M-Pesa API credentials from user | None |
| 13 | Create M-Pesa edge functions | Step 12 |
| 14 | Implement checkout flow | Step 13 |
| 15 | End-to-end testing | All previous |

---

## New Files to Create

1. `src/pages/Login.tsx` - Login page
2. `src/pages/Signup.tsx` - Signup page
3. `src/pages/ResetPassword.tsx` - Password reset page
4. `src/pages/Dashboard.tsx` - User dashboard
5. `src/contexts/AuthContext.tsx` - Authentication state management
6. `src/components/ProtectedRoute.tsx` - Route guard for authenticated pages
7. `src/integrations/supabase/client.ts` - Supabase client
8. `src/integrations/supabase/types.ts` - TypeScript types
9. `supabase/functions/initiate-mpesa-payment/index.ts` - M-Pesa STK Push
10. `supabase/functions/mpesa-callback/index.ts` - Payment callback handler

---

## Files to Modify

1. `src/components/Navigation.tsx` - Reorganize menu structure
2. `src/App.tsx` - Add new routes, wrap with AuthProvider
3. `src/pages/Store.tsx` - Add M-Pesa checkout
4. `src/components/PigManagement.tsx` - Connect to database
5. `src/pages/StaffManagement.tsx` - Connect to database
6. `src/pages/InventoryManagement.tsx` - Connect to database
7. `src/pages/SalesManagement.tsx` - Connect to database
8. `src/components/FarmCalendar.tsx` - Connect to database

---

## Prerequisites Before Implementation

1. **Lovable Cloud must be enabled** for Supabase integration
2. **Google OAuth** requires configuration in Supabase Dashboard
3. **M-Pesa Integration** requires Safaricom Daraja API credentials:
   - Consumer Key
   - Consumer Secret
   - Business Shortcode
   - Passkey

---

## Summary

This plan transforms AgriHerd Solutions into a production-ready SaaS by:

- Cleaning up navigation for better user experience
- Adding secure authentication with email and Google login
- Creating personalized dashboards for each farm
- Persisting all data to a database with proper user isolation
- Integrating M-Pesa for real payments in the store
- Ensuring all existing features work correctly with the new architecture

