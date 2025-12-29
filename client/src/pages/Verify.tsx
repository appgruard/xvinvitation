import { useStore } from "@/lib/store";
import { CheckCircle2, XCircle, Users, Calendar } from "lucide-react";
import { useParams } from "wouter";
import { motion } from "framer-motion";

export default function Verify() {
  const params = useParams();
  const id = params.id as string;
  const { guests } = useStore();
  
  const guest = guests.find(g => g.id === id);

  if (!guest) {
    return (
      <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-rose-100 max-w-md w-full text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="font-serif text-2xl text-rose-900 mb-2">Invitación No Encontrada</h1>
          <p className="text-gray-600">El código escaneado no es válido o la invitación ha sido eliminada.</p>
        </div>
      </div>
    );
  }

  const isConfirmed = guest.status === "confirmed";

  return (
    <div className="min-h-screen bg-rose-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-8 rounded-2xl shadow-xl border border-rose-100 max-w-md w-full"
      >
        <div className="text-center mb-8">
          <div className="inline-block p-4 rounded-full bg-rose-50 mb-4">
            <span className="font-script text-4xl text-rose-600">MJ</span>
          </div>
          <h1 className="font-serif text-3xl text-rose-900">Validación de Acceso</h1>
          <p className="text-gray-500 font-sans uppercase tracking-widest text-xs mt-2">XV Años María José</p>
        </div>

        <div className={`p-6 rounded-xl border-2 mb-6 ${isConfirmed ? 'bg-green-50 border-green-100' : 'bg-amber-50 border-amber-100'}`}>
          <div className="flex items-center gap-4 mb-4">
            {isConfirmed ? (
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-amber-600" />
            )}
            <div>
              <p className="font-sans text-sm text-gray-500 uppercase tracking-tight">Estado de Confirmación</p>
              <p className={`font-bold text-lg ${isConfirmed ? 'text-green-700' : 'text-amber-700'}`}>
                {isConfirmed ? 'ASISTENCIA CONFIRMADA' : 'PENDIENTE / NO ASISTE'}
              </p>
            </div>
          </div>

          <div className="space-y-3 border-t border-black/5 pt-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center gap-2"><Users className="w-4 h-4" /> Invitado:</span>
              <span className="font-bold text-rose-900">{guest.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 flex items-center gap-2"><Calendar className="w-4 h-4" /> Lugares:</span>
              <span className="font-bold text-rose-900">{guest.confirmedSeats} {guest.confirmedSeats === 1 ? 'Persona' : 'Personas'}</span>
            </div>
          </div>
        </div>

        {isConfirmed && (
          <div className="bg-rose-900 text-white p-4 rounded-lg text-center font-bold animate-pulse">
            ACCESO PERMITIDO
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-8">
          ID de Validación: {guest.id}<br />
          Evento: 24 de Enero, 2026
        </p>
      </motion.div>
    </div>
  );
}
