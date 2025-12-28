import { useState } from "react";
import { useStore, Guest } from "@/lib/store";
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
import { Copy, Plus, Settings, Users, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function Admin() {
  const store = useStore();
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", maxSeats: 2 });

  const handleLogin = () => {
    if (password === store.adminPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const handleAddGuest = () => {
    const id = "inv-" + Math.random().toString(36).substr(2, 9);
    store.addGuest({ id, name: newGuest.name, maxSeats: newGuest.maxSeats });
    setNewGuest({ name: "", maxSeats: 2 });
  };

  const copyLink = (id: string) => {
    const link = store.generateGuestLink(id);
    navigator.clipboard.writeText(link);
    alert("Enlace copiado: " + link);
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

  const totalGuests = store.guests.length;
  const confirmedGuests = store.guests.filter(g => g.status === "confirmed").length;
  const totalSeatsConfirmed = store.guests.reduce((acc, curr) => acc + (curr.confirmedSeats || 0), 0);

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
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalGuests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Confirmaciones</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{confirmedGuests}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Asientos Ocupados</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
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
                {store.guests.map((guest) => (
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
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" onClick={() => copyLink(guest.id)}>
                        <Copy className="w-4 h-4 mr-2" /> Copiar Enlace
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <div className="mt-8 p-4 bg-white rounded-lg border text-sm text-gray-500">
           <p>Configuración rápida: Fecha del evento: {format(new Date(store.eventDetails.date), "dd/MM/yyyy HH:mm")}</p>
        </div>
      </div>
    </div>
  );
}

function CheckCircle(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    )
  }
