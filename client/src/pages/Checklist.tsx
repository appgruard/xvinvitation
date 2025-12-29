import { useStore } from "@/lib/store";
import { CheckSquare, Printer, Users, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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

  // We use the local guests from API since the store doesn't have the full list
  const confirmedGuests = localGuests.filter(g => g.status === "confirmed");
  const totalSeats = confirmedGuests.reduce((acc, g) => acc + (g.confirmedSeats || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = document.getElementById('checklist-content');
    if (!element) return;

    // Temporarily hide buttons for the capture
    const buttons = document.querySelectorAll('.no-export');
    buttons.forEach(btn => (btn as HTMLElement).style.display = 'none');

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`lista-invitados-mj.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      buttons.forEach(btn => (btn as HTMLElement).style.display = 'flex');
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 max-w-4xl mx-auto print:p-0">
      <div className="flex justify-between items-center mb-8 print:hidden no-export">
        <h1 className="font-serif text-3xl text-rose-900">Checklist de Invitados</h1>
        <div className="flex gap-4">
          <Button onClick={handleDownloadPDF} variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50 gap-2">
            <Download className="w-4 h-4" />
            Descargar PDF
          </Button>
          <Button onClick={handlePrint} className="bg-rose-600 hover:bg-rose-700 text-white gap-2">
            <Printer className="w-4 h-4" />
            Imprimir Lista
          </Button>
        </div>
      </div>

      <div id="checklist-content" className="border-4 border-rose-100 p-8 rounded-3xl relative overflow-hidden bg-rose-50/30">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <span className="font-script text-9xl">MJ</span>
        </div>

        <div className="text-center mb-12">
          <h2 className="font-script text-6xl text-rose-600 mb-2">María José</h2>
          <p className="font-serif text-xl text-rose-800 uppercase tracking-widest">Lista de Acceso - XV Años</p>
          <div className="w-32 h-1 bg-rose-200 mx-auto mt-4 rounded-full" />
          
          <div className="flex justify-center gap-8 mt-6">
            <div className="flex items-center gap-2 text-rose-700">
              <Users className="w-5 h-5" />
              <span className="font-bold">{confirmedGuests.length} Grupos</span>
            </div>
            <div className="flex items-center gap-2 text-rose-700">
              <CheckSquare className="w-5 h-5" />
              <span className="font-bold">{totalSeats} Invitados Totales</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-rose-200">
                <th className="py-4 font-serif text-lg text-rose-900 w-16 text-center">Check</th>
                <th className="py-4 font-serif text-lg text-rose-900">Nombre del Invitado</th>
                <th className="py-4 font-serif text-lg text-rose-900 text-center">Lugares</th>
                <th className="py-4 font-serif text-lg text-rose-900">Notas / Firma</th>
              </tr>
            </thead>
            <tbody>
              {confirmedGuests.length > 0 ? (
                confirmedGuests.map((guest, index) => (
                  <tr key={guest.id} className="border-b border-rose-100 hover:bg-rose-50/50 transition-colors">
                    <td className="py-4 text-center">
                      <div className="w-6 h-6 border-2 border-rose-300 rounded mx-auto" />
                    </td>
                    <td className="py-4 font-sans text-gray-800 font-medium">
                      {guest.name}
                    </td>
                    <td className="py-4 text-center font-bold text-rose-700">
                      {guest.confirmedSeats}
                    </td>
                    <td className="py-4 text-gray-400 italic text-sm">
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
