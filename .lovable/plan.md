

# AgriHerd Solutions - SaaS Landing Page Transformation

## Overview
Complete redesign of the public-facing website into a modern, investor-ready SaaS landing page inspired by Stripe/Linear/Notion. The current 1,491-line LandingPage component and navigation will be replaced with a clean, conversion-focused one-page design. The post-login experience gets a sidebar-based dashboard.

## What Changes

### 1. Update Color System
- Change primary green from `142 76% 36%` to Deep Green matching `#1B5E20` (approx `122 76% 24%`)
- Keep white/light gray backgrounds
- Ensure Inter font is loaded

### 2. Completely Rewrite Landing Page (`src/components/LandingPage.tsx`)
Replace the current 1,491-line component with a clean SaaS landing page containing these sections in order:

1. **Hero** - Bold headline, subtext, two CTAs (Start Free Trial + Book Demo), dashboard mockup image
2. **Trust Bar** - "Built for modern agriculture across Africa" + placeholder partner logos
3. **Who It's For** - 4 cards: Farmers, Cooperatives, Agribusinesses, Counties/Organizations
4. **Value Proposition** - "Everything You Need to Run a Modern Farm Operation" with 5 outcome-focused benefit blocks
5. **Feature Categories** - 6 abstracted cards (Farm Management, Livestock Tracking, Sales & Inventory, Workforce Management, Marketplace Access, AI Insights)
6. **How It Works** - 3-step flow with icons
7. **Pricing** - 4 tiers (Starter, Growth, Pro, Enterprise) with "5-Day Free Trial" badge
8. **Final CTA** - "Start Managing Your Farm the Smart Way"
9. **Footer** - Company info, contact, socials, links

Remove all existing sections: About, Solutions, Features, Featured Products, Consultancy, Labour Booking, Team, Testimonials, Contact Form, Feedback Form. These features move behind the dashboard.

### 3. Simplify Public Navigation (`src/components/Navigation.tsx`)
The public nav becomes minimal:
- Logo + "AgriHerd Solutions"
- Links: Features, Pricing, Book Demo
- CTAs: Login, Start Free Trial
- Remove: Store, Calendar, Farm Management dropdown (all move behind auth)

### 4. Update Signup Page (`src/pages/Signup.tsx`)
- Add "Account Type" selector: Farmer / Organization
- Add trial logic: store `trial_start_date` in profiles table
- Keep existing fields (farm name, email, password, phone, location)

### 5. Database Migration
Add columns to `profiles` table:
- `account_type` (text, default 'farmer') - farmer or organization
- `trial_start_date` (timestamptz, default now())
- `trial_active` (boolean, default true)

### 6. Build Post-Login Dashboard with Sidebar (`src/pages/Dashboard.tsx`)
Replace current top-nav dashboard with a sidebar layout using SidebarProvider:

**Sidebar items:**
- Dashboard, Animals, Crops, Sales, Inventory, Staff, Marketplace, Labour Services, AI Assistant, Settings

**Dashboard view:**
- Summary cards (Total animals, Revenue, Tasks)
- Charts area (placeholder)
- Alerts panel

### 7. Update Routing (`src/App.tsx`)
- Public routes: `/` (landing), `/login`, `/signup`, `/reset-password`
- Protected routes: `/dashboard`, `/pigs`, `/calendar`, `/inventory`, `/staff`, `/sales`, `/store`
- All management pages wrapped in ProtectedRoute + sidebar layout

### 8. Create Shared Dashboard Layout Component
`src/components/DashboardLayout.tsx` - wraps protected pages with sidebar + header

### 9. Add Scroll Animations
Add intersection observer-based fade-in animations on the landing page sections using a custom hook.

---

## Technical Details

### Files to Create
- `src/components/DashboardLayout.tsx` - Sidebar layout wrapper
- `src/components/DashboardSidebar.tsx` - Sidebar navigation component
- `src/hooks/useScrollAnimation.ts` - Intersection observer hook for fade-in

### Files to Heavily Modify
- `src/components/LandingPage.tsx` - Complete rewrite (~400 lines vs current 1,491)
- `src/components/Navigation.tsx` - Simplify for public pages
- `src/pages/Dashboard.tsx` - Sidebar layout + real summary cards
- `src/pages/Signup.tsx` - Add account type + trial fields
- `src/App.tsx` - Restructure routes with DashboardLayout
- `src/index.css` - Update primary color, add Inter font, scroll animation classes

### Files to Lightly Modify
- `src/pages/Store.tsx` - Wrap in DashboardLayout, remove Navigation import
- `src/pages/StaffManagement.tsx` - Wrap in DashboardLayout
- `src/pages/InventoryManagement.tsx` - Wrap in DashboardLayout
- `src/pages/SalesManagement.tsx` - Wrap in DashboardLayout

### Database Migration
```sql
ALTER TABLE public.profiles 
  ADD COLUMN account_type text DEFAULT 'farmer',
  ADD COLUMN trial_start_date timestamptz DEFAULT now(),
  ADD COLUMN trial_active boolean DEFAULT true;
```

### Key Design Decisions
- Landing page hides ALL complexity - no feature lists, no product catalogs
- Everything operational lives behind authentication in the sidebar dashboard
- Pricing drives conversion with trial badges
- Scroll animations use Intersection Observer (no heavy library)
- Sidebar uses shadcn Sidebar component with `collapsible="icon"` for mini mode

