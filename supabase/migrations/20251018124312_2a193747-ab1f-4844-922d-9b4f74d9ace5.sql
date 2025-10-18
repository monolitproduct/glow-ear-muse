-- Create the transcripts table
CREATE TABLE public.transcripts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content text NOT NULL,
  language text NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.transcripts ENABLE ROW LEVEL SECURITY;

-- Create SELECT policy
CREATE POLICY "Allow individual read access"
ON public.transcripts
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create INSERT policy
CREATE POLICY "Allow individual insert access"
ON public.transcripts
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);