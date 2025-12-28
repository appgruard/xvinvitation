import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import musicFile from '../../assets/Veo_en_ti_la_luz_Rapunzel_Karaoke_1766949643106.mp3';

// Singleton audio instance to prevent duplicates across renders/mounts
let globalAudio: HTMLAudioElement | null = null;

export function MusicPlayer() {
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    // Initialize singleton if it doesn't exist
    if (!globalAudio) {
      globalAudio = new Audio(musicFile);
      globalAudio.loop = true;
      globalAudio.volume = 0.3;
    }

    // Update local state based on global audio status
    setPlaying(!globalAudio.paused);

    // Auto-play attempt on mount
    const playAttempt = () => {
      globalAudio?.play().then(() => {
        setPlaying(true);
      }).catch(() => {
        setPlaying(false);
      });
    };

    playAttempt();

    return () => {
      // We don't pause here to allow music to continue during navigation
      // unless the component is truly being destroyed or we want to stop it
    };
  }, []);

  const togglePlay = () => {
    if (!globalAudio) return;

    if (playing) {
      globalAudio.pause();
      setPlaying(false);
    } else {
      globalAudio.play().catch(console.error);
      setPlaying(true);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Button
        onClick={togglePlay}
        variant="outline"
        size="icon"
        className="rounded-full bg-white/80 backdrop-blur-sm shadow-lg border-rose-200 hover:bg-rose-100 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
        data-testid="button-toggle-music"
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
