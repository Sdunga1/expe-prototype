export type Message = {
  id: string;
  from: "expe" | "guest" | "reception";
  text: string;
  timestamp: string;
  meta?: { kind: "ticket"; ticketId: string; summary: string };
};

export type Conversation = {
  propertyId: string;
  messages: Message[];
};

export const conversations: Conversation[] = [
  {
    propertyId: "aurora-412",
    messages: [
      {
        id: "m1",
        from: "expe",
        text:
          "Welcome to Aurora, Sarath. Room 412 is yours until Sunday morning. I'm Expe - here whenever you need me. Just say the word.",
        timestamp: "3:14 PM",
      },
      {
        id: "m2",
        from: "expe",
        text:
          "Quick orientation: wifi is Aurora-Guest, password lisbon-light-2026. Towels are in the top right drawer of the bathroom. Sunset over the Tagus is at 7:42 - Miradouro de Santa Catarina is a 5-minute walk.",
        timestamp: "3:14 PM",
      },
      {
        id: "m3",
        from: "guest",
        text: "where can I find an iron",
        timestamp: "5:02 PM",
      },
      {
        id: "m4",
        from: "expe",
        text: "Behind the wardrobe door - board folds out from the same panel.",
        timestamp: "5:02 PM",
      },
      {
        id: "m5",
        from: "guest",
        text: "can I get two extra pillows",
        timestamp: "9:18 PM",
      },
      {
        id: "m6",
        from: "expe",
        text:
          "Done - sending two extra pillows to Room 412. Housekeeping will knock in about 10 minutes.",
        timestamp: "9:18 PM",
        meta: {
          kind: "ticket",
          ticketId: "AUR-4471",
          summary: "Extra pillows × 2 → Room 412",
        },
      },
      {
        id: "m7",
        from: "guest",
        text: "what time does the rooftop bar close tonight",
        timestamp: "10:46 PM",
      },
      {
        id: "m8",
        from: "expe",
        text:
          "Let me get reception on this - they'll reply right here in a moment.",
        timestamp: "10:46 PM",
      },
      {
        id: "m9",
        from: "reception",
        text:
          "Hi Sarath - Inês at the front desk. Rooftop closes at 1 AM tonight, last call 12:30. Want me to hold a table for two?",
        timestamp: "10:47 PM",
      },
      {
        id: "m10",
        from: "expe",
        text:
          "Heads-up for tomorrow: checkout is 11 AM. I'll remind you in the morning. Don't forget the charger by the bed and your jacket on the closet door.",
        timestamp: "Sat, 10:30 PM",
      },
    ],
  },
  {
    propertyId: "pinecrest",
    messages: [
      {
        id: "m1",
        from: "expe",
        text:
          "Welcome to Pinecrest, Sarath. The cabin is all yours through Monday morning. I'm Expe - your concierge for the stay.",
        timestamp: "4:02 PM",
      },
      {
        id: "m2",
        from: "expe",
        text:
          "Wifi is Pinecrest_5G, password tahoe-pines-9912. Firewood is on the back deck under the cover. The fireplace pull is on the right side of the mantle.",
        timestamp: "4:02 PM",
      },
      {
        id: "m3",
        from: "guest",
        text: "where are the snowshoes",
        timestamp: "8:11 AM",
      },
      {
        id: "m4",
        from: "expe",
        text: "Mudroom, right side - three pairs hanging by size.",
        timestamp: "8:11 AM",
      },
      {
        id: "m5",
        from: "guest",
        text: "the hot tub jets aren't turning on",
        timestamp: "9:24 PM",
      },
      {
        id: "m6",
        from: "expe",
        text:
          "Looping in your host - they'll reply in this chat shortly. In the meantime, the breaker for the tub is in the mudroom panel, third from the top.",
        timestamp: "9:24 PM",
        meta: {
          kind: "ticket",
          ticketId: "PIN-0188",
          summary: "Hot tub jets unresponsive - host to confirm",
        },
      },
      {
        id: "m7",
        from: "reception",
        text:
          "Hey Sarath, it's Megan (host). The breaker trips sometimes after a power flicker - flipping it should bring the jets back. Let me know if not, I'll come by in the morning.",
        timestamp: "9:27 PM",
      },
    ],
  },
];

export const getConversation = (propertyId: string) =>
  conversations.find((c) => c.propertyId === propertyId) ?? conversations[0];
