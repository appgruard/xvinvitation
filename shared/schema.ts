import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table (for admin authentication)
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Event Details
export const eventDetails = pgTable("event_details", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: timestamp("date").notNull(),
  musicUrl: text("music_url").notNull(),
  locationName: text("location_name").notNull(),
  locationAddress: text("location_address").notNull(),
  locationMapUrl: text("location_map_url").notNull(),
  bankInfo: jsonb("bank_info").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Guests
export const guests = pgTable("guests", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  invitationId: varchar("invitation_id").notNull().unique(),
  name: text("name").notNull(),
  maxSeats: integer("max_seats").notNull(),
  confirmedSeats: integer("confirmed_seats").default(0).notNull(),
  status: varchar("status", { enum: ["pending", "confirmed", "declined"] }).default("pending").notNull(),
  guestEmail: text("guest_email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Confirmations with QR data
export const confirmations = pgTable("confirmations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  guestId: varchar("guest_id").notNull(),
  status: varchar("status", { enum: ["confirmed", "declined"] }).notNull(),
  seatsConfirmed: integer("seats_confirmed").notNull(),
  qrData: jsonb("qr_data").notNull(),
  confirmedAt: timestamp("confirmed_at").defaultNow().notNull(),
});

// Zod schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGuestSchema = createInsertSchema(guests);

export const insertConfirmationSchema = createInsertSchema(confirmations);

export const insertEventDetailsSchema = createInsertSchema(eventDetails).omit({ id: true, createdAt: true, updatedAt: true });

// Type exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type Guest = typeof guests.$inferSelect;
export type InsertGuest = z.infer<typeof insertGuestSchema>;
export type Confirmation = typeof confirmations.$inferSelect;
export type InsertConfirmation = z.infer<typeof insertConfirmationSchema>;
export type EventDetail = typeof eventDetails.$inferSelect;
export type InsertEventDetail = z.infer<typeof insertEventDetailsSchema>;
