import { useParams } from "wouter";
import { useStore } from "@/lib/store";
import { useEffect, useState } from "react";
import { MusicPlayer } from "@/components/common/MusicPlayer";

import Hero from "@/components/invitation/Hero";
import Details from "@/components/invitation/Details";
import Location from "@/components/invitation/Location";
import DressCode from "@/components/invitation/DressCode";
import Gifts from "@/components/invitation/Gifts";
import RSVP from "@/components/invitation/RSVP";
import CountdownTimer from "@/components/invitation/CountdownTimer";

export default function Invitation() {
  const { id } = useParams();
  const { fetchGuest, fetchEventDetails, eventDetails } = useStore();
  const [guest, setGuest] = useState<any>(null);
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await fetchEventDetails();
      if (id) {
        const foundGuest = await fetchGuest(id);
        if (foundGuest) {
          setGuest(foundGuest);
          setIsValid(true);
        } else {
          setIsValid(false);
        }
      }
      setLoading(false);
    };
    loadData();
  }, [id, fetchGuest, fetchEventDetails]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <p className="font-serif text-rose-800">Cargando invitación...</p>
      </div>
    );
  }

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

  if (!eventDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rose-50">
        <p className="font-serif text-gray-600">Error al cargar el evento.</p>
      </div>
    );
  }

  const displayGuest = guest || { name: "Invitado Especial", maxSeats: 2, id: "temp", status: "pending" };

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

           <section id="important-notes" className="max-w-md mx-auto">
             <div className="bg-white p-6 rounded-lg shadow-sm border border-rose-100 text-center">
               <h3 className="font-serif text-xl text-rose-900 mb-2">Notas Importantes</h3>
               <ul className="text-sm text-gray-600 space-y-2 font-sans">
                 <li>✨ Recepción personal e intransferible.</li>
                 <li>🚫 No niños. Agradecemos su comprensión.</li>
               </ul>
             </div>
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
