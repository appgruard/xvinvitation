import { useState, useRef } from "react";
import { useStore, Guest } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export default function RSVP({ guest }: { guest: Guest }) {
  const { updateGuestStatus } = useStore();
  const [status, setStatus] = useState<"confirmed" | "declined" | "pending">(guest.status);
  const [seats, setSeats] = useState<string>(guest.confirmedSeats > 0 ? guest.confirmedSeats.toString() : guest.maxSeats.toString());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    updateGuestStatus(guest.id, status, status === "confirmed" ? parseInt(seats) : 0);
    setIsSubmitted(true);
  };

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas") as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = `invitacion-${guest.id}.png`;
      link.click();
    }
  };

  if (isSubmitted || guest.status !== "pending") {
    const finalStatus = isSubmitted ? status : guest.status;
    const finalSeats = isSubmitted ? parseInt(seats) : guest.confirmedSeats;
    const qrData = JSON.stringify({
      id: guest.id,
      name: guest.name,
      seats: finalSeats,
      timestamp: new Date().toISOString()
    });

    return (
      <div className="text-center py-12 space-y-8 max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-rose-50 to-white p-12 rounded-xl shadow-lg border-2 border-rose-100">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h3 className="font-serif text-3xl text-rose-900 mb-2">
            {finalStatus === "confirmed" ? "¡Gracias por confirmar!" : "Gracias por avisarnos"}
          </h3>
          <p className="font-sans text-gray-600">
            {finalStatus === "confirmed" 
              ? `Hemos reservado ${finalSeats} lugar(es) para ti.` 
              : "Lamentamos que no puedas acompañarnos."}
          </p>
        </div>

        {finalStatus === "confirmed" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-xl shadow-md border border-rose-100 max-w-sm mx-auto">
              <p className="text-sm text-gray-500 mb-4 uppercase tracking-widest font-sans">Tu código de acceso</p>
              <div ref={qrRef} className="flex justify-center mb-6 p-4 bg-white rounded-lg">
                <QRCodeSVG 
                  value={qrData} 
                  size={200} 
                  level="H" 
                  includeMargin={true}
                  fgColor="#be123c"
                  bgColor="#fdf2f8"
                />
              </div>
              <p className="text-xs text-gray-400 mb-6 font-sans">Presenta este código al llegar al evento</p>
              <Button 
                onClick={downloadQR} 
                className="w-full bg-rose-600 hover:bg-rose-700 text-white gap-2"
              >
                <Download className="w-4 h-4" />
                Descargar Código QR
              </Button>
            </div>
          </div>
        )}

        <p className="mt-8 text-sm text-gray-400">Si necesitas cambiar tu respuesta, contacta a los organizadores.</p>
      </div>
    );
  }

  return (
    <div className="text-center space-y-10 max-w-2xl mx-auto">
      <h2 className="font-display text-4xl text-rose-900">Confirmación de Asistencia</h2>
      
      <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-rose-400">
        <p className="mb-8 font-serif text-lg text-gray-700">
          Hola <span className="font-bold text-rose-600">{guest.name}</span>, por favor confírmanos tu asistencia antes del 10 de Enero.
        </p>

        <div className="space-y-8 text-left max-w-sm mx-auto">
          <div className="space-y-4">
            <Label className="text-base font-semibold">¿Podrás asistir?</Label>
            <RadioGroup defaultValue={status} onValueChange={(val: any) => setStatus(val)} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="confirmed" id="r1" />
                <Label htmlFor="r1">Sí, allí estaré</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="declined" id="r2" />
                <Label htmlFor="r2">No podré asistir</Label>
              </div>
            </RadioGroup>
          </div>

          {status === "confirmed" && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
              <Label className="text-base font-semibold">Número de personas</Label>
              <p className="text-xs text-gray-500 mb-2">Tienes asignados hasta {guest.maxSeats} lugares.</p>
              <Select value={seats} onValueChange={setSeats}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona cantidad" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: guest.maxSeats }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} persona{num > 1 ? "s" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <Button 
            onClick={handleSubmit} 
            className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-6 text-lg shadow-md transition-all hover:scale-[1.02]"
          >
            Enviar Confirmación
          </Button>
        </div>
      </div>
    </div>
  );
}
