import { useState, useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import { useStore } from '@/lib/store';
import { Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MusicPlayer() {
  const { eventDetails } = useStore();
  const [playing, setPlaying] = useState(false);
  const [showButton, setShowButton] = useState(true);

  const togglePlay = () => {
    setPlaying(!playing);
  };

  const musicUrl = "https://youtu.be/InTk6QkidRM?si=FU81IL70u85m59gg";
  
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="hidden">
        <ReactPlayer
          url={musicUrl}
          playing={playing}
          loop={true}
          volume={0.8}
          width="0"
          height="0"
          playsinline
        />
      </div>
      
      {showButton && (
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
      )}
    </div>
  );
}
