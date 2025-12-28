import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import musicFile from '../../assets/Veo_en_ti_la_luz_Rapunzel_Karaoke_1766949643106.mp3';

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(true);

  // Auto-play on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.3;
      // Use a flag to ensure we only try to play once and handle user interaction requirements
      const playAudio = () => {
        audio.play().catch(() => {
          setPlaying(false);
        });
      };
      
      playAudio();
    }
    
    // Cleanup to ensure audio stops if component unmounts
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (playing) {
        audio.pause();
        audio.muted = true;
        // Reinforcing pause and ensuring volume is 0
        audio.volume = 0;
        setPlaying(false);
      } else {
        audio.muted = false;
        audio.volume = 0.3;
        audio.play().catch(error => console.error("Error playing audio:", error));
        setPlaying(true);
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <audio
        ref={audioRef}
        src={musicFile}
        loop
        preload="auto"
      />
      
      <Button
        onClick={togglePlay}
        variant="outline"
        size="icon"
        className="rounded-full bg-white/80 backdrop-blur-sm shadow-lg border-rose-200 hover:bg-rose-100 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
      >
        {playing ? (
          <Volume2 className="h-4 w-4 text-rose-800" />
        ) : (
          <VolumeX className="h-4 w-4 text-rose-800" />
        )}
      </Button>
    </div>
  );
}
