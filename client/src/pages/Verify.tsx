import React, { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Users, Calendar, AlertCircle, ShieldCheck } from "lucide-react";
import { useParams } from "wouter";
import { motion, AnimatePresence } from "framer-motion";

export default function Verify() {
  const params = useParams();
  const id = params ? (params as any).id : undefined;
  const [guest, setGuest] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGuest = async () => {
      if (!id) return;
      try {
        const res = await fetch(`/api/admin/guests`);
        if (res.ok) {
          const guests = await res.json();
          // Intentamos buscar por ID o por invitationId (el código del QR)
          const found = guests.find((g: any) => g.id === id || g.invitationId === id);
          setGuest(found);
        } else {
          setError("No se pudo conectar con el servidor.");
        }
      } catch (err) {
        console.error("Error fetching guest:", err);
        setError("Error de conexión.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGuest();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fffcf9] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="relative">
            <div className="w-16 h-16 border-4 border-rose-100 border-t-rose-600 rounded-full animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-rose-600/50" />
            </div>
          </div>
          <p className="font-serif text-rose-800 animate-pulse italic">Verificando acceso...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !guest) {
    return (
      <div className="min-h-screen bg-[#fffcf9] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-10 rounded-[3rem] shadow-2xl border border-rose-100 max-w-md w-full text-center"
        >
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-inner">
            <XCircle className="w-12 h-12 text-red-500" />
          </div>
          <h1 className="font-serif text-3xl text-rose-950 mb-3 font-bold">Acceso Denegado</h1>
          <p className="text-gray-500 mb-8 text-sm leading-relaxed">
            El código escaneado no es válido o no se encuentra en nuestra lista de invitados oficial.
          </p>
          <div className="h-1.5 w-24 bg-rose-100 mx-auto rounded-full" />
        </motion.div>
      </div>
    );
  }

  const isConfirmed = guest.status === "confirmed";

  return (
    <div className="min-h-screen bg-[#fffcf9] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-rose-100 max-w-md w-full overflow-hidden"
      >
        {/* Header con Diseño Curvo */}
        <div className="bg-rose-600 pt-10 pb-16 px-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-48 h-48 border-[12px] border-white rounded-full" />
            <div className="absolute -bottom-20 -right-10 w-60 h-60 border-[12px] border-white rounded-full" />
          </div>
          
          <div className="relative z-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block p-4 rounded-[2rem] bg-white/20 backdrop-blur-xl mb-6 border border-white/30 shadow-2xl"
            >
              <span className="font-serif text-4xl text-white font-black tracking-tighter">MJ</span>
            </motion.div>
            <h1 className="text-white font-serif text-2xl font-bold tracking-tight mb-2">Pase Digital</h1>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-8 bg-white/30" />
              <p className="text-white/80 text-[10px] uppercase tracking-[0.3em] font-medium">Validación Real</p>
              <div className="h-px w-8 bg-white/30" />
            </div>
          </div>
          
          {/* Curva decorativa inferior */}
          <div className="absolute bottom-0 left-0 w-full h-8 bg-white rounded-t-[3rem]" />
        </div>

        <div className="px-8 pb-10 -mt-2 relative z-10">
          {/* Status Badge */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`p-8 rounded-[2.5rem] border-2 mb-8 text-center shadow-lg transition-all ${
              isConfirmed 
                ? 'bg-emerald-50/50 border-emerald-100' 
                : 'bg-amber-50/50 border-amber-100'
            }`}
          >
            <div className={`mb-5 inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl border-4 ${
              isConfirmed ? 'border-emerald-50' : 'border-amber-50'
            }`}>
              {isConfirmed ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-500" />
              ) : (
                <AlertCircle className="w-10 h-10 text-amber-500" />
              )}
            </div>
            
            <h2 className={`text-[10px] font-black uppercase tracking-[0.25em] mb-2 ${
              isConfirmed ? 'text-emerald-600' : 'text-amber-600'
            }`}>
              {isConfirmed ? 'Confirmación Exitosa' : 'Acción Requerida'}
            </h2>
            <p className={`text-3xl font-serif font-black ${
              isConfirmed ? 'text-emerald-950' : 'text-amber-950'
            }`}>
              {isConfirmed ? 'Bienvenido/a' : 'Pendiente'}
            </p>
          </motion.div>

          {/* Guest Card */}
          <div className="bg-[#fcf8f5] rounded-[2rem] p-6 space-y-6 border border-rose-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <Users className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Invitado</p>
                  <p className="font-serif text-lg text-rose-950 font-bold leading-none mt-1">{guest.name}</p>
                </div>
              </div>
            </div>

            <div className="h-px bg-rose-100/50" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <Calendar className="w-5 h-5 text-rose-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Lugares</p>
                  <p className="font-serif text-lg text-rose-950 font-bold leading-none mt-1">
                    {guest.confirmedSeats} {guest.confirmedSeats === 1 ? 'Persona' : 'Personas'}
                  </p>
                </div>
              </div>
              <div className="bg-rose-600 text-white px-3 py-1.5 rounded-xl text-[10px] font-black shadow-md shadow-rose-200 uppercase tracking-widest">
                Válido
              </div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <div className="inline-block p-1 bg-rose-50 rounded-full mb-3 px-4 border border-rose-100/50">
              <p className="text-[9px] text-rose-400 font-bold uppercase tracking-[0.2em]">Sábado 24 Enero 2026</p>
            </div>
            <p className="text-[9px] text-gray-300 font-medium italic">XV Años María José • Acceso Controlado</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


