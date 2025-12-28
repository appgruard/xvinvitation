import { type User, type InsertUser, type Guest, type InsertGuest, type Confirmation, type InsertConfirmation, type EventDetail, type InsertEventDetail } from "@shared/schema";
import { db } from "./db";
import { users, guests, confirmations, eventDetails } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Guests
  getGuest(id: string): Promise<Guest | undefined>;
  getGuestByInvitationId(invitationId: string): Promise<Guest | undefined>;
  getAllGuests(): Promise<Guest[]>;
  createGuest(guest: InsertGuest): Promise<Guest>;
  updateGuest(id: string, updates: Partial<Guest>): Promise<Guest | undefined>;
  deleteGuest(id: string): Promise<boolean>;
  
  // Confirmations
  createConfirmation(confirmation: InsertConfirmation): Promise<Confirmation>;
  getConfirmationByGuestId(guestId: string): Promise<Confirmation | undefined>;
  getAllConfirmations(): Promise<Confirmation[]>;
  
  // Event Details
  getEventDetails(): Promise<EventDetail | undefined>;
  updateEventDetails(id: string, updates: Partial<EventDetail>): Promise<EventDetail | undefined>;
  createEventDetails(event: InsertEventDetail): Promise<EventDetail>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Guests
  async getGuest(id: string): Promise<Guest | undefined> {
    const result = await db.select().from(guests).where(eq(guests.id, id)).limit(1);
    return result[0];
  }

  async getGuestByInvitationId(invitationId: string): Promise<Guest | undefined> {
    const result = await db.select().from(guests).where(eq(guests.invitationId, invitationId)).limit(1);
    return result[0];
  }

  async getAllGuests(): Promise<Guest[]> {
    return await db.select().from(guests);
  }

  async createGuest(guest: InsertGuest): Promise<Guest> {
    const result = await db.insert(guests).values(guest).returning();
    return result[0];
  }

  async updateGuest(id: string, updates: Partial<Guest>): Promise<Guest | undefined> {
    const result = await db.update(guests).set(updates).where(eq(guests.id, id)).returning();
    return result[0];
  }

  async deleteGuest(id: string): Promise<boolean> {
    // Eliminar confirmaciones primero para respetar integridad referencial
    await db.delete(confirmations).where(eq(confirmations.guestId, id));
    const result = await db.delete(guests).where(eq(guests.id, id)).returning();
    return result.length > 0;
  }

  // Confirmations
  async createConfirmation(confirmation: InsertConfirmation): Promise<Confirmation> {
    const result = await db.insert(confirmations).values(confirmation).returning();
    return result[0];
  }

  async getConfirmationByGuestId(guestId: string): Promise<Confirmation | undefined> {
    const result = await db.select().from(confirmations).where(eq(confirmations.guestId, guestId)).limit(1);
    return result[0];
  }

  async getAllConfirmations(): Promise<Confirmation[]> {
    return await db.select().from(confirmations);
  }

  // Event Details
  async getEventDetails(): Promise<EventDetail | undefined> {
    const result = await db.select().from(eventDetails).limit(1);
    return result[0];
  }

  async updateEventDetails(id: string, updates: Partial<EventDetail>): Promise<EventDetail | undefined> {
    const result = await db.update(eventDetails).set(updates).where(eq(eventDetails.id, id)).returning();
    return result[0];
  }

  async createEventDetails(event: InsertEventDetail): Promise<EventDetail> {
    const result = await db.insert(eventDetails).values(event).returning();
    return result[0];
  }
}

export const storage = new DatabaseStorage();