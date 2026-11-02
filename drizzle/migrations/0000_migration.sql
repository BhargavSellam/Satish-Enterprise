CREATE TABLE public.quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  project_location text,
  categories text[] NOT NULL DEFAULT '{}',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  budget text,
  message text
);
GRANT ALL ON public.quote_requests TO service_role;
ALTER TABLE public.quote_requests ENABLE ROW LEVEL SECURITY;