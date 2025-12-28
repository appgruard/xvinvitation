import { XCircle } from "lucide-react";
import dress1 from "../../../attached_assets/1_20251228_174214_0000_1766958307849.png";
import dress2 from "../../../attached_assets/2_20251228_174214_0001_1766958307885.png";
import dress3 from "../../../attached_assets/3_20251228_174214_0002_1766958307910.png";
import dress5 from "../../../attached_assets/5_20251228_174214_0004_1766958307957.png";
import dress7 from "../../../attached_assets/7_20251228_174214_0006_1766958307938.png";
import dress8 from "../../../attached_assets/8_20251228_174214_0007_1766958307700.png";
import dress9 from "../../../attached_assets/9_20251228_174214_0008_1766958307785.png";
import dress10 from "../../../attached_assets/10_20251228_174214_0009_1766958307823.png";
import shirtImage from "../../assets/new_shirt.png";
import pantsImage from "../../assets/kindpng_625835_1766953774737.png";

export default function DressCode() {
  const forbiddenColors = [
    { color: "#FEE7F0", label: "Cuisse de nymphe" },
    { color: "#F4A6C8", label: "Cuisse de nymphe émue" },
    { color: "#FEBFD2", label: "Rose dragée" },
    { color: "#8A9A5B", label: "Moss Green" },
  ];

  const womenImages = [dress1, dress2, dress3, dress5, dress7, dress8, dress9, dress10];

  return (
    <section id="dress-code" className="w-full flex justify-center py-12 px-4">
      <div className="text-center space-y-12 w-full max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="font-display text-4xl text-rose-900 w-full text-center">Código de Vestimenta</h2>
        
        <div className="grid lg:grid-cols-2 gap-12 w-full items-start">
          {/* Women Section */}
          <div className="bg-white/80 p-8 rounded-2xl shadow-sm border border-rose-100 backdrop-blur-sm flex flex-col items-center w-full">
            <h4 className="font-bold text-rose-800 font-sans uppercase text-sm tracking-widest mb-6 border-b border-rose-100 pb-2 w-full">Mujeres</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 w-full">
              {womenImages.map((img, idx) => (
                <div key={idx} className="aspect-[3/5] overflow-hidden rounded-lg bg-rose-50/50 p-1 flex items-center justify-center border border-rose-50 hover:border-rose-200 transition-colors shadow-sm">
                  <img src={img} alt={`Referencia mujer ${idx + 1}`} className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-300" />
                </div>
              ))}
            </div>
            <p className="text-gray-600 font-serif italic text-lg text-center leading-relaxed">Vestido largo, corto o cóctel elegante</p>
          </div>

          {/* Men Section */}
          <div className="bg-white/80 p-8 rounded-2xl shadow-sm border border-rose-100 backdrop-blur-sm flex flex-col items-center w-full h-full justify-between">
            <div className="w-full flex flex-col items-center">
              <h4 className="font-bold text-rose-800 font-sans uppercase text-sm tracking-widest mb-6 border-b border-rose-100 pb-2 w-full text-center">Hombres</h4>
              <div className="flex gap-4 mb-8 h-80 items-center justify-center w-full">
                <div className="w-1/2 h-full overflow-hidden rounded-xl bg-rose-50/50 p-4 flex items-center justify-center border border-rose-50 shadow-sm">
                  <img src={shirtImage} alt="Referencia camisa" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="w-1/2 h-full overflow-hidden rounded-xl bg-rose-50/50 p-4 flex items-center justify-center border border-rose-50 shadow-sm">
                  <img src={pantsImage} alt="Referencia pantalón" className="max-w-full max-h-full object-contain" />
                </div>
              </div>
            </div>
            <p className="text-gray-600 font-serif italic text-lg text-center leading-relaxed">Camisa y pantalón de vestir</p>
          </div>
        </div>

        {/* Forbidden Colors Only */}
        <div className="bg-white/80 p-10 rounded-2xl shadow-sm border border-rose-100 backdrop-blur-sm w-full max-w-3xl">
          <div className="flex items-center justify-center gap-3 mb-8 text-rose-700 font-bold">
            <XCircle className="w-6 h-6" />
            <span className="uppercase tracking-[0.2em] text-sm">Colores NO Permitidos</span>
          </div>
          <div className="flex justify-center gap-8 flex-wrap">
            {forbiddenColors.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 transition-all hover:scale-110 group">
                <div 
                  className="w-16 h-16 rounded-full shadow-lg border-4 border-white grayscale-[0.2] group-hover:grayscale-0 transition-all duration-300" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[10px] font-bold text-gray-400 font-sans uppercase tracking-widest text-center max-w-[80px]">{item.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-8 text-rose-400 text-xs italic font-serif">Agradecemos tu comprensión al evitar estos tonos reservados.</p>
        </div>
      </div>
    </section>
  );
}
