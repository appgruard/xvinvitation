import { useStore } from "@/lib/store";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Details({ guest }: { guest: any }) {
  const { eventDetails } = useStore();
  if (!eventDetails) return null;
  const date = new Date(eventDetails.date);

  return (
    <div className="text-center max-w-3xl mx-auto space-y-8 px-6">
      <div className="space-y-4">
        <h2 className="font-script text-5xl md:text-6xl text-purple-500">Con la bendición de Dios</h2>
        <p className="font-serif text-xl text-gray-600">
          y el amor de mis padres
        </p>
      </div>

      <div className="py-8 border-y border-purple-200 my-8">
        <p className="font-sans text-lg text-gray-700 leading-relaxed italic">
          "Hay momentos en la vida que imaginamos, soñamos y esperamos. 
          Hoy, ese sueño se hace realidad y quiero compartirlo contigo."
        </p>
      </div>

      <div className="space-y-2">
        <p className="font-serif text-2xl text-purple-800 uppercase tracking-widest">
          Sábado, 24 de enero de 2026
        </p>
        <p className="font-sans text-xl text-purple-500">
          7:30 p. m.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-100 max-w-md mx-auto mt-8">
        <h3 className="font-serif text-xl text-purple-900 mb-2">Notas Importantes</h3>
        <ul className="text-sm text-gray-600 space-y-2 font-sans">
          <li>✨ Recepción personal e intransferible.</li>
          <li>🚫 No niños. Agradecemos su comprensión.</li>
        </ul>
      </div>
    </div>
  );
}
