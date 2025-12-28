import { XCircle, CheckCircle2 } from "lucide-react";
import dressImage1 from "../../assets/Clothing-PNG-Photo_1766953659008.png";
import dressImage2 from "../../assets/elegant_long_pastel__3c9d3833.jpg";
import dressImage3 from "../../assets/elegant_long_pastel_evening_dress.png";
import shirtImage from "../../assets/new_shirt.png";
import pantsImage from "../../assets/kindpng_625835_1766953774737.png";

export default function DressCode() {
  const forbiddenColors = [
    { color: "#FEE7F0", label: "Cuisse de nymphe" },
    { color: "#F4A6C8", label: "Cuisse de nymphe émue" },
    { color: "#FEBFD2", label: "Rose dragée" },
    { color: "#8A9A5B", label: "Moss Green" },
  ];

  const allowedColors = [
    { color: "#E6E6FA", label: "Lavanda" },
    { color: "#B0C4DE", label: "Azul Acero" },
    { color: "#D8BFD8", label: "Cardo" },
    { color: "#BC8F8F", label: "Rosa Viejo" },
    { color: "#C0C0C0", label: "Plata" },
    { color: "#F5F5DC", label: "Beige" },
  ];

  return (
    <section id="dress-code" className="w-full flex justify-center py-12">
      <div className="text-center space-y-12 max-w-6xl w-full flex flex-col items-center px-4">
        <h2 className="font-display text-4xl text-rose-900 w-full text-center">Código de Vestimenta</h2>
        
        <div className="grid lg:grid-cols-2 gap-8 w-full justify-items-center">
          {/* Women Section */}
          <div className="bg-white/80 p-8 rounded-2xl shadow-sm border border-rose-100 backdrop-blur-sm flex flex-col items-center w-full max-w-md">
            <div className="flex gap-4 mb-6 h-64 items-center justify-center w-full">
              <div className="w-40 h-full overflow-hidden rounded-xl bg-rose-50/50 p-2 flex items-center justify-center">
                <img src={dressImage1} alt="Referencia mujer 1" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="w-40 h-full overflow-hidden rounded-xl bg-rose-50/50 p-2 flex items-center justify-center">
                <img src={dressImage3} alt="Referencia mujer 3" className="max-w-full max-h-full object-contain" />
              </div>
            </div>
            <h4 className="font-bold text-rose-800 font-sans uppercase text-sm tracking-widest mb-2">Mujeres</h4>
            <p className="text-gray-600 font-serif italic text-lg text-center">Vestido largo, corto o cóctel elegante</p>
          </div>

          {/* Men Section */}
          <div className="bg-white/80 p-8 rounded-2xl shadow-sm border border-rose-100 backdrop-blur-sm flex flex-col items-center w-full max-w-md">
            <div className="flex gap-4 mb-6 h-64 items-center justify-center w-full">
              <div className="w-40 h-full overflow-hidden rounded-xl bg-rose-50/50 p-2 flex items-center justify-center">
                <img src={shirtImage} alt="Referencia camisa" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="w-40 h-full overflow-hidden rounded-xl bg-rose-50/50 p-2 flex items-center justify-center">
                <img src={pantsImage} alt="Referencia pantalón" className="max-w-full max-h-full object-contain" />
              </div>
            </div>
            <h4 className="font-bold text-rose-800 font-sans uppercase text-sm tracking-widest mb-2">Hombres</h4>
            <p className="text-gray-600 font-serif italic text-lg text-center">Camisa y pantalón de vestir</p>
          </div>
        </div>

        <div className="bg-white/80 p-8 rounded-2xl shadow-sm border border-rose-100 backdrop-blur-sm space-y-10 w-full">
          {/* Allowed Colors */}
          <div className="w-full">
            <div className="flex items-center justify-center gap-2 mb-6 text-emerald-700 font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <span className="uppercase tracking-widest text-sm">Colores Sugeridos</span>
            </div>
            <div className="flex justify-center gap-6 flex-wrap w-full">
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

          <div className="border-t border-rose-50 pt-10 w-full">
            <div className="flex items-center justify-center gap-2 mb-6 text-rose-700 font-bold">
              <XCircle className="w-5 h-5" />
              <span className="uppercase tracking-widest text-sm">Colores NO Permitidos</span>
            </div>
            <div className="flex justify-center gap-6 flex-wrap w-full">
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
    </section>
  );
}
