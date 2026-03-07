-- 1. Ensure the role check constraint exists on the users table
ALTER TABLE public.users 
DROP CONSTRAINT IF EXISTS users_role_check;

ALTER TABLE public.users 
ADD CONSTRAINT users_role_check 
CHECK (role IN ('admin', 'supervisor', 'driver'));

-- 2. Add driver_id to users table to link user accounts to specific drivers
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS driver_id UUID REFERENCES public.drivers(id);

-- 3. Update RLS Policies for Organizations
-- Only Admins can edit organization details
DROP POLICY IF EXISTS "Admins can update organization" ON public.organizations;
CREATE POLICY "Admins can update organization" 
ON public.organizations FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.organization_id = public.organizations.id 
    AND users.role = 'admin'
  )
);

-- 4. Update RLS Policies for Users table
-- Users can see others in their organization, but only Admins can manage roles
DROP POLICY IF EXISTS "Organizational users can view each other" ON public.users;
CREATE POLICY "Organizational users can view each other" 
ON public.users FOR SELECT 
USING (
  organization_id = (SELECT organization_id FROM public.users WHERE id = auth.uid())
);

DROP POLICY IF EXISTS "Admins can manage users" ON public.users;
CREATE POLICY "Admins can manage users" 
ON public.users FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.role = 'admin'
  )
);

-- 5. Universal "Role-Based" Policy Helper (Simplified pattern)
-- Every operational table follows this access pattern:
-- ADMIN: Full Access (SELECT, INSERT, UPDATE, DELETE)
-- SUPERVISOR: SELECT, INSERT, UPDATE (Operational)
-- DRIVER: SELECT (Own data), INSERT (Requests)

-- EXAMPLE: TRIPS
DROP POLICY IF EXISTS "Trip access policy" ON public.trips;
CREATE POLICY "Trip access policy" 
ON public.trips FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.organization_id = public.trips.organization_id
    AND (
      users.role IN ('admin', 'supervisor') OR 
      (users.role = 'driver' AND public.trips.driver_id = users.driver_id)
    )
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.organization_id = public.trips.organization_id
    AND (
      users.role IN ('admin', 'supervisor') OR 
      (users.role = 'driver' AND public.trips.driver_id = users.driver_id)
    )
  )
);

-- REPEAT for EXPENSES (Milkrun & Linehaul)
DROP POLICY IF EXISTS "Milkrun expense access" ON public.milkrun_expenses;
CREATE POLICY "Milkrun expense access" 
ON public.milkrun_expenses FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.organization_id = public.milkrun_expenses.organization_id
    AND (
      users.role IN ('admin', 'supervisor') OR 
      (users.role = 'driver' AND public.milkrun_expenses.driver_id = users.driver_id)
    )
  )
);

DROP POLICY IF EXISTS "Linehaul expense access" ON public.linehaul_expenses;
CREATE POLICY "Linehaul expense access" 
ON public.linehaul_expenses FOR ALL 
USING (
  EXISTS (
    SELECT 1 FROM public.users 
    WHERE users.id = auth.uid() 
    AND users.organization_id = public.linehaul_expenses.organization_id
    AND (
      users.role IN ('admin', 'supervisor') OR 
      EXISTS (
        SELECT 1 FROM public.trips 
        WHERE trips.id = public.linehaul_expenses.trip_id 
        AND trips.driver_id = (SELECT driver_id FROM public.users WHERE id = auth.uid())
      )
    )
  )
);
