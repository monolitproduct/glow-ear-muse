import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import LanguageSelector from '../components/LanguageSelector';
import { supabase } from '../integrations/supabase/client';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

const HAPTICS_STORAGE_KEY = 'eyeHearU_hapticsEnabled';

const areHapticsEnabled = (): boolean => {
  // Only relevant on iOS platform
  if (Capacitor.getPlatform() !== 'ios') {
    return false;
  }
  
  try {
    const savedValue = localStorage.getItem(HAPTICS_STORAGE_KEY);
    // Default to true if not set
    return savedValue !== null ? JSON.parse(savedValue) : true;
  } catch (error) {
    console.error('Error reading haptics setting:', error);
    return true; // Fail gracefully to enabled state
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

  const breathingAnimation = {
    scale: [1, 1.05, 1],
    boxShadow: [
      "0 0 0 0px rgba(99, 102, 241, 0.4)",
      "0 0 0 10px rgba(99, 102, 241, 0)",
      "0 0 0 0px rgba(99, 102, 241, 0.4)"
    ],
    opacity: [0.8, 1, 0.8]
  };

  useEffect(() => {
    let listenerHandle: any;

    if (isRecording) {
      // Add the listener for partial results (interim text)
      const setupListener = async () => {
        listenerHandle = await SpeechRecognition.addListener('partialResults', (data: any) => {
          if (data.matches && data.matches.length > 0) {
            const newText = data.matches[0];
            interimTranscriptRef.current = newText; // Synchronous update
            setInterimTranscript(newText); // Async UI update
          }
        });
      };

      setupListener();
    }

    // Cleanup function to remove the listener when isRecording changes to false
    return () => {
      if (listenerHandle) {
        listenerHandle.remove();
      }
    };
  }, [isRecording]); // Listener now dependent on isRecording state

  const toggleRecording = async () => {
    setError(''); // Clear any previous errors

    if (isRecording) {
      // Stop the recognition
      try {
        await SpeechRecognition.stop();

        // Read from the ref to get the *guaranteed* latest value
        const textToSave = interimTranscriptRef.current;

        if (textToSave.trim()) {
          setFinalTranscript(prev => (prev.trim() + ' ' + textToSave.trim()).trim());
        }

        // Clear both the ref and the state
        interimTranscriptRef.current = '';
        setInterimTranscript('');
        setIsRecording(false);

        // Haptic feedback on stop success
        if (areHapticsEnabled()) {
          await Haptics.impact({ style: ImpactStyle.Medium }); // Simulate "Sharp tap"
        }
      } catch (e) {
        console.error("Error stopping recognition", e);
        setError(t('transcription.errors.stopError'));
        setIsRecording(false);

        // Haptic feedback on error
        if (areHapticsEnabled()) {
          await Haptics.notification({ type: NotificationType.Error }); // Simulate "Soft buzz"
        }
      }
    } else {
      // Start the recognition
      try {
        // First, check and request permissions
        const { speechRecognition } = await SpeechRecognition.requestPermissions();

        if (speechRecognition === 'granted') {
          // Start listening
          await SpeechRecognition.start({
            language: selectedLanguage,
            partialResults: true, // Required for interim results
          });
          setIsRecording(true);

          // Haptic feedback on start success
          if (areHapticsEnabled()) {
            await Haptics.impact({ style: ImpactStyle.Medium }); // Simulate "Sharp tap"
          }
        } else {
          setError(t('transcription.errors.permissionDenied'));

          // Haptic feedback on permission denied
          if (areHapticsEnabled()) {
            await Haptics.notification({ type: NotificationType.Error }); // Simulate "Soft buzz"
          }
        }
      } catch (e) {
        console.error("Error starting recognition", e);
        setError(t('transcription.errors.startError'));

        // Haptic feedback on error
        if (areHapticsEnabled()) {
          await Haptics.notification({ type: NotificationType.Error }); // Simulate "Soft buzz"
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

    // The 'canSave' constant already ensures finalTranscript is not empty.
    // The 'selectedLanguage' state is already available in the component.

    const { error } = await supabase.from('transcripts').insert({
      user_id: user.id,
      content: finalTranscript,
      language: selectedLanguage
    });

    if (error) {
      console.error('Error saving transcript:', error.message);

      // Haptic feedback on save error
      if (areHapticsEnabled()) {
        await Haptics.notification({ type: NotificationType.Error }); // Simulate "Soft buzz"
      }
    } else {
      console.log('Transcript Saved!');
      // Clear the transcript on successful save
      setFinalTranscript('');

      // Haptic feedback on save success - simulate "Double-tap"
      if (areHapticsEnabled()) {
        await Haptics.impact({ style: ImpactStyle.Heavy });
        await new Promise(resolve => setTimeout(resolve, 50)); // Short delay
        await Haptics.impact({ style: ImpactStyle.Heavy });
      }
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-text-primary p-4" style={{ perspective: '1000px' }}>
      {/* Header Area */}
      <header className="flex justify-between items-center mb-4">
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

      {/* Rotation Wrapper - Wraps main + footer */}
      <motion.div
        className="flex flex-col flex-grow overflow-hidden"
        animate={{ rotateY: isFlipped && !shouldReduceMotion ? 180 : 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 260, 
          damping: 20 
        }}
      >
        {/* Transcription Display Area */}
        <main className="flex-grow flex items-center justify-center p-4">
          <p className="text-3xl text-text-primary text-center">
            {finalTranscript || (!isRecording && t('transcription.main.placeholder'))}
            <span className="text-text-secondary opacity-75">{interimTranscript}</span>
          </p>
        </main>

        {/* Action Button Area */}
        <footer className="flex flex-col justify-center items-center py-4 px-4">
          <div className="w-full max-w-xs mb-4">
            <LanguageSelector
              label={t('transcription.footer.languageLabel')}
              selectedLanguage={selectedLanguage}
              onChange={setSelectedLanguage}
            />
          </div>
          {error && <p className="text-accent-error text-sm text-center mb-2" role="alert">{error}</p>}
          <div className="flex w-full max-w-xs justify-center items-center gap-4">
            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={!canSave}
              className="w-20 h-20 bg-accent-secondary rounded-full text-white font-bold text-lg shadow-lg transition-all
                         disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={t('transcription.footer.saveButton')}
            >
              {t('transcription.footer.saveButton')}
            </button>

            {/* Start/Stop Button */}
            <motion.button
              onClick={toggleRecording}
              animate={isRecording && !shouldReduceMotion ? breathingAnimation : {}}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.9 }}
              transition={{
                default: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                boxShadow: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                },
                opacity: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                whileTap: { type: 'spring', stiffness: 400, damping: 17 }
              }}
              aria-label={isRecording ? t('transcription.footer.stopButton') : t('transcription.footer.startButton')}
              className={`w-20 h-20 rounded-full text-white font-bold text-lg shadow-lg transition-colors ${
                isRecording
                  ? 'bg-accent-error hover:bg-accent-error/90'
                  : 'bg-accent-primary hover:bg-accent-primary/90'
              }`}
            >
              {isRecording ? t('transcription.footer.stopButton') : t('transcription.footer.startButton')}
            </motion.button>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default TranscriptionPage;
