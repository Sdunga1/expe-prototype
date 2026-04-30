"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Filter,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { tickets, type Ticket } from "@/lib/tickets";
import { ExpeOrb } from "@/components/expe-orb";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "all", label: "All", count: tickets.length },
  { id: "new", label: "New", count: tickets.filter((t) => t.status === "new").length },
  {
    id: "in-progress",
    label: "In progress",
    count: tickets.filter((t) => t.status === "in-progress").length,
  },
  {
    id: "resolved",
    label: "Resolved",
    count: tickets.filter((t) => t.status === "resolved").length,
  },
] as const;

export default function ReceptionPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("all");
  const [selectedId, setSelectedId] = useState(tickets[0].id);

  const filtered = useMemo(
    () => (tab === "all" ? tickets : tickets.filter((t) => t.status === tab)),
    [tab],
  );
  const selected = useMemo(
    () => tickets.find((t) => t.id === selectedId) ?? tickets[0],
    [selectedId],
  );

  const autoCount = tickets.filter((t) => t.channel === "expe-auto").length;
  const handoffCount = tickets.filter((t) => t.channel === "expe-handoff").length;

  return (
    <div className="min-h-dvh w-full pt-16 pb-10 overflow-x-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <header className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] font-mono text-ink-500">
              <span>Aurora Boutique Hotel</span>
              <span className="text-ink-300">·</span>
              <span>Reception</span>
            </div>
            <h1 className="font-display text-[36px] leading-none mt-2 text-ink-900">
              Tickets from Expe
            </h1>
            <p className="text-[13px] text-ink-500 mt-2 max-w-xl">
              Everything Expe couldn't handle alone - and a record of what it
              handled for you.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Stat label="Auto-resolved" value={autoCount} accent />
            <Stat label="Needs you" value={handoffCount} />
          </div>
        </header>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <div className="flex items-center gap-1 bg-cream-50 ring-1 ring-ink-100 rounded-full p-1 overflow-x-auto max-w-full">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-[12px] font-medium inline-flex items-center gap-1.5 transition whitespace-nowrap flex-shrink-0",
                  tab === t.id
                    ? "bg-ink-900 text-cream-50"
                    : "text-ink-600 hover:text-ink-900",
                )}
              >
                {t.label}
                <span
                  className={cn(
                    "text-[10px] font-mono px-1.5 py-0.5 rounded-full",
                    tab === t.id
                      ? "bg-cream-50/20 text-cream-50"
                      : "bg-cream-100 text-ink-500",
                  )}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center gap-2 h-9 px-3 rounded-lg bg-cream-50 ring-1 ring-ink-100 text-[12.5px] text-ink-500 flex-1 sm:w-72 sm:flex-none min-w-0">
              <Search className="w-3.5 h-3.5 flex-shrink-0" />
              <input
                placeholder="Search tickets…"
                className="flex-1 min-w-0 bg-transparent outline-none placeholder:text-ink-400"
              />
            </div>
            <button className="h-9 px-3 rounded-lg bg-cream-50 ring-1 ring-ink-100 text-[12.5px] text-ink-700 inline-flex items-center gap-1.5 hover:bg-cream-100 transition flex-shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        {/* Two-pane */}
        <div className="grid grid-cols-12 gap-6">
          {/* List */}
          <div className="col-span-12 lg:col-span-7">
            <div className="bg-cream-50 ring-1 ring-ink-100 rounded-2xl shadow-card overflow-hidden">
              <div className="hidden sm:flex items-center px-4 py-2.5 text-[10.5px] font-mono uppercase tracking-wider text-ink-400 border-b border-ink-100">
                <span className="w-3" />
                <span className="pl-2 flex-1">Ticket</span>
                <span className="w-20">Source</span>
                <span className="w-16 text-right">Time</span>
              </div>
              <div className="divide-y divide-ink-100">
                {filtered.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedId(t.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3.5 text-left transition group",
                      t.id === selectedId
                        ? "bg-cream-100"
                        : "hover:bg-cream-100/60",
                    )}
                  >
                    <StatusDot status={t.status} priority={t.priority} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 min-w-0 flex-wrap">
                        <span className="text-[12px] font-mono text-ink-500">
                          {t.id}
                        </span>
                        <span className="text-[11px] text-ink-400">·</span>
                        <span className="text-[12px] text-ink-700 truncate">
                          Room {t.room} · {t.guest}
                        </span>
                      </div>
                      <div className="text-[13.5px] text-ink-900 mt-0.5 truncate">
                        {t.summary}
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 sm:hidden">
                        <ChannelChip channel={t.channel} />
                        <span className="text-[10.5px] font-mono text-ink-500 whitespace-nowrap">
                          {t.raisedAt}
                        </span>
                      </div>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
                      <ChannelChip channel={t.channel} />
                      <span className="w-16 text-right text-[11px] font-mono text-ink-500 whitespace-nowrap">
                        {t.raisedAt}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Detail */}
          <div className="col-span-12 lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="bg-cream-50 ring-1 ring-ink-100 rounded-2xl shadow-card p-5 lg:sticky lg:top-20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-[11px] font-mono text-ink-500">
                      {selected.id}
                    </div>
                    <h2 className="font-display text-[24px] leading-tight text-ink-900 mt-1">
                      {selected.summary}
                    </h2>
                    <div className="text-[12px] text-ink-500 mt-1">
                      Room {selected.room} · {selected.guest} · {selected.raisedAt}
                    </div>
                  </div>
                  <ChannelChip channel={selected.channel} />
                </div>

                <p className="text-[13.5px] text-ink-700 mt-4 leading-relaxed">
                  {selected.detail}
                </p>

                <div className="mt-5 pt-4 border-t border-ink-100">
                  <div className="text-[10.5px] font-mono uppercase tracking-wider text-ink-400 mb-2">
                    Expe transcript snippet
                  </div>
                  <div className="space-y-2">
                    <ChatLine from="guest">
                      {selected.summary.toLowerCase().startsWith("hot tub")
                        ? "the hot tub jets aren't turning on"
                        : selected.summary.toLowerCase().startsWith("extra pillows")
                          ? "can I get two extra pillows"
                          : selected.summary.toLowerCase().startsWith("rooftop")
                            ? "what time does the rooftop bar close tonight"
                            : "(see full thread)"}
                    </ChatLine>
                    <ChatLine from="expe">
                      {selected.channel === "expe-auto"
                        ? "Done - handling this now."
                        : "Let me get reception on this - they'll reply right here in a moment."}
                    </ChatLine>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <button className="flex-1 h-9 rounded-lg bg-ink-900 text-cream-50 text-[12.5px] font-medium inline-flex items-center justify-center gap-1.5 hover:bg-ink-800 transition">
                    <MessageCircle className="w-3.5 h-3.5" />
                    Reply in chat
                  </button>
                  <button className="h-9 px-3 rounded-lg bg-cream-50 ring-1 ring-ink-200 text-ink-700 text-[12.5px] inline-flex items-center gap-1.5 hover:bg-cream-100 transition">
                    Mark resolved
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-5 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-ink-400">
                  <Sparkles className="w-3 h-3 text-amber-deep" />
                  <span>Expe estimated this would take ~1 min for staff</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "px-3 py-2 rounded-xl ring-1 min-w-[110px]",
        accent
          ? "bg-ink-900 text-cream-50 ring-ink-900"
          : "bg-cream-50 ring-ink-100",
      )}
    >
      <div
        className={cn(
          "text-[10px] font-mono uppercase tracking-wider",
          accent ? "text-cream-50/60" : "text-ink-400",
        )}
      >
        {label}
      </div>
      <div className="font-display text-[24px] leading-none mt-1">{value}</div>
    </div>
  );
}

function StatusDot({
  status,
  priority,
}: {
  status: Ticket["status"];
  priority: Ticket["priority"];
}) {
  if (priority === "high") {
    return (
      <span className="inline-flex items-center justify-center w-3 h-3" title="High priority">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-breathe" />
      </span>
    );
  }
  return (
    <span
      className={cn(
        "block w-2 h-2 rounded-full",
        status === "new" && "bg-amber",
        status === "in-progress" && "bg-ink-700",
        status === "resolved" && "bg-ink-200",
      )}
    />
  );
}

function ChannelChip({ channel }: { channel: Ticket["channel"] }) {
  const auto = channel === "expe-auto";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10.5px] font-mono uppercase tracking-wider whitespace-nowrap",
        auto
          ? "bg-amber-soft text-ink-800"
          : "bg-cream-100 text-ink-600",
      )}
    >
      {auto ? <Sparkles className="w-2.5 h-2.5" /> : <ArrowUpRight className="w-2.5 h-2.5" />}
      {auto ? "Auto" : "Handoff"}
    </span>
  );
}

function ChatLine({
  from,
  children,
}: {
  from: "guest" | "expe";
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex gap-2 items-start", from === "guest" ? "flex-row-reverse" : "")}>
      {from === "expe" ? (
        <ExpeOrb size={18} />
      ) : (
        <div className="w-[18px] h-[18px] rounded-full bg-amber inline-flex items-center justify-center text-[9px] font-mono text-ink-900">
          G
        </div>
      )}
      <div
        className={cn(
          "px-2.5 py-1.5 rounded-xl text-[12.5px] max-w-[80%]",
          from === "guest"
            ? "bg-amber/30 text-ink-900"
            : "bg-cream-100 text-ink-700",
        )}
      >
        {children}
      </div>
    </div>
  );
}
