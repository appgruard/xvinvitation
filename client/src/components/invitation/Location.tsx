import { MapPin } from "lucide-react";
import imgLocation from "../../assets/gallery/MBFP_011_1766948087898.jpg";

export default function Location() {
  return (
    <div className="text-center space-y-8">
      <h2 className="font-display text-4xl text-rose-900 mb-6">Ubicación</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
        <div className="flex-1 space-y-4 text-center md:text-left p-6">
          <MapPin className="w-12 h-12 text-rose-400 mx-auto md:mx-0 mb-4" />
          <h3 className="font-serif text-2xl text-gray-800">Yovelys Eventos</h3>
          <p className="font-sans text-gray-600">📍 Nos vemos en una ubicación especial</p>
          <a 
            href="https://maps.app.goo.gl/vrYmEMaG3C1EPPyE9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block mt-4 text-rose-500 border-b border-rose-500 hover:text-rose-700 transition-colors"
          >
            Ver en Google Maps
          </a>
        </div>

        <div className="flex-1 w-full h-80 rounded-lg overflow-hidden shadow-lg border-4 border-white">
          <img 
            src={imgLocation} 
            alt="Ubicación del evento" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
