import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { randomBytes } from "crypto";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Initialize default event if not exists
  const existingEvent = await storage.getEventDetails();
  if (!existingEvent) {
    await storage.createEventDetails({
      date: new Date("2026-01-24T19:30:00"),
      musicUrl: "https://www.youtube.com/watch?v=y2sS3gO9aJQ",
      locationName: 'Salón de Eventos "El Castillo"',
      locationAddress: "Av. Vallarta 1234, Guadalajara, Jal.",
      locationMapUrl: "https://www.google.com/maps/embed?pb=...",
      bankInfo: {
        bank: "BBVA",
        account: "1234 5678 9012",
        clabe: "012345678901234567",
        owner: "María José Pichardo López"
      }
    });
  }

  // GET /api/guest/:invitationId - Get guest by invitation ID
  app.get("/api/guest/:invitationId", async (req, res) => {
    try {
      const guest = await storage.getGuestByInvitationId(req.params.invitationId);
      if (!guest) {
        return res.status(404).json({ error: "Guest not found" });
      }
      res.json(guest);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch guest" });
    }
  });

  // POST /api/confirmation - Create confirmation
  app.post("/api/confirmation", async (req, res) => {
    try {
      const { guestId, status, seatsConfirmed, qrData } = req.body;
      
      if (!guestId || !status || seatsConfirmed === undefined) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const confirmation = await storage.createConfirmation({
        guestId,
        status,
        seatsConfirmed,
        qrData
      });

      // Update guest status
      const guest = await storage.getGuest(guestId);
      if (guest) {
        await storage.updateGuest(guestId, {
          status: status as "confirmed" | "declined",
          confirmedSeats: status === "confirmed" ? seatsConfirmed : 0
        });
      }

      res.json(confirmation);
    } catch (error) {
      res.status(500).json({ error: "Failed to create confirmation" });
    }
  });

  // GET /api/event-details - Get event details
  app.get("/api/event-details", async (req, res) => {
    try {
      const event = await storage.getEventDetails();
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(event);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch event details" });
    }
  });

  // PUT /api/event-details/:id - Update event details
  app.put("/api/event-details/:id", async (req, res) => {
    try {
      const updated = await storage.updateEventDetails(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: "Event not found" });
      }
      res.json(updated);
    } catch (error) {
      res.status(500).json({ error: "Failed to update event details" });
    }
  });

  // GET /api/admin/guests - Get all guests (admin)
  app.get("/api/admin/guests", async (req, res) => {
    try {
      const guests = await storage.getAllGuests();
      res.json(guests);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch guests" });
    }
  });

  // POST /api/admin/guests - Create new guest (admin)
  app.post("/api/admin/guests", async (req, res) => {
    try {
      const { name, maxSeats } = req.body;
      
      if (!name || !maxSeats) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const invitationId = `inv-${randomBytes(8).toString("hex")}`;
      const guest = await storage.createGuest({
        invitationId,
        name,
        maxSeats,
        confirmedSeats: 0,
        status: "pending"
      });

      res.json({ ...guest, invitationLink: `${process.env.BASE_URL || "http://localhost:5000"}/invitacion/${invitationId}` });
    } catch (error) {
      res.status(500).json({ error: "Failed to create guest" });
    }
  });

  // GET /api/admin/confirmations - Get all confirmations (admin)
  app.get("/api/admin/confirmations", async (req, res) => {
    try {
      const confirmations = await storage.getAllConfirmations();
      const guests = await storage.getAllGuests();
      
      const data = confirmations.map(conf => {
        const guest = guests.find(g => g.id === conf.guestId);
        return { ...conf, guestName: guest?.name };
      });
      
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch confirmations" });
    }
  });

  return httpServer;
}
