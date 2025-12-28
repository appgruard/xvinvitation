import { XCircle, CheckCircle2 } from "lucide-react";
import dressImage from "../../assets/Clothing-PNG-Photo_1766953659008.png";
import shirtImage from "../../assets/formal-shirt-formal-blue-buttoned-shirt-YgH67rKy_1766953659102.jpg";
import pantsImage from "../../assets/kindpng_625835_1766953774737.png";

export default function DressCode() {
  const forbiddenColors = [
    { color: "#FEE7F0", label: "Cuisse de nymphe" },
    { color: "#F4A6C8", label: "Cuisse de nymphe émue" },
    { color: "#FEBFD2", label: "Rose dragée" },
    { color: "#8A9A5B", label: "Moss Green" },
  ];

  const allowedColors = [
    { color: "#FFFFFF", label: "Blanco" },
    { color: "#000000", label: "Negro" },
    { color: "#000080", label: "Azul Marino" },
    { color: "#808080", label: "Gris" },
    { color: "#F5F5DC", label: "Beige" },
    { color: "#FFD700", label: "Dorado" },
  ];

  return (
    <div className="text-center space-y-12 max-w-5xl mx-auto">
      <h2 className="font-display text-4xl text-rose-900">Código de Vestimenta</h2>
      
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Women Section */}
        <div className="bg-white/80 p-8 rounded-2xl shadow-sm border border-rose-100 backdrop-blur-sm flex flex-col items-center">
          <div className="w-48 h-64 mb-6 overflow-hidden rounded-xl bg-rose-50/50 p-4 flex items-center justify-center">
            <img src={dressImage} alt="Referencia mujer" className="max-w-full max-h-full object-contain" />
          </div>
          <h4 className="font-bold text-rose-800 font-sans uppercase text-sm tracking-widest mb-2">Mujeres</h4>
          <p className="text-gray-600 font-serif italic text-lg">Vestido largo o cóctel elegante</p>
        </div>

        {/* Men Section */}
        <div className="bg-white/80 p-8 rounded-2xl shadow-sm border border-rose-100 backdrop-blur-sm flex flex-col items-center">
          <div className="flex gap-4 mb-6 h-64 items-center justify-center">
            <div className="w-32 h-full overflow-hidden rounded-xl bg-rose-50/50 p-2 flex items-center justify-center">
              <img src={shirtImage} alt="Referencia camisa" className="max-w-full max-h-full object-contain" />
            </div>
            <div className="w-32 h-full overflow-hidden rounded-xl bg-rose-50/50 p-2 flex items-center justify-center">
              <img src={pantsImage} alt="Referencia pantalón" className="max-w-full max-h-full object-contain" />
            </div>
          </div>
          <h4 className="font-bold text-rose-800 font-sans uppercase text-sm tracking-widest mb-2">Hombres</h4>
          <p className="text-gray-600 font-serif italic text-lg">Camisa y pantalón de vestir</p>
        </div>
      </div>

      <div className="bg-white/80 p-8 rounded-2xl shadow-sm border border-rose-100 backdrop-blur-sm space-y-10">
        {/* Allowed Colors */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-6 text-emerald-700 font-bold">
            <CheckCircle2 className="w-5 h-5" />
            <span className="uppercase tracking-widest text-sm">Colores Sugeridos</span>
          </div>
          <div className="flex justify-center gap-6 flex-wrap">
            {allowedColors.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 transition-transform hover:scale-110">
                <div 
                  className="w-14 h-14 rounded-full shadow-md border-4 border-white" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium text-gray-500 font-sans uppercase tracking-tighter">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-rose-50 pt-10">
          <div className="flex items-center justify-center gap-2 mb-6 text-rose-700 font-bold">
            <XCircle className="w-5 h-5" />
            <span className="uppercase tracking-widest text-sm">Colores NO Permitidos</span>
          </div>
          <div className="flex justify-center gap-6 flex-wrap">
            {forbiddenColors.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2 transition-transform hover:scale-110">
                <div 
                  className="w-14 h-14 rounded-full shadow-md border-4 border-white grayscale-[0.2]" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs font-medium text-gray-400 font-sans uppercase tracking-tighter">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
