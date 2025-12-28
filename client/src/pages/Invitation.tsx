import { useParams } from "wouter";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { MusicPlayer } from "@/components/common/MusicPlayer";

// Sub-components will be imported here
import Hero from "@/components/invitation/Hero";
import Details from "@/components/invitation/Details";
import Location from "@/components/invitation/Location";
import DressCode from "@/components/invitation/DressCode";
import Gifts from "@/components/invitation/Gifts";
import RSVP from "@/components/invitation/RSVP";
import CountdownTimer from "@/components/invitation/CountdownTimer";

export default function Invitation() {
  const { id } = useParams();
  const { guests } = useStore();
  const [guest, setGuest] = useState<any>(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundGuest = guests.find(g => g.id === id);
    if (foundGuest) {
      setGuest(foundGuest);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [id, guests]);

  if (!isValid && id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50 text-rose-900 font-serif">
        <div className="text-center p-8 bg-white shadow-xl rounded-lg border border-rose-200">
          <h1 className="text-3xl mb-4">Invitación no válida</h1>
          <p>Lo sentimos, el enlace que has utilizado no es correcto o ha caducado.</p>
        </div>
      </div>
    );
  }
  
  // For preview/development without ID, we can show a default guest or just the page
  // Remove this for production!
  const displayGuest = guest || { name: "Invitado Especial", maxSeats: 2 };

  return (
    <div className="min-h-screen bg-rose-50/30 overflow-x-hidden font-sans selection:bg-rose-200">
      <MusicPlayer />
      
      <main className="relative">
        <Hero guestName={displayGuest.name} />
        
        <div className="container mx-auto px-4 py-12 space-y-24">
           <section id="invitation">
              <Details guest={displayGuest} />
           </section>

           <section id="countdown">
             <CountdownTimer />
           </section>

           <section id="location">
             <Location />
           </section>

           <section id="dress-code">
             <DressCode />
           </section>

           <section id="gifts">
             <Gifts />
           </section>

           <section id="rsvp">
             <RSVP guest={displayGuest} />
           </section>
        </div>

        <footer className="bg-rose-900 text-rose-100 py-8 text-center mt-20">
          <p className="font-serif italic text-lg mb-2">María José</p>
          <p className="text-sm opacity-70">XV Años</p>
        </footer>
      </main>
    </div>
  );
}
