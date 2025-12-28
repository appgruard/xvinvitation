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
import { Copy, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", maxSeats: 2 });
  const [guests, setGuests] = useState<any[]>([]);
  const [confirmations, setConfirmations] = useState<any[]>([]);

  const handleLogin = () => {
    if (password === "admin") {
      setIsAuthenticated(true);
      loadData();
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const loadData = async () => {
    try {
      const guestsRes = await fetch("/api/admin/guests");
      const confsRes = await fetch("/api/admin/confirmations");
      if (guestsRes.ok) setGuests(await guestsRes.json());
      if (confsRes.ok) setConfirmations(await confsRes.json());
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleAddGuest = async () => {
    if (!newGuest.name || newGuest.maxSeats < 1) {
      alert("Por favor completa los campos");
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
  const confirmedGuests = confirmations.filter(c => c.status === 'confirmed').length;
  const totalSeatsConfirmed = confirmations.reduce((acc: number, c: any) => acc + (c.seatsConfirmed || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Panel de Administración</h1>
          <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Salir</Button>
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
              <div className="text-2xl font-bold">{confirmedGuests}</div>
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
                  const conf = confirmations.find(c => c.guestId === guest.id);
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
                      <TableCell>{conf ? `${conf.seatsConfirmed} / ${guest.maxSeats}` : `- / ${guest.maxSeats}`}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="ghost" onClick={() => copyLink(guest.invitationId)}>
                          <Copy className="w-4 h-4 mr-2" /> Copiar
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
