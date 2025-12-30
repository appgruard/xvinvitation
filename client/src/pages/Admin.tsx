import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, Plus, Trash2, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", maxSeats: 2 });
  const [guests, setGuests] = useState<any[]>([]);
  const [confirmations, setConfirmations] = useState<any[]>([]);

  const handleLogin = () => {
    if (password === "PSangela99") {
      setIsAuthenticated(true);
      loadData();
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const loadData = async () => {
    try {
      const guestsRes = await fetch("/api/admin/guests");
      if (guestsRes.ok) {
        const data = await guestsRes.json();
        // Forzamos la actualización de confirmaciones y ordenamos
        const sortedData = [...data].sort((a, b) => {
          if (a.status === 'confirmed' && b.status !== 'confirmed') return -1;
          if (a.status !== 'confirmed' && b.status === 'confirmed') return 1;
          return a.name.localeCompare(b.name);
        });
        setGuests(sortedData);
        setConfirmations(sortedData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleAddGuest = async () => {
    if (!newGuest.name || newGuest.maxSeats < 1) {
      alert("Por favor completa los campos");
      return;
    }

    // Validación de duplicados en el frontend
    const isDuplicate = guests.some(
      (g) => g.name.toLowerCase().trim() === newGuest.name.toLowerCase().trim()
    );

    if (isDuplicate) {
      alert("Ya existe un invitado con este nombre. Si deseas crearlo de nuevo, primero debes eliminar el registro anterior.");
      return;
    }

    try {
      const res = await fetch("/api/admin/guests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newGuest)
      });
      if (res.ok) {
        const guest = await res.json();
        const fullLink = `${window.location.origin}/invitacion/${guest.invitationId}`;
        navigator.clipboard.writeText(fullLink);
        alert("Invitado creado. Enlace copiado: " + fullLink);
        setNewGuest({ name: "", maxSeats: 2 });
        loadData();
      }
    } catch (error) {
      console.error("Error creating guest:", error);
    }
  };

  const copyLink = (invitationId: string) => {
    const link = `${window.location.origin}/invitacion/${invitationId}`;
    navigator.clipboard.writeText(link);
    alert("Enlace copiado");
  };

  const handleDeleteGuest = async (guestId: string) => {
    if (!confirm("¿Estás seguro de que deseas eliminar este invitado? Esta acción no se puede deshacer.")) {
      return;
    }
    
    try {
      const res = await fetch(`/api/admin/guests/${guestId}`, {
        method: "DELETE",
      });
      
      if (res.ok) {
        alert("Invitado eliminado correctamente");
        loadData();
      } else {
        const error = await res.json();
        alert("Error al eliminar: " + (error.message || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error deleting guest:", error);
      alert("Error de conexión al intentar eliminar");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Administración XV Años</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              type="password" 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <Button onClick={handleLogin} className="w-full">Entrar</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalGuests = guests.length;
  const confirmedGuestsCount = guests.filter(g => g.status === 'confirmed').length;
  const totalSeatsConfirmed = guests.reduce((acc: number, g: any) => acc + (g.confirmedSeats || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Panel de Administración</h1>
            <Link href="/admin/checklist">
              <Button variant="outline" className="w-full sm:w-auto gap-2 text-rose-600 border-rose-200 hover:bg-rose-50">
                <FileText className="w-4 h-4" /> Checklist de Invitados
              </Button>
            </Link>
          </div>
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsAuthenticated(false)}>Salir</Button>
        </header>

        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invitaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalGuests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{confirmedGuestsCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Asientos Ocupados</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSeatsConfirmed}</div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Lista de Invitados</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2"><Plus className="w-4 h-4" /> Nueva Invitación</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Agregar Invitado</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Nombre (Familia o Persona)</Label>
                    <Input value={newGuest.name} onChange={(e) => setNewGuest({...newGuest, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Asientos Asignados</Label>
                    <Input type="number" value={newGuest.maxSeats} onChange={(e) => setNewGuest({...newGuest, maxSeats: parseInt(e.target.value)})} />
                  </div>
                  <Button onClick={handleAddGuest} className="w-full">Generar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Asientos</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {guests.map((guest) => {
                  return (
                    <TableRow key={guest.id}>
                      <TableCell className="font-medium">{guest.name}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          guest.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                          guest.status === 'declined' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {guest.status === 'confirmed' ? 'Confirmado' : guest.status === 'declined' ? 'Declinado' : 'Pendiente'}
                        </span>
                      </TableCell>
                      <TableCell>{guest.status === 'confirmed' ? `${guest.confirmedSeats} / ${guest.maxSeats}` : `- / ${guest.maxSeats}`}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => copyLink(guest.invitationId)}>
                          <Copy className="w-4 h-4 mr-2" /> Copiar
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeleteGuest(guest.id)}>
                          <Trash2 className="w-4 h-4 mr-2" /> Eliminar
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
