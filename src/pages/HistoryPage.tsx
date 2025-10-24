import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { useTranslation } from 'react-i18next';

const HistoryPage = () => {
  const { t } = useTranslation();
  
  type Transcript = {
    id: string;
    created_at: string;
    content: string;
    language: string;
  };

  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranscripts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('transcripts')
        .select('*')
        .order('created_at', { ascending: false }); // Show newest first

      if (error) {
        console.error('Error fetching transcripts:', error.message);
      } else if (data) {
        setTranscripts(data);
      }
      setLoading(false);
    };

    fetchTranscripts();
  }, []); // Empty array ensures this runs once on mount

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary p-4">
      {/* Header Area */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-text-primary">
          {t('history.title')}
        </h1>
        <Link
          to="/dashboard"
          className="text-sm text-accent-primary hover:underline"
          aria-label="Back to dashboard"
        >
          {t('history.backLink')}
        </Link>
      </header>

      {/* Content Area */}
      <main className="flex-grow">
        {loading ? (
          <p className="text-text-secondary text-center">{t('history.loading')}</p>
        ) : transcripts.length === 0 ? (
          <p className="text-text-secondary text-center">
            {t('history.emptyState')}
          </p>
        ) : (
          <ul className="space-y-4">
            {transcripts.map((transcript) => (
              <li key={transcript.id}>
                <Link
                  to={`/transcript/${transcript.id}`}
                  className="block bg-background-secondary p-4 rounded-lg shadow transition-opacity hover:opacity-80 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  aria-label={`View full transcript from ${new Date(transcript.created_at).toLocaleString()}`}
                >
                  <p className="text-text-primary text-sm line-clamp-3">
                    {transcript.content}
                  </p>
                  <p className="text-text-secondary text-xs mt-2">
                    {new Date(transcript.created_at).toLocaleString()} - ({transcript.language})
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
};

export default HistoryPage;
