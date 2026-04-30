"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  Check,
  Wifi,
  MapPin,
  ScrollText,
  Coffee,
  Car,
  UtensilsCrossed,
  ShieldAlert,
  Plus,
  X,
  Save,
  Sparkles,
} from "lucide-react";
import { properties, getProperty } from "@/lib/properties";
import { ExpeOrb } from "@/components/expe-orb";
import { cn } from "@/lib/utils";

const sections = [
  { id: "wifi", label: "Wifi", icon: Wifi },
  { id: "amenities", label: "Where things are", icon: Coffee },
  { id: "parking", label: "Parking", icon: Car },
  { id: "rules", label: "House rules", icon: ScrollText },
  { id: "nearby", label: "Nearby", icon: MapPin },
  { id: "service", label: "Room service", icon: UtensilsCrossed },
  { id: "emergency", label: "Emergency", icon: ShieldAlert },
];

export default function HostPage() {
  const [propertyId, setPropertyId] = useState(properties[0].id);
  const [active, setActive] = useState("amenities");
  const property = useMemo(() => getProperty(propertyId), [propertyId]);
  const k = property.knowledge;

  // local state only - no persistence
  const [amenities, setAmenities] = useState(k.amenities);
  const [draftItem, setDraftItem] = useState("");
  const [draftLoc, setDraftLoc] = useState("");

  const completion = Math.min(
    100,
    Math.round(
      (([
        k.wifi.network && k.wifi.password,
        amenities.length >= 3,
        k.parking,
        k.houseRules.length,
        k.nearby.length,
        k.roomService.length || property.brand === "Vrbo",
        k.emergency,
      ].filter(Boolean).length /
        7) *
        100),
    ),
  );

  return (
    <div className="min-h-dvh w-full pt-16 pb-10 overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <header className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div className="min-w-0 max-w-2xl">
            <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.14em] font-mono text-ink-500 flex-wrap">
              <span>Partner Portal</span>
              <span className="text-ink-300">/</span>
              <span className="text-ink-900">{property.name}</span>
            </div>
            <h1 className="font-display text-[32px] sm:text-[40px] leading-[1.05] mt-2 text-ink-900">
              Configure your property's knowledge
            </h1>
            <p className="text-[13.5px] text-ink-500 mt-2 max-w-xl">
              Tell Expe what's in the room and on the property. Guests get instant
              answers - your reception gets the time back.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="h-9 px-3 rounded-lg bg-cream-50 ring-1 ring-ink-200 text-[13px] font-medium text-ink-900 outline-none focus:ring-ink-900"
            >
              {properties.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - {p.unit}
                </option>
              ))}
            </select>
            <button className="h-9 px-3 rounded-lg bg-ink-900 text-cream-50 text-[13px] font-medium inline-flex items-center gap-1.5 hover:bg-ink-800 transition">
              <Save className="w-3.5 h-3.5" />
              Save
            </button>
          </div>
        </header>

        {/* Completion banner */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 rounded-2xl bg-cream-50 ring-1 ring-ink-100 shadow-card overflow-hidden"
        >
          <div className="flex items-center gap-4 p-4">
            <ExpeOrb size={36} active />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div>
                  <div className="text-[13px] font-semibold text-ink-900">
                    Expe is ready for guests
                  </div>
                  <div className="text-[12px] text-ink-500">
                    {completion}% of your knowledge profile complete · last guest
                    asked 4 questions Expe handled solo
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-ink-700 bg-cream-100 px-2 py-1 rounded-full">
                  <Sparkles className="w-3 h-3 text-amber-deep" />
                  92% auto-deflect this week
                </span>
              </div>
              <div className="mt-2.5 h-1.5 rounded-full bg-cream-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completion}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-amber to-amber-deep"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-3">
            <nav className="sticky top-20 space-y-0.5">
              {sections.map((s) => {
                const Icon = s.icon;
                const isActive = active === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActive(s.id)}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition text-left",
                      isActive
                        ? "bg-ink-900 text-cream-50"
                        : "text-ink-600 hover:bg-cream-100 hover:text-ink-900",
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="flex-1">{s.label}</span>
                    {isActive && <Check className="w-3.5 h-3.5 opacity-70" />}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main panel */}
          <main className="col-span-12 lg:col-span-9 space-y-6">
            {active === "wifi" && (
              <Section title="Wifi" subtitle="The single most-asked question, every stay.">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Network">
                    <input
                      defaultValue={k.wifi.network}
                      className="input"
                    />
                  </Field>
                  <Field label="Password">
                    <input
                      defaultValue={k.wifi.password}
                      className="input font-mono"
                    />
                  </Field>
                </div>
              </Section>
            )}

            {active === "amenities" && (
              <Section
                title="Where things are"
                subtitle="Items + their location. Expe answers verbatim from this list."
              >
                <div className="space-y-2">
                  {amenities.map((a, i) => (
                    <motion.div
                      key={`${a.item}-${i}`}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="grid grid-cols-[1fr_2fr_auto] gap-2 items-center bg-cream-50 ring-1 ring-ink-100 rounded-lg px-2 py-1.5"
                    >
                      <input defaultValue={a.item} className="input-bare" />
                      <input defaultValue={a.location} className="input-bare" />
                      <button
                        onClick={() =>
                          setAmenities((prev) => prev.filter((_, idx) => idx !== i))
                        }
                        className="p-1.5 text-ink-400 hover:text-ink-900 transition"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  ))}
                  <div className="grid grid-cols-[1fr_2fr_auto] gap-2 items-center pt-1">
                    <input
                      placeholder="Item, e.g. Towels"
                      value={draftItem}
                      onChange={(e) => setDraftItem(e.target.value)}
                      className="input"
                    />
                    <input
                      placeholder="Location, e.g. Top right drawer"
                      value={draftLoc}
                      onChange={(e) => setDraftLoc(e.target.value)}
                      className="input"
                    />
                    <button
                      onClick={() => {
                        if (!draftItem.trim() || !draftLoc.trim()) return;
                        setAmenities((prev) => [
                          ...prev,
                          { item: draftItem, location: draftLoc },
                        ]);
                        setDraftItem("");
                        setDraftLoc("");
                      }}
                      className="h-9 px-3 rounded-lg bg-ink-900 text-cream-50 text-[12px] inline-flex items-center gap-1.5 hover:bg-ink-800 transition"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  </div>
                </div>
              </Section>
            )}

            {active === "parking" && (
              <Section title="Parking" subtitle="Where to park, what it costs, what to avoid.">
                <textarea defaultValue={k.parking} className="input min-h-[100px]" />
              </Section>
            )}

            {active === "rules" && (
              <Section title="House rules" subtitle="Expe enforces these gently in conversation.">
                <ul className="space-y-2">
                  {k.houseRules.map((r, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 bg-cream-50 ring-1 ring-ink-100 rounded-lg px-3 py-2 text-[13px] text-ink-700"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                      {r}
                    </li>
                  ))}
                </ul>
              </Section>
            )}

            {active === "nearby" && (
              <Section title="Nearby recommendations" subtitle="Expe prefers these over generic suggestions.">
                <div className="grid grid-cols-2 gap-3">
                  {k.nearby.map((n) => (
                    <div
                      key={n.name}
                      className="bg-cream-50 ring-1 ring-ink-100 rounded-xl p-3"
                    >
                      <div className="text-[13px] font-semibold text-ink-900">
                        {n.name}
                      </div>
                      <div className="text-[11px] text-ink-500 font-mono uppercase tracking-wider mt-0.5">
                        {n.tag}
                      </div>
                      <div className="text-[12px] text-ink-600 mt-1">
                        {n.distance}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {active === "service" && (
              <Section
                title="Room service"
                subtitle={
                  property.brand === "Vrbo"
                    ? "Not applicable for this rental - Expe will skip orders."
                    : "Items Expe can order automatically without paging the kitchen."
                }
              >
                {k.roomService.length === 0 ? (
                  <div className="text-[13px] text-ink-500 italic bg-cream-50 ring-1 ring-ink-100 rounded-lg px-3 py-4 text-center">
                    No room service configured.
                  </div>
                ) : (
                  <div className="divide-y divide-ink-100 ring-1 ring-ink-100 rounded-xl bg-cream-50">
                    {k.roomService.map((m) => (
                      <div
                        key={m.item}
                        className="flex items-center justify-between px-3.5 py-2.5"
                      >
                        <span className="text-[13px] text-ink-900">{m.item}</span>
                        <span className="text-[12px] font-mono text-ink-600">
                          {m.price}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </Section>
            )}

            {active === "emergency" && (
              <Section title="Emergency" subtitle="What Expe says when a guest is in distress.">
                <textarea defaultValue={k.emergency} className="input min-h-[80px]" />
              </Section>
            )}
          </main>
        </div>
      </div>

    </div>
  );
}

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-cream-50 ring-1 ring-ink-100 rounded-2xl shadow-card p-6"
    >
      <h2 className="font-display text-[22px] text-ink-900 leading-tight">
        {title}
      </h2>
      <p className="text-[12.5px] text-ink-500 mt-1 mb-4">{subtitle}</p>
      {children}
    </motion.section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[11px] uppercase tracking-[0.12em] font-mono text-ink-500 mb-1.5">
        {label}
      </div>
      {children}
    </label>
  );
}
