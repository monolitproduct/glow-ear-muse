import { useEffect, useState } from 'react';
import RecordingButton from '@/components/RecordingButton';
import { toast } from 'sonner';

type RecordingState = 'idle' | 'listening' | 'active';

const MainScreen = () => {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    // Request permissions on mount
    const requestPermissions = async () => {
      try {
        // Request microphone permission
        await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Check speech recognition support
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
          // Speech recognition is available
          setHasPermission(true);
          localStorage.setItem('mic_permission', 'granted');
          toast.success('Microphone access granted');
        } else {
          setHasPermission(false);
          toast.error('Speech recognition not supported in this browser');
        }
      } catch (error) {
        console.error('Permission denied:', error);
        setHasPermission(false);
        localStorage.setItem('mic_permission', 'denied');
        toast.error('Microphone permission required');
      }
    };

    requestPermissions();
  }, []);

  const handleRecordingToggle = () => {
    if (!hasPermission) {
      toast.error('Please grant microphone permission');
      return;
    }

    setRecordingState((prev) => (prev === 'idle' ? 'active' : 'idle'));
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#0F0F12' }}>
      {/* Background ambient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F12] via-[#1A1A1F] to-[#0F0F12] opacity-50" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8">
        <RecordingButton
          state={recordingState}
          isEnabled={hasPermission === true}
          onClick={handleRecordingToggle}
        />
        
        {hasPermission === false && (
          <p className="text-text-secondary text-sm text-center max-w-xs">
            Microphone permission required to use this feature
          </p>
        )}
      </div>
    </div>
  );
};

export default MainScreen;
