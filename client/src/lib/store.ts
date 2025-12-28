import { create } from 'zustand';

export interface Guest {
  id: string;
  invitationId: string;
  name: string;
  maxSeats: number;
  confirmedSeats: number;
  status: 'pending' | 'confirmed' | 'declined';
}

export interface EventDetails {
  id: string;
  date: string;
  musicUrl: string;
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
  eventDetails: EventDetails | null;
  setEventDetails: (details: EventDetails) => void;
  fetchEventDetails: () => Promise<void>;
  fetchGuest: (invitationId: string) => Promise<Guest | null>;
  submitConfirmation: (guestId: string, status: 'confirmed' | 'declined', seats: number, qrData: any) => Promise<void>;
}

export const useStore = create<AppState>((set) => ({
  eventDetails: null,

  setEventDetails: (details) => set({ eventDetails: details }),

  fetchEventDetails: async () => {
    try {
      const res = await fetch('/api/event-details');
      if (res.ok) {
        const data = await res.json();
        set({ eventDetails: data });
      }
    } catch (error) {
      console.error('Failed to fetch event details:', error);
    }
  },

  fetchGuest: async (invitationId: string) => {
    try {
      const res = await fetch(`/api/guest/${invitationId}`);
      if (res.ok) {
        return await res.json();
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch guest:', error);
      return null;
    }
  },

  submitConfirmation: async (guestId: string, status: 'confirmed' | 'declined', seats: number, qrData: any) => {
    try {
      await fetch('/api/confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guestId, status, seatsConfirmed: seats, qrData })
      });
    } catch (error) {
      console.error('Failed to submit confirmation:', error);
    }
  }
}));
