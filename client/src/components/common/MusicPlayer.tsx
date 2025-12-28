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
      audio.play().catch(() => {
        setPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setPlaying(true);
      } else {
        audioRef.current.pause();
        setPlaying(false);
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <audio
        ref={audioRef}
        src={musicFile}
        loop
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
