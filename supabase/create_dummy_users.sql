-- SQL Script to Create Dummy Users (Supervisor and Driver)
-- To be run in the Supabase SQL Editor

DO $$
DECLARE
    org_id UUID;
    driver_id UUID;
    supervisor_auth_id UUID;
    driver_auth_id UUID;
BEGIN
    -- 1. Ensure an organization exists
    SELECT id INTO org_id FROM public.organizations LIMIT 1;
    
    IF org_id IS NULL THEN
        INSERT INTO public.organizations (name)
        VALUES ('Default Organization')
        RETURNING id INTO org_id;
    END IF;

    -- 2. Create Dummy Driver Record
    INSERT INTO public.drivers (
        organization_id, 
        driver_name, 
        mobile_number, 
        joining_date
    )
    VALUES (
        org_id, 
        'Dummy Driver', 
        '9876543210', 
        CURRENT_DATE
    )
    RETURNING id INTO driver_id;

    -- 3. Create Supervisor User in auth.users
    -- Password: password123
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    )
    VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        'supervisor@dummy.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Dummy Supervisor"}',
        false,
        now(),
        now(),
        '',
        '',
        '',
        ''
    )
    RETURNING id INTO supervisor_auth_id;

    -- 4. Create Driver User in auth.users
    INSERT INTO auth.users (
        instance_id,
        id,
        aud,
        role,
        email,
        encrypted_password,
        email_confirmed_at,
        raw_app_meta_data,
        raw_user_meta_data,
        is_super_admin,
        created_at,
        updated_at,
        confirmation_token,
        email_change,
        email_change_token_new,
        recovery_token
    )
    VALUES (
        '00000000-0000-0000-0000-000000000000',
        gen_random_uuid(),
        'authenticated',
        'authenticated',
        'driver@dummy.com',
        crypt('password123', gen_salt('bf')),
        now(),
        '{"provider":"email","providers":["email"]}',
        '{"full_name":"Dummy Driver"}',
        false,
        now(),
        now(),
        '',
        '',
        '',
        ''
    )
    RETURNING id INTO driver_auth_id;

    -- 5. Link users in public.users table
    INSERT INTO public.users (id, organization_id, name, email, role)
    VALUES (supervisor_auth_id, org_id, 'Dummy Supervisor', 'supervisor@dummy.com', 'supervisor');

    INSERT INTO public.users (id, organization_id, name, email, role, driver_id)
    VALUES (driver_auth_id, org_id, 'Dummy Driver', 'driver@dummy.com', 'driver', driver_id);

    RAISE NOTICE 'Dummy users created successfully.';
END $$;
