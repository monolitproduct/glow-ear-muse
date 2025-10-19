import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';
import LanguageSelector from '../components/LanguageSelector';
import { supabase } from '../integrations/supabase/client';

const TranscriptionPage = () => {
  const { user, signOut } = useAuth();
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
      } catch (e) {
        console.error("Error stopping recognition", e);
        setError("Error stopping recognition.");
      }
      setIsRecording(false);
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
        } else {
          setError('Speech recognition permission was denied.');
        }
      } catch (e) {
        console.error("Error starting recognition", e);
        setError('Could not start speech recognition.');
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
    } else {
      console.log('Transcript Saved!');
      // Clear the transcript on successful save
      setFinalTranscript('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-text-primary p-4">
      {/* Header Area */}
      <header className="flex justify-between items-center mb-4">
        <p className="text-sm">
          User: <span className="font-semibold">{user?.email}</span>
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsFlipped(prev => !prev)}
            className="text-sm text-accent-secondary hover:underline"
            aria-label={isFlipped ? "Unflip screen" : "Flip screen"}
          >
            {isFlipped ? 'Unflip' : 'Flip'}
          </button>
          <Link
            to="/purchase"
            className="text-sm px-3 py-1 bg-accent-primary text-white font-semibold rounded hover:bg-accent-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Upgrade to unlimited transcription"
          >
            Upgrade
          </Link>
          <Link
            to="/dashboard"
            className="text-sm text-accent-primary hover:underline"
            aria-label="Back to dashboard"
          >
            Dashboard
          </Link>
          <button
            onClick={signOut}
            className="text-sm text-accent-primary hover:underline"
            aria-label="Sign out"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Rotation Wrapper - Wraps main + footer */}
      <motion.div
        className="flex flex-col flex-grow overflow-hidden"
        animate={{ rotate: isFlipped && !shouldReduceMotion ? 180 : 0 }}
        transition={{ 
          type: 'spring', 
          stiffness: 260, 
          damping: 20 
        }}
      >
        {/* Transcription Display Area */}
        <main className="flex-grow flex items-center justify-center p-4">
          <p className="text-3xl text-text-primary text-center">
            {finalTranscript}
            <span className="text-text-secondary opacity-75">{interimTranscript}</span>
          </p>
        </main>

        {/* Action Button Area */}
        <footer className="flex flex-col justify-center items-center py-4 px-4">
          <div className="w-full max-w-xs mb-4">
            <LanguageSelector
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
              aria-label="Save transcript"
            >
              Save
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
              aria-label={isRecording ? 'Stop recording' : 'Start recording'}
              className={`w-20 h-20 rounded-full text-white font-bold text-lg shadow-lg transition-colors ${
                isRecording
                  ? 'bg-accent-error hover:bg-accent-error/90'
                  : 'bg-accent-primary hover:bg-accent-primary/90'
              }`}
            >
              {isRecording ? 'Stop' : 'Start'}
            </motion.button>
          </div>
        </footer>
      </motion.div>
    </div>
  );
};

export default TranscriptionPage;
