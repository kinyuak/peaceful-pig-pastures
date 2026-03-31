ALTER TABLE public.profiles 
  ADD COLUMN IF NOT EXISTS account_type text DEFAULT 'farmer',
  ADD COLUMN IF NOT EXISTS trial_start_date timestamptz DEFAULT now(),
  ADD COLUMN IF NOT EXISTS trial_active boolean DEFAULT true;