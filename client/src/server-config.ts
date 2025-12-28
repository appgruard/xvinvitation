export const updateEventDetailsInDb = async () => {
  const eventData = {
    date: new Date("2026-01-24T19:30:00"),
    musicUrl: "https://youtu.be/InTk6QkidRM?si=FU81IL70u85m59gg",
    locationName: "Salón de Eventos Especial",
    locationAddress: "📍 Consultar en Google Maps",
    locationMapUrl: "https://www.google.com/maps/embed?pb=",
    bankInfo: {
      bank: "BHD",
      account: "10102690028",
      clabe: "010240001010269002",
      owner: "Ángela López"
    }
  };
  return eventData;
};
