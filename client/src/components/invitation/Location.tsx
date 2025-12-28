import { useStore } from "@/lib/store";
import { MapPin } from "lucide-react";

export default function Location() {
  const { eventDetails } = useStore();

  return (
    <div className="text-center space-y-8">
      <h2 className="font-display text-4xl text-rose-900 mb-6">Ubicación</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
        <div className="flex-1 space-y-4 text-center md:text-right p-6">
          <MapPin className="w-12 h-12 text-rose-400 mx-auto md:ml-auto md:mr-0 mb-4" />
          <h3 className="font-serif text-2xl text-gray-800">{eventDetails.locationName}</h3>
          <p className="font-sans text-gray-600">{eventDetails.locationAddress}</p>
          <a 
            href="https://goo.gl/maps/example" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-4 text-rose-500 border-b border-rose-500 hover:text-rose-700 transition-colors"
          >
            Ver en Google Maps
          </a>
        </div>

        <div className="flex-1 w-full h-80 bg-gray-200 rounded-lg overflow-hidden shadow-lg border-4 border-white">
          <iframe 
            src={eventDetails.locationMapUrl} 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
