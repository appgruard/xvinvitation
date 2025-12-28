import { Gift, ShoppingBag, Gem, Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import imgGifts from "../../assets/gallery/MBFP_205_1766948087931.jpg";

export default function Gifts() {
  const [copied, setCopied] = useState(false);
  const bankInfo = {
    titular: "Ángela López",
    cedula: "05401367031",
    banco: "BHD",
    tipoCuenta: "Cuenta de ahorro",
    numeroCuenta: "10102690028"
  };

  const copyToClipboard = () => {
    const text = `Titular: ${bankInfo.titular}\nCédula: ${bankInfo.cedula}\nBanco: ${bankInfo.banco}\nTipo de Cuenta: ${bankInfo.tipoCuenta}\nNúmero de Cuenta: ${bankInfo.numeroCuenta}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const giftCategories = [
    { icon: <ShoppingBag className="w-8 h-8" />, label: "Cosméticos", desc: "Cuidado de la piel y maquillaje" },
    { icon: <Gem className="w-8 h-8" />, label: "Joyería", desc: "Accesorios para complementar" },
    { icon: <ShoppingBag className="w-8 h-8" />, label: "Complementos", desc: "Carteras, bolsos y más" },
  ];

  return (
    <div className="text-center space-y-12">
      <h2 className="font-display text-4xl text-rose-900">Mesa de Regalos</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto mb-8">
        <div className="flex-1 w-full h-80 rounded-lg overflow-hidden shadow-lg border-4 border-white">
          <img 
            src={imgGifts} 
            alt="Mesa de regalos" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-4 text-center md:text-left p-6">
          <p className="font-serif italic text-rose-800 text-2xl mb-4">
            "Vuestra compañía es mi mejor regalo..."
          </p>
          <p className="font-sans text-gray-600 text-lg">
            Si además deseas obsequiarme un detalle para atesorar este momento, aquí te comparto algunas ideas que me harían mucha ilusión.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {giftCategories.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-rose-50 hover:shadow-md transition-shadow flex flex-col items-center gap-4">
            <div className="text-rose-400 bg-rose-50 p-4 rounded-full">
              {item.icon}
            </div>
            <h3 className="font-serif text-xl text-gray-800">{item.label}</h3>
            <p className="text-sm text-gray-500 font-sans">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="max-w-md mx-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full py-8 border-2 border-rose-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-300 text-rose-600 flex flex-col gap-2 h-auto">
              <Gift className="w-6 h-6" />
              <span className="font-serif text-lg">Regalo en Efectivo</span>
              <span className="font-sans text-xs text-gray-400 font-normal">Clic para ver datos bancarios</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white border-rose-100">
            <DialogHeader>
              <DialogTitle className="text-center font-serif text-2xl text-rose-900">Datos Bancarios</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-1 bg-rose-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Titular</p>
                <p className="font-medium text-gray-900">{bankInfo.titular}</p>
              </div>
              <div className="space-y-1 bg-rose-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Cédula</p>
                <p className="font-mono text-gray-900">{bankInfo.cedula}</p>
              </div>
              <div className="space-y-1 bg-rose-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Banco</p>
                <p className="font-medium text-gray-900">{bankInfo.banco}</p>
              </div>
              <div className="space-y-1 bg-rose-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Tipo de Cuenta</p>
                <p className="font-medium text-gray-900">{bankInfo.tipoCuenta}</p>
              </div>
              <div className="space-y-1 bg-rose-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Número de Cuenta</p>
                <p className="font-mono text-gray-900">{bankInfo.numeroCuenta}</p>
              </div>
              
              <Button onClick={copyToClipboard} className="w-full bg-rose-600 hover:bg-rose-700 text-white mt-4 gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "¡Copiado!" : "Copiar Datos"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
