import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Haptics, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';
import { useTranslation } from 'react-i18next';

type Transcript = {
  id: string;
  created_at: string;
  content: string;
  language: string;
};

const TranscriptDetailPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async (): Promise<void> => {
    if (!id) return;

    // Show confirmation dialog
    const confirmed = window.confirm(
      t('transcriptDetail.deleteConfirm')
    );

    if (!confirmed) return;

    // Set deleting state
    setDeleting(true);
    setError('');

    try {
      const { error: deleteError } = await supabase
        .from('transcripts')
        .delete()
        .eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      // Success haptic feedback on iOS
      if (Capacitor.getPlatform() === 'ios') {
        await Haptics.notification({ type: NotificationType.Success });
      }

      // Navigate to history page
      navigate('/history');
    } catch (err) {
      console.error('Error deleting transcript:', err);
      setError(t('transcriptDetail.error.deleteFailed'));
      setDeleting(false);

      // Error haptic feedback on iOS
      if (Capacitor.getPlatform() === 'ios') {
        await Haptics.notification({ type: NotificationType.Error });
      }
    }
  };

  useEffect(() => {
    const fetchTranscript = async () => {
      if (!id) {
        setError(t('transcriptDetail.error.noId'));
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
        setError(t('transcriptDetail.error.loadFailed'));
      } else if (data) {
        setTranscript(data);
      } else {
        setError(t('transcriptDetail.error.notFound'));
      }

      setLoading(false);
    };

    fetchTranscript();
  }, [id, t]);

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-primary p-4">
      {/* Header Area */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-text-primary">
          {t('transcriptDetail.title')}
        </h1>
        <Link
          to="/history"
          className="text-sm text-accent-primary hover:underline focus:outline-none focus:ring-2 focus:ring-accent-primary rounded"
          aria-label="Back to history"
        >
          {t('transcriptDetail.backLink')}
        </Link>
      </header>

      {/* Content Area */}
      <main className="flex-grow bg-background/50 border border-text-secondary/20 p-6 rounded-lg">
        {loading && (
          <p className="text-text-secondary text-center">{t('transcriptDetail.loading')}</p>
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
                {t('transcriptDetail.metadata.savedLabel')} {new Date(transcript.created_at).toLocaleString()}
              </p>
              <p className="text-text-secondary text-sm">
                {t('transcriptDetail.metadata.languageLabel')}: {transcript.language}
              </p>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <p className="text-text-primary whitespace-pre-wrap leading-relaxed">
                {transcript.content}
              </p>
            </div>
            
            {/* Delete Action */}
            <div className="pt-6 mt-6 border-t border-text-secondary/20 flex justify-end">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleDelete}
                disabled={deleting}
                aria-label="Delete this transcript permanently"
                className="transition-colors"
              >
                {deleting ? t('transcriptDetail.deletingButton') : t('transcriptDetail.deleteButton')}
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TranscriptDetailPage;
