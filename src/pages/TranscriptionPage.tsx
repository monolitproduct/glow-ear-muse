import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import LanguageSelector from '../components/LanguageSelector';
import { supabase } from '../integrations/supabase/client';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

const HAPTICS_STORAGE_KEY = 'eyeHearU_hapticsEnabled';

const areHapticsEnabled = (): boolean => {
  if (Capacitor.getPlatform() !== 'ios') {
    return false;
  }
  
  try {
    const savedValue = localStorage.getItem(HAPTICS_STORAGE_KEY);
    return savedValue !== null ? JSON.parse(savedValue) : true;
  } catch (error) {
    console.error('Error reading haptics setting:', error);
    return true;
  }
};

const TranscriptionPage = () => {
  const { t } = useTranslation();
  const { user, signOut, hasProAccess } = useAuth();
  const shouldReduceMotion = useReducedMotion();
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [error, setError] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [isFlipped, setIsFlipped] = useState(false);
  const interimTranscriptRef = useRef('');
  
  const [userHasScrolledUp, setUserHasScrolledUp] = useState(false);
  const frontContainerRef = useRef<HTMLDivElement>(null);
  const backContainerRef = useRef<HTMLDivElement>(null);
  
  const SCROLL_THRESHOLD = 10;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const isAtBottom = container.scrollHeight - container.scrollTop <= container.clientHeight + SCROLL_THRESHOLD;
    setUserHasScrolledUp(!isAtBottom);
  };

  useEffect(() => {
    let listenerHandle: any;

    if (isRecording) {
      const setupListener = async () => {
        listenerHandle = await SpeechRecognition.addListener('partialResults', (data: any) => {
          if (data.matches && data.matches.length > 0) {
            const newText = data.matches[0];
            interimTranscriptRef.current = newText;
            setInterimTranscript(newText);
          }
        });
      };

      setupListener();
    }

    return () => {
      if (listenerHandle) {
        listenerHandle.remove();
      }
    };
  }, [isRecording]);

  useEffect(() => {
    if (!userHasScrolledUp && interimTranscript) {
      const container = isFlipped ? backContainerRef.current : frontContainerRef.current;
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    }
  }, [interimTranscript, userHasScrolledUp, isFlipped]);

  const toggleRecording = async () => {
    setError('');

    if (isRecording) {
      try {
        await SpeechRecognition.stop();
        const textToSave = interimTranscriptRef.current;

        if (textToSave.trim()) {
          setFinalTranscript(prev => (prev.trim() + ' ' + textToSave.trim()).trim());
        }

        interimTranscriptRef.current = '';
        setInterimTranscript('');
        setIsRecording(false);

        if (areHapticsEnabled()) {
          await Haptics.impact({ style: ImpactStyle.Medium });
        }
      } catch (e) {
        console.error("Error stopping recognition", e);
        setError(t('transcription.errors.stopError'));
        setIsRecording(false);

        if (areHapticsEnabled()) {
          await Haptics.notification({ type: NotificationType.Error });
        }
      }
    } else {
      try {
        const { speechRecognition } = await SpeechRecognition.requestPermissions();

        if (speechRecognition === 'granted') {
          await SpeechRecognition.start({
            language: selectedLanguage,
            partialResults: true,
          });
          setIsRecording(true);

          if (areHapticsEnabled()) {
            await Haptics.impact({ style: ImpactStyle.Medium });
          }
        } else {
          setError(t('transcription.errors.permissionDenied'));

          if (areHapticsEnabled()) {
            await Haptics.notification({ type: NotificationType.Error });
          }
        }
      } catch (e) {
        console.error("Error starting recognition", e);
        setError(t('transcription.errors.startError'));

        if (areHapticsEnabled()) {
          await Haptics.notification({ type: NotificationType.Error });
        }
      }
    }
  };

  const canSave = !isRecording && finalTranscript.trim().length > 0;

  const handleSave = async () => {
    if (!user) {
      console.error('User not logged in. Cannot save.');
      return;
    }

    const { error } = await supabase.from('transcripts').insert({
      user_id: user.id,
      content: finalTranscript,
      language: selectedLanguage
    });

    if (error) {
      console.error('Error saving transcript:', error.message);

      if (areHapticsEnabled()) {
        await Haptics.notification({ type: NotificationType.Error });
      }
    } else {
      console.log('Transcript Saved!');
      setFinalTranscript('');

      if (areHapticsEnabled()) {
        await Haptics.impact({ style: ImpactStyle.Heavy });
        await new Promise(resolve => setTimeout(resolve, 50));
        await Haptics.impact({ style: ImpactStyle.Heavy });
      }
    }
  };

  const renderTranscriptionContent = (ref: React.RefObject<HTMLDivElement>) => (
    <>
      <main 
        ref={ref}
        onScroll={handleScroll}
        className="overflow-y-auto p-4"
        style={{ height: 'calc(100vh - 180px)' }}
      >
        <p className="text-2xl md:text-3xl text-text-primary text-center leading-relaxed">
          {finalTranscript}{' '}
          <AnimatePresence mode="wait">
            {interimTranscript && (
              <motion.span
                key="interim-text"
                className="text-[--text-tertiary] inline-block"
                initial={shouldReduceMotion ? { opacity: 0.75 } : { opacity: 0.4, y: 8, filter: 'blur(2px)' }}
                animate={shouldReduceMotion ? { opacity: 0.75 } : { opacity: 0.75, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 200, damping: 20 }}
              >
                {interimTranscript}
              </motion.span>
            )}
          </AnimatePresence>
        </p>
      </main>

      <footer className="flex flex-col justify-center items-center pt-4 pb-[calc(1rem+var(--safe-bottom))] pl-[calc(1rem+var(--safe-left))] pr-[calc(1rem+var(--safe-right))]">
        <div className="w-full max-w-xs mb-4">
          <LanguageSelector
            label={t('transcription.footer.languageLabel')}
            selectedLanguage={selectedLanguage}
            onChange={setSelectedLanguage}
          />
        </div>
        {error && <p className="text-accent-error text-sm text-center mb-2" role="alert">{error}</p>}
        <div className="flex w-full max-w-xs justify-center items-center gap-4">
          <button
            onClick={handleSave}
            disabled={!canSave}
            className="w-20 h-20 bg-accent-secondary rounded-full text-white font-bold text-lg shadow-lg transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('transcription.footer.saveButton')}
          >
            {t('transcription.footer.saveButton')}
          </button>

          <motion.button
            onClick={toggleRecording}
            whileTap={{ scale: shouldReduceMotion ? 1 : 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            aria-label={isRecording ? t('transcription.footer.stopButton') : t('transcription.footer.startButton')}
            className={`relative w-20 h-20 rounded-full text-white font-bold text-lg shadow-lg overflow-visible 
              ${isRecording ? 'bg-accent-error hover:bg-accent-error/90' : 'bg-gradient-to-br from-accent-primary to-accent-primary hover:opacity-90'}`}
          >
            {!shouldReduceMotion && isRecording && (
              <motion.div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{ boxShadow: '0 0 0 0px var(--color-glow-primary)' }}
                animate={{
                  scale: [1, 1.1, 1],
                  boxShadow: [
                    '0 0 20px 5px var(--color-glow-primary)',
                    '0 0 60px 15px var(--color-glow-intense)',
                    '0 0 20px 5px var(--color-glow-primary)',
                  ]
                }}
                transition={{ duration: 1.8, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
              />
            )}
            {!shouldReduceMotion && isRecording && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary-500/50 pointer-events-none"
                style={{ borderColor: 'var(--color-primary-500)' }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
            <span className="relative z-10">
              {isRecording ? t('transcription.footer.stopButton') : t('transcription.footer.startButton')}
            </span>
          </motion.button>
        </div>
      </footer>
    </>
  );

  return (
    <div className="flex flex-col h-screen text-text-primary p-4">
      <header className="flex justify-between items-center mb-4 pt-[calc(1rem+var(--safe-top))] pl-[calc(1rem+var(--safe-left))] pr-[calc(1rem+var(--safe-right))]">
        <p className="text-sm">
          {t('transcription.header.userLabel')} <span className="font-semibold">{user?.email}</span>
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFlipped(prev => !prev)}
            className="text-sm text-accent-secondary hover:underline"
            aria-label={isFlipped ? t('transcription.header.unflipButton') : t('transcription.header.flipButton')}
          >
            {isFlipped ? t('transcription.header.unflipButton') : t('transcription.header.flipButton')}
          </button>
          {!hasProAccess && (
            <Link
              to="/purchase"
              className="text-sm px-3 py-1 bg-accent-primary text-white font-semibold rounded hover:bg-accent-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label={t('transcription.header.upgradeButton')}
            >
              {t('transcription.header.upgradeButton')}
            </Link>
          )}
          <Link
            to="/dashboard"
            className="text-sm text-accent-primary hover:underline"
            aria-label={t('transcription.header.dashboardLink')}
          >
            {t('transcription.header.dashboardLink')}
          </Link>
          <button
            onClick={signOut}
            className="text-sm text-accent-primary hover:underline"
            aria-label={t('transcription.header.signOutButton')}
          >
            {t('transcription.header.signOutButton')}
          </button>
        </div>
      </header>

      <motion.div 
        className="relative flex-grow"
        style={{ perspective: '1000px' }}
        animate={{ rotateY: isFlipped && !shouldReduceMotion ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20, duration: shouldReduceMotion ? 0 : undefined }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col">
          {renderTranscriptionContent(frontContainerRef)}
        </div>

        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] flex flex-col">
          {renderTranscriptionContent(backContainerRef)}
        </div>
      </motion.div>
    </div>
  );
};

export default TranscriptionPage;
