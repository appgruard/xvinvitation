import { XCircle } from "lucide-react";

export default function DressCode() {
  const forbiddenColors = [
    { color: "#FFFFFF", label: "Blanco" },
    { color: "#FEE7F0", label: "Cuisse de nymphe" },
    { color: "#F4A6C8", label: "Cuisse de nymphe émue" },
    { color: "#FEBFD2", label: "Rose dragée" },
    { color: "#8A9A5B", label: "Moss Green" },
  ];

  return (
    <div className="text-center space-y-10 max-w-4xl mx-auto">
      <h2 className="font-display text-4xl text-rose-900">Código de Vestimenta</h2>
      
      <div className="bg-white/80 p-8 rounded-xl shadow-sm border border-rose-100 backdrop-blur-sm">
        <p className="font-serif text-xl mb-4 text-gray-800">Formal Estándar</p>
        <div className="grid md:grid-cols-2 gap-8 text-left mt-8">
          <div className="space-y-2">
            <h4 className="font-bold text-rose-800 font-sans uppercase text-sm tracking-wider">Mujeres</h4>
            <p className="text-gray-600 font-serif">Vestido largo o cóctel elegante.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-rose-800 font-sans uppercase text-sm tracking-wider">Hombres</h4>
            <p className="text-gray-600 font-serif">Camisa y pantalón de vestir (traje opcional).</p>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-100 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4 text-rose-700 font-bold">
            <XCircle className="w-5 h-5" />
            <span className="uppercase tracking-widest text-sm">Colores NO Permitidos</span>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            {forbiddenColors.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div 
                  className="w-12 h-12 rounded-full shadow-md border-2 border-white" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
