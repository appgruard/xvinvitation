import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function Landing() {
  return (
    <div className="min-h-screen bg-rose-50 flex flex-col items-center justify-center p-4 text-center space-y-8 font-serif">
      <div className="space-y-4">
        <p className="tracking-widest uppercase text-sm text-gray-500">Bienvenido al sitio de</p>
        <h1 className="text-5xl md:text-7xl text-rose-900 font-script">María José</h1>
        <p className="text-xl text-rose-800 italic">Mis XV Años</p>
      </div>
      
      <div className="max-w-md bg-white p-8 rounded-lg shadow-xl border border-rose-100">
        <p className="text-gray-600 font-sans mb-6">
          Este sitio es para gestionar las invitaciones y confirmar asistencia.
          Si recibiste una invitación digital, por favor usa el enlace personalizado que se te envió.
        </p>
        
        <Link href="/admin">
          <Button variant="ghost" className="text-xs text-gray-400 hover:text-gray-600">
            Acceso Administrativo
          </Button>
        </Link>
      </div>
    </div>
  );
}
