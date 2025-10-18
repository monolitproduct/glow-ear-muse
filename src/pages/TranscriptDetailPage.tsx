import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';

type Transcript = {
  id: string;
  created_at: string;
  content: string;
  language: string;
};

const TranscriptDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTranscript = async () => {
      if (!id) {
        setError('No transcript ID provided.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('transcripts')
        .select('*')
        .eq('id', id)
        .single();

      if (fetchError) {
        console.error('Error fetching transcript:', fetchError.message);
        setError('Could not load transcript. It may have been deleted or you do not have access.');
      } else if (data) {
        setTranscript(data);
      } else {
        setError('Transcript not found.');
      }

      setLoading(false);
    };

    fetchTranscript();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary p-4">
      {/* Header Area */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-text-primary">
          Transcript Details
        </h1>
        <Link
          to="/history"
          className="text-sm text-accent-primary hover:underline focus:outline-none focus:ring-2 focus:ring-accent-primary rounded"
          aria-label="Back to history"
        >
          ← Back to History
        </Link>
      </header>

      {/* Content Area */}
      <main className="flex-grow bg-background/50 border border-text-secondary/20 p-6 rounded-lg">
        {loading && (
          <p className="text-text-secondary text-center">Loading transcript...</p>
        )}
        
        {error && (
          <div className="text-center">
            <p className="text-accent-error mb-4">{error}</p>
            <Link
              to="/history"
              className="text-accent-primary hover:underline"
            >
              Return to History
            </Link>
          </div>
        )}
        
        {!loading && !error && transcript && (
          <div className="space-y-4">
            <div className="pb-4 border-b border-text-secondary/20">
              <p className="text-text-secondary text-sm">
                Saved: {new Date(transcript.created_at).toLocaleString()}
              </p>
              <p className="text-text-secondary text-sm">
                Language: {transcript.language}
              </p>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-text-primary whitespace-pre-wrap leading-relaxed">
                {transcript.content}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TranscriptDetailPage;
