-- Allow users to delete their own transcripts
CREATE POLICY "Allow individual delete access" 
ON public.transcripts 
FOR DELETE 
USING (auth.uid() = user_id);