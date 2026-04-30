export type Ticket = {
  id: string;
  propertyId: string;
  room: string;
  guest: string;
  summary: string;
  detail: string;
  raisedAt: string;
  status: "new" | "in-progress" | "resolved";
  channel: "expe-auto" | "expe-handoff";
  priority: "low" | "normal" | "high";
};

export const tickets: Ticket[] = [
  {
    id: "AUR-4471",
    propertyId: "aurora-412",
    room: "412",
    guest: "Sarath D.",
    summary: "Extra pillows × 2",
    detail:
      "Guest asked for two extra pillows in chat. Auto-fulfilled by Expe. Housekeeping notified.",
    raisedAt: "9:18 PM",
    status: "in-progress",
    channel: "expe-auto",
    priority: "low",
  },
  {
    id: "AUR-4472",
    propertyId: "aurora-412",
    room: "412",
    guest: "Sarath D.",
    summary: "Rooftop bar - closing time tonight",
    detail:
      "Guest asked for tonight's rooftop closing time. Out of Expe's knowledge - handed off to reception.",
    raisedAt: "10:46 PM",
    status: "resolved",
    channel: "expe-handoff",
    priority: "low",
  },
  {
    id: "AUR-4468",
    propertyId: "aurora-412",
    room: "207",
    guest: "Lena M.",
    summary: "Late checkout request - 1 PM",
    detail:
      "Guest in 207 asked Expe for a 1 PM checkout. No conflict on the room. Awaiting front-desk approval.",
    raisedAt: "8:51 PM",
    status: "new",
    channel: "expe-handoff",
    priority: "normal",
  },
  {
    id: "AUR-4465",
    propertyId: "aurora-412",
    room: "318",
    guest: "Daniel K.",
    summary: "Cheese & charcuterie board × 1",
    detail: "Auto-ordered via Expe. €22 added to folio.",
    raisedAt: "7:34 PM",
    status: "resolved",
    channel: "expe-auto",
    priority: "low",
  },
  {
    id: "AUR-4463",
    propertyId: "aurora-412",
    room: "501",
    guest: "Priya R.",
    summary: "AC not cooling - escalation",
    detail:
      "Guest reported AC not cooling in 501. Expe attempted self-help (thermostat reset) - no resolution. Maintenance paged.",
    raisedAt: "6:12 PM",
    status: "in-progress",
    channel: "expe-handoff",
    priority: "high",
  },
  {
    id: "AUR-4461",
    propertyId: "aurora-412",
    room: "112",
    guest: "Marco F.",
    summary: "Restaurant reservation - Pensão Amor, 8:30 PM, 2 ppl",
    detail: "Booked by Expe via partner integration. Confirmation sent to guest.",
    raisedAt: "5:40 PM",
    status: "resolved",
    channel: "expe-auto",
    priority: "low",
  },
  {
    id: "PIN-0188",
    propertyId: "pinecrest",
    room: "-",
    guest: "Sarath D.",
    summary: "Hot tub jets unresponsive",
    detail:
      "Guest reported jets not turning on. Expe shared breaker location and looped in host.",
    raisedAt: "9:24 PM",
    status: "in-progress",
    channel: "expe-handoff",
    priority: "normal",
  },
];
