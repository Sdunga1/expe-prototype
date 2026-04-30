export type Property = {
  id: string;
  brand: "Expedia" | "Vrbo";
  name: string;
  unit: string;
  location: string;
  hero: string;
  guestName: string;
  checkOut: string;
  knowledge: {
    wifi: { network: string; password: string };
    amenities: { item: string; location: string }[];
    parking: string;
    houseRules: string[];
    nearby: { name: string; tag: string; distance: string }[];
    roomService: { item: string; price: string }[];
    emergency: string;
  };
};

export const properties: Property[] = [
  {
    id: "aurora-412",
    brand: "Expedia",
    name: "Aurora Boutique Hotel",
    unit: "Room 412",
    location: "Lisbon, Portugal",
    hero:
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?auto=format&fit=crop&w=1600&q=80",
    guestName: "Sarath",
    checkOut: "Sunday · 11:00 AM",
    knowledge: {
      wifi: { network: "Aurora-Guest", password: "lisbon-light-2026" },
      amenities: [
        { item: "Towels", location: "Top right drawer in the bathroom" },
        { item: "Coffee & kettle", location: "Cabinet above the minibar" },
        { item: "Iron & board", location: "Behind the wardrobe door" },
        { item: "Hair dryer", location: "Vanity drawer, left side" },
        { item: "Extra pillows", location: "Top shelf of the closet" },
        { item: "Safe", location: "Inside the wardrobe, code is your room number" },
      ],
      parking:
        "Valet parking at the main entrance, €18/night. Self-parking on Rua das Flores, 2 min walk.",
      houseRules: [
        "Quiet hours 10 PM – 7 AM",
        "No smoking inside the room",
        "Pets welcome with €25 cleaning fee",
      ],
      nearby: [
        { name: "Time Out Market", tag: "Food hall", distance: "8 min walk" },
        { name: "Miradouro de Santa Catarina", tag: "Sunset viewpoint", distance: "5 min walk" },
        { name: "Pensão Amor", tag: "Cocktails", distance: "4 min walk" },
        { name: "Pastéis de Belém", tag: "Bakery, classic", distance: "12 min tram" },
      ],
      roomService: [
        { item: "Continental breakfast", price: "€14" },
        { item: "Cheese & charcuterie board", price: "€22" },
        { item: "Glass of port", price: "€8" },
        { item: "Late-night sandwich", price: "€11" },
      ],
      emergency: "Press 0 on the room phone or tap 'Call reception' in chat.",
    },
  },
  {
    id: "pinecrest",
    brand: "Vrbo",
    name: "Pinecrest Cabin",
    unit: "Lake Tahoe",
    location: "California, USA",
    hero:
      "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?auto=format&fit=crop&w=1600&q=80",
    guestName: "Sarath",
    checkOut: "Monday · 10:00 AM",
    knowledge: {
      wifi: { network: "Pinecrest_5G", password: "tahoe-pines-9912" },
      amenities: [
        { item: "Towels", location: "Linen closet at the top of the stairs" },
        { item: "Firewood", location: "Covered rack on the back deck" },
        { item: "Snowshoes", location: "Mudroom, right side" },
        { item: "Board games", location: "Bottom drawer of the TV console" },
        { item: "First aid kit", location: "Under the kitchen sink" },
      ],
      parking: "Driveway fits 2 cars. Don't park on the road - county will tow after midnight.",
      houseRules: [
        "Quiet hours 9 PM – 8 AM",
        "Take shoes off at the entrance",
        "Trash + recycling bins go to the curb Sunday night",
      ],
      nearby: [
        { name: "Emerald Bay Overlook", tag: "Scenic drive", distance: "12 min" },
        { name: "Heavenly Village", tag: "Shops & dining", distance: "20 min" },
        { name: "Lakeside Beach", tag: "Swimming", distance: "8 min" },
        { name: "Stateline Brewery", tag: "Local craft beer", distance: "15 min" },
      ],
      roomService: [],
      emergency: "Host is reachable in chat 24/7. For medical emergencies dial 911.",
    },
  },
];

export const getProperty = (id: string) =>
  properties.find((p) => p.id === id) ?? properties[0];
