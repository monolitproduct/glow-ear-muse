import { useState, useCallback, useRef } from 'react';

interface AudioVisualizationData {
  audioLevel: number;
  waveformData: number[];
  startVisualization: () => void;
  stopVisualization: () => void;
}

export const useAudioVisualization = (): AudioVisualizationData => {
  const [audioLevel, setAudioLevel] = useState(0);
  const [waveformData, setWaveformData] = useState<number[]>([]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const startVisualization = useCallback(async () => {
    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Create audio context and analyser
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioContext;

      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.8;
      analyserRef.current = analyser;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      dataArrayRef.current = dataArray;

      // Connect microphone to analyser
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);

      // Animation loop for real-time visualization
      const updateVisualization = () => {
        if (!analyserRef.current || !dataArrayRef.current) return;

        analyserRef.current.getByteFrequencyData(dataArrayRef.current);

        // Calculate average audio level (0-1)
        let sum = 0;
        for (let i = 0; i < dataArrayRef.current.length; i++) {
          sum += dataArrayRef.current[i];
        }
        const average = sum / dataArrayRef.current.length;
        const normalizedLevel = average / 255;
        setAudioLevel(normalizedLevel);

        // Get waveform data for visualization (10 bars)
        const step = Math.floor(dataArrayRef.current.length / 10);
        const waveform: number[] = [];
        for (let i = 0; i < 10; i++) {
          const index = i * step;
          waveform.push(dataArrayRef.current[index] / 255);
        }
        setWaveformData(waveform);

        animationFrameRef.current = requestAnimationFrame(updateVisualization);
      };

      updateVisualization();
    } catch (error) {
      console.error('Error starting audio visualization:', error);
    }
  }, []);

  const stopVisualization = useCallback(() => {
    // Stop animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Stop microphone stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    // Reset state
    setAudioLevel(0);
    setWaveformData([]);
  }, []);

  return {
    audioLevel,
    waveformData,
    startVisualization,
    stopVisualization,
  };
};
