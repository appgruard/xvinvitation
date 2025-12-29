import React, { useEffect, useState } from "react";
import { CheckSquare, Printer, Users, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Checklist() {
  const [localGuests, setLocalGuests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("/api/admin/guests");
        if (res.ok) {
          const data = await res.json();
          setLocalGuests(data);
        }
      } catch (error) {
        console.error("Error loading checklist data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const confirmedGuests = localGuests.filter(g => g.status === "confirmed");
  const totalSeats = confirmedGuests.reduce((acc, g) => acc + (g.confirmedSeats || 0), 0);

  const handlePrint = () => {
    // Basic reliable print call
    window.print();
  };

  const handleDownloadPDF = () => {
    try {
      // @ts-ignore
      const jspdf = window.jspdf;
      if (!jspdf) {
        alert("Las herramientas de PDF se están cargando. Por favor, usa el botón de Imprimir y elige 'Guardar como PDF' en tu navegador.");
        return;
      }

      const doc = new jspdf.jsPDF();
      
      // Background and Borders
      doc.setDrawColor(255, 228, 230); // rose-100
      doc.setLineWidth(0.5);
      doc.rect(8, 8, 194, 281); // Page border sutil

      // Decorative corner elements with circles/dots to simulate floral pattern since we can't easily load external assets in jspdf without base64
      const drawFlower = (x: number, y: number) => {
        doc.setDrawColor(244, 63, 94); // rose-500
        doc.setLineWidth(0.2);
        for(let i=0; i<6; i++) {
          const angle = (i * Math.PI * 2) / 6;
          doc.ellipse(x + Math.cos(angle)*2, y + Math.sin(angle)*2, 1.5, 1.5);
        }
        doc.setFillColor(251, 191, 36); // center
        doc.circle(x, y, 0.8, 'FD');
      };

      drawFlower(15, 15);
      drawFlower(195, 15);
      drawFlower(15, 282);
      drawFlower(195, 282);

      // Header
      // Usando 'times' italic para simular un estilo manuscrito elegante similar a la fuente 'script' de la web
      doc.setFont("times", "italic");
      doc.setFontSize(60); // Reducido de 72 a 60
      doc.setTextColor(225, 29, 72); // rose-600
      doc.text("María José", 105, 45, { align: "center" });
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(159, 18, 57); // rose-900
      doc.text("L I S T A   D E   A C C E S O", 105, 55, { align: "center" });
      
      // Sub-header stats
      doc.setDrawColor(254, 205, 211); // rose-200
      doc.line(70, 58, 140, 58);
      
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`${confirmedGuests.length} GRUPOS | ${totalSeats} INVITADOS`, 105, 60, { align: "center" });

      const tableData = confirmedGuests.map((guest) => [
        "", // Checkbox column
        guest.name.toUpperCase(),
        guest.confirmedSeats.toString(),
        "" // Signature column
      ]);

      // @ts-ignore
      if (doc.autoTable) {
        // @ts-ignore
        doc.autoTable({
          startY: 70,
          head: [['✓', 'INVITADO', 'LUG.', 'FIRMA / NOTAS']],
          body: tableData,
          theme: 'plain', // Cambiado a plain para quitar la "tabla cuadrada" rígida
          headStyles: { 
            fillColor: [255, 255, 255], // Fondo blanco para el encabezado
            textColor: [159, 18, 57], // Texto rose-900
            fontStyle: 'bold',
            halign: 'center',
            fontSize: 11,
            lineWidth: { bottom: 0.5 },
            lineColor: [251, 113, 133] // rose-400 border bottom
          },
          columnStyles: {
            0: { cellWidth: 15, halign: 'center' },
            1: { cellPadding: { left: 5, top: 6, bottom: 6 }, textColor: [50, 50, 50] },
            2: { halign: 'center', fontStyle: 'bold', textColor: [225, 29, 72] },
            3: { cellWidth: 55 }
          },
          styles: {
            font: "helvetica",
            fontSize: 10,
            cellPadding: 5,
            lineWidth: 0, // Quitamos todos los bordes de celda por defecto
          },
          didDrawCell: (data: any) => {
            // Dibujar solo la línea inferior para un look más moderno y abierto
            if (data.section === 'body') {
              doc.setDrawColor(255, 228, 230); // rose-100
              doc.setLineWidth(0.1);
              doc.line(data.cell.x, data.cell.y + data.cell.height, data.cell.x + data.cell.width, data.cell.y + data.cell.height);
              
              if (data.column.index === 0) {
                // Checkbox circular más bonito
                doc.setDrawColor(251, 113, 133); // rose-400
                doc.setLineWidth(0.3);
                doc.ellipse(data.cell.x + 7.5, data.cell.y + data.cell.height/2, 2.5, 2.5);
              }
              
              if (data.column.index === 3) {
                // Línea de firma sutil
                doc.setDrawColor(220, 220, 220);
                doc.setLineWidth(0.1);
                doc.line(data.cell.x + 5, data.cell.y + data.cell.height - 4, data.cell.x + data.cell.width - 5, data.cell.y + data.cell.height - 4);
              }
            }
          }
        });
      }

      // Footer
      const finalY = (doc as any).lastAutoTable.finalY || 200;
      doc.setFontSize(9);
      doc.setTextColor(190, 190, 190);
      doc.text("E V E N T O :  2 4  D E  E N E R O ,  2 0 2 6", 105, 285, { align: "center" });

      doc.save(`Checklist-MJ-${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error(error);
      window.print();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

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
