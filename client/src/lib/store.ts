import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Guest {
  id: string;
  name: string;
  maxSeats: number;
  confirmedSeats: number;
  status: 'pending' | 'confirmed' | 'declined';
  lastViewed?: string;
}

export interface EventDetails {
  date: string; // ISO string
  musicUrl: string; // YouTube or MP3
  locationName: string;
  locationAddress: string;
  locationMapUrl: string;
  bankInfo: {
    bank: string;
    account: string;
    clabe: string;
    owner: string;
  }
}

interface AppState {
  eventDetails: EventDetails;
  guests: Guest[];
  adminPassword: string; // Mock protection
  updateEventDetails: (details: Partial<EventDetails>) => void;
  addGuest: (guest: Omit<Guest, 'status' | 'confirmedSeats'>) => void;
  updateGuestStatus: (id: string, status: Guest['status'], seats: number) => void;
  generateGuestLink: (id: string) => string;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      eventDetails: {
        date: '2026-01-24T19:30:00',
        musicUrl: 'https://www.youtube.com/watch?v=y2sS3gO9aJQ',
        locationName: 'Salón de Eventos "El Castillo"',
        locationAddress: 'Av. Vallarta 1234, Guadalajara, Jal.',
        locationMapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.656976860368!2d-103.39343362475475!3d20.67566208088219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8428ae4e98d5453d%3A0xc4fdd3929a2ecbd1!2sAv.%20Vallarta%2C%20Guadalajara%2C%20Jal.!5e0!3m2!1sen!2smx!4v1703780000000!5m2!1sen!2smx',
        bankInfo: {
          bank: 'BBVA',
          account: '1234 5678 9012',
          clabe: '012345678901234567',
          owner: 'María José Pichardo López'
        }
      },
      guests: [
        { id: 'inv-001', name: 'Familia Pérez', maxSeats: 4, confirmedSeats: 0, status: 'pending' },
        { id: 'inv-002', name: 'Juan García', maxSeats: 1, confirmedSeats: 0, status: 'pending' },
      ],
      adminPassword: 'admin',

      updateEventDetails: (details) => set((state) => ({ 
        eventDetails: { ...state.eventDetails, ...details } 
      })),

      addGuest: (guest) => set((state) => ({
        guests: [...state.guests, { ...guest, status: 'pending', confirmedSeats: 0 }]
      })),

      updateGuestStatus: (id, status, seats) => set((state) => ({
        guests: state.guests.map(g => 
          g.id === id ? { ...g, status, confirmedSeats: seats } : g
        )
      })),

      generateGuestLink: (id) => {
        return `${window.location.origin}/invitacion/${id}`;
      }
    }),
    {
      name: 'xv-app-storage',
      version: 1,
      migrate: (persistedState: any) => persistedState as AppState,
      partialize: (state) => ({
        guests: state.guests,
        eventDetails: state.eventDetails,
        adminPassword: state.adminPassword,
      }),
    }
  )
);
