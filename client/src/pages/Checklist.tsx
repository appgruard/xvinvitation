import { useStore } from "@/lib/store";
import { CheckSquare, Printer, Users, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useEffect, useState } from "react";

export default function Checklist() {
  const { guests } = useStore() as any;
  const [dataLoaded, setDataLoaded] = useState(false);
  const [localGuests, setLocalGuests] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/admin/guests");
        if (res.ok) {
          const data = await res.json();
          setLocalGuests(data);
          setDataLoaded(true);
        }
      } catch (error) {
        console.error("Error loading checklist data:", error);
      }
    };
    loadData();
  }, []);

  const confirmedGuests = localGuests.filter(g => g.status === "confirmed");
  const totalSeats = confirmedGuests.reduce((acc, g) => acc + (g.confirmedSeats || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(22);
      doc.setTextColor(159, 18, 57); // Rose 800
      doc.text("Maria Jose", 105, 20, { align: "center" });
      
      doc.setFontSize(14);
      doc.setTextColor(100);
      doc.text("Checklist de Invitados - XV Anos", 105, 30, { align: "center" });
      
      doc.setFontSize(10);
      doc.text(`Total Grupos: ${confirmedGuests.length} | Total Invitados: ${totalSeats}`, 105, 38, { align: "center" });
      
      // Table
      const tableData = confirmedGuests.map((guest, index) => [
        "[  ]", // Checkbox placeholder
        guest.name,
        guest.confirmedSeats,
        "_______________________"
      ]);

      autoTable(doc, {
        startY: 45,
        head: [['Check', 'Invitado', 'Lugares', 'Notas / Firma']],
        body: tableData,
        headStyles: { 
          fillColor: [159, 18, 57],
          textColor: [255, 255, 255],
          fontStyle: 'bold'
        },
        columnStyles: {
          0: { cellWidth: 20, halign: 'center' },
          2: { cellWidth: 20, halign: 'center' },
          3: { cellWidth: 50 }
        },
        styles: {
          font: "helvetica",
          fontSize: 10
        }
      });

      doc.save(`lista-invitados-mj.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Hubo un error al generar el PDF. Por favor intenta de nuevo.');
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-8 max-w-4xl mx-auto print:p-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 print:hidden no-export">
        <h1 className="font-serif text-2xl sm:text-3xl text-rose-900">Checklist de Invitados</h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button onClick={handleDownloadPDF} variant="outline" className="w-full sm:w-auto border-rose-200 text-rose-700 hover:bg-rose-50 gap-2">
            <Download className="w-4 h-4" />
            Descargar PDF
          </Button>
          <Button onClick={handlePrint} className="w-full sm:w-auto bg-rose-600 hover:bg-rose-700 text-white gap-2">
            <Printer className="w-4 h-4" />
            Imprimir Lista
          </Button>
        </div>
      </div>

      <div id="checklist-content" className="border-2 sm:border-4 border-rose-100 p-4 sm:p-8 rounded-2xl sm:rounded-3xl relative overflow-hidden bg-rose-50/30">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-4 opacity-10 hidden sm:block">
          <span className="font-script text-9xl">MJ</span>
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-script text-4xl sm:text-6xl text-rose-600 mb-2">María José</h2>
          <p className="font-serif text-lg sm:text-xl text-rose-800 uppercase tracking-widest">Lista de Acceso</p>
          <div className="w-24 sm:w-32 h-1 bg-rose-200 mx-auto mt-4 rounded-full" />
          
          <div className="flex justify-center gap-4 sm:gap-8 mt-6">
            <div className="flex items-center gap-2 text-rose-700">
              <Users className="w-4 h-4 sm:w-5 h-5" />
              <span className="font-bold text-sm sm:text-base">{confirmedGuests.length} Grupos</span>
            </div>
            <div className="flex items-center gap-2 text-rose-700">
              <CheckSquare className="w-4 h-4 sm:w-5 h-5" />
              <span className="font-bold text-sm sm:text-base">{totalSeats} Invitados</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-rose-200">
                  <th className="py-3 px-2 sm:py-4 font-serif text-base sm:text-lg text-rose-900 w-12 sm:w-16 text-center">✓</th>
                  <th className="py-3 px-2 sm:py-4 font-serif text-base sm:text-lg text-rose-900">Invitado</th>
                  <th className="py-3 px-2 sm:py-4 font-serif text-base sm:text-lg text-rose-900 text-center">Lug.</th>
                  <th className="py-3 px-2 sm:py-4 font-serif text-base sm:text-lg text-rose-900 hidden sm:table-cell">Notas / Firma</th>
                </tr>
              </thead>
              <tbody>
                {confirmedGuests.length > 0 ? (
                  confirmedGuests.map((guest, index) => (
                    <tr key={guest.id} className="border-b border-rose-100 hover:bg-rose-50/50 transition-colors">
                      <td className="py-3 sm:py-4 text-center">
                        <div className="w-5 h-5 sm:w-6 h-6 border-2 border-rose-300 rounded mx-auto" />
                      </td>
                      <td className="py-3 px-2 sm:py-4 font-sans text-gray-800 font-medium text-sm sm:text-base">
                        {guest.name}
                        <div className="sm:hidden mt-1 text-[10px] text-gray-400 italic">____________________</div>
                      </td>
                      <td className="py-3 px-2 sm:py-4 text-center font-bold text-rose-700 text-sm sm:text-base">
                        {guest.confirmedSeats}
                      </td>
                      <td className="py-3 px-2 sm:py-4 text-gray-400 italic text-sm hidden sm:table-cell">
                        _______________________
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-gray-500 italic">
                      Aún no hay invitados confirmados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-12 text-center text-xs text-rose-300 uppercase tracking-widest print:mt-20">
          Evento: 24 de Enero, 2026 • María José Quinceañera
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white; }
          .print\\:hidden { display: none !important; }
          .bg-rose-50\\/30 { background-color: transparent !important; }
          .border-rose-100 { border-color: #ffe4e6 !important; }
        }
      `}} />
    </div>
  );
}
