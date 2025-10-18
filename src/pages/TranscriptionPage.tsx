import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import { SpeechRecognition } from '@capacitor-community/speech-recognition';

const TranscriptionPage = () => {
  const { user, signOut } = useAuth();
  const shouldReduceMotion = useReducedMotion();
  const [isRecording, setIsRecording] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [finalTranscript, setFinalTranscript] = useState('');
  const [error, setError] = useState('');
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
            language: 'en-US', // We will make this dynamic later
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

  return (
    <div className="flex flex-col h-screen bg-background text-text-primary p-4">
      {/* Header Area */}
      <header className="flex justify-between items-center mb-4">
        <p className="text-sm">
          User: <span className="font-semibold">{user?.email}</span>
        </p>
        <div className="flex items-center gap-4">
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

      {/* Transcription Display Area */}
      <main className="flex-grow flex items-center justify-center p-4">
        <p className="text-3xl text-text-primary text-center">
          {finalTranscript}
          <span className="text-text-secondary opacity-75">{interimTranscript}</span>
        </p>
      </main>

      {/* Action Button Area */}
      <footer className="flex flex-col justify-center items-center py-4">
        {error && <p className="text-accent-error text-sm text-center mb-2" role="alert">{error}</p>}
        <motion.button
          className="w-20 h-20 bg-accent-primary rounded-full text-white font-bold text-lg shadow-lg hover:bg-accent-primary/90 transition-colors"
          aria-label="Start recording"
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
        >
          {isRecording ? 'Stop' : 'Start'}
        </motion.button>
      </footer>
    </div>
  );
};

export default TranscriptionPage;
