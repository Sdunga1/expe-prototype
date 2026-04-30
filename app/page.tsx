"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Mic,
  Send,
  Phone,
  ChevronDown,
  PlayCircle,
  RotateCcw,
  Sparkles,
  Receipt,
} from "lucide-react";
import { properties, getProperty } from "@/lib/properties";
import { getConversation, type Message } from "@/lib/conversations";
import { ExpeOrb } from "@/components/expe-orb";
import { TypingDots } from "@/components/typing-dots";
import { cn } from "@/lib/utils";

type DisplayItem =
  | { kind: "msg"; msg: Message }
  | { kind: "typing"; from: "expe" | "reception"; id: string };

export default function GuestChatPage() {
  const [propertyId, setPropertyId] = useState(properties[0].id);
  const [showSwitcher, setShowSwitcher] = useState(false);
  const [items, setItems] = useState<DisplayItem[]>([]);
  const [playing, setPlaying] = useState(false);
  const [draft, setDraft] = useState("");
  const [voiceActive, setVoiceActive] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const property = useMemo(() => getProperty(propertyId), [propertyId]);
  const convo = useMemo(() => getConversation(propertyId), [propertyId]);

  // Reset on property change
  useEffect(() => {
    setItems([]);
    setPlaying(false);
  }, [propertyId]);

  // Auto-scroll to bottom on new items
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [items]);

  // Replay logic - staggered with typing indicators
  const playDemo = async () => {
    if (playing) return;
    setPlaying(true);
    setItems([]);
    for (let i = 0; i < convo.messages.length; i++) {
      const m = convo.messages[i];
      if (m.from !== "guest") {
        const tid = `t-${i}`;
        setItems((prev) => [
          ...prev,
          { kind: "typing", from: m.from as "expe" | "reception", id: tid },
        ]);
        await wait(m.from === "reception" ? 1100 : 700);
        setItems((prev) => prev.filter((it) => !(it.kind === "typing" && it.id === tid)));
      } else {
        await wait(450);
      }
      setItems((prev) => [...prev, { kind: "msg", msg: m }]);
      await wait(m.from === "guest" ? 600 : 850);
    }
    setPlaying(false);
  };

  const reset = () => {
    setItems([]);
    setPlaying(false);
  };

  return (
    <div className="min-h-dvh w-full flex items-center justify-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-[420px] h-[min(900px,calc(100dvh-3rem))] rounded-[36px] bg-cream-50 shadow-lift overflow-hidden flex flex-col relative ring-1 ring-ink-100">
        {/* Property header */}
        <div className="relative flex-shrink-0">
          <div
            className="h-44 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${property.hero})` }}
          >
            <div className="h-full w-full bg-gradient-to-b from-ink-900/10 via-ink-900/30 to-ink-900/85" />
          </div>
          <div className="absolute inset-x-0 bottom-0 px-5 pb-4 text-cream-50">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-mono opacity-80">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber animate-breathe" />
                {property.brand} · {property.location}
              </span>
            </div>
            <button
              onClick={() => setShowSwitcher((s) => !s)}
              className="mt-1 flex items-center gap-2 group"
            >
              <h1 className="font-display text-[26px] leading-tight">
                {property.name}
              </h1>
              <ChevronDown
                className={cn(
                  "w-4 h-4 mt-1 opacity-70 transition group-hover:opacity-100",
                  showSwitcher && "rotate-180",
                )}
              />
            </button>
            <p className="text-[12px] opacity-80">
              {property.unit} · checkout {property.checkOut}
            </p>
          </div>

          {/* Property switcher dropdown */}
          <AnimatePresence>
            {showSwitcher && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute left-4 right-4 top-[10.5rem] z-20 bg-cream-50 rounded-2xl shadow-lift ring-1 ring-ink-100 overflow-hidden"
              >
                {properties.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setPropertyId(p.id);
                      setShowSwitcher(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3.5 py-3 text-left hover:bg-cream-100 transition",
                      p.id === propertyId && "bg-cream-100",
                    )}
                  >
                    <div
                      className="w-9 h-9 rounded-lg bg-cover bg-center flex-shrink-0"
                      style={{ backgroundImage: `url(${p.hero})` }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium text-ink-900 truncate">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-ink-500 truncate">
                        {p.unit} · {p.brand}
                      </div>
                    </div>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Expe identity bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-ink-100 bg-cream-50">
          <div className="flex items-center gap-2.5 min-w-0">
            <ExpeOrb size={30} active={voiceActive || playing} />
            <div className="leading-tight min-w-0">
              <div className="text-[13px] font-semibold text-ink-900">Expe</div>
              <div className="text-[10.5px] text-ink-500 font-mono uppercase tracking-wider whitespace-nowrap">
                {voiceActive ? "Listening" : playing ? "Replaying" : "Online · concierge"}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            {items.length > 0 && (
              <button
                onClick={reset}
                className="p-1.5 rounded-full text-ink-500 hover:text-ink-900 hover:bg-cream-100 transition"
                aria-label="Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={playDemo}
              disabled={playing}
              className={cn(
                "inline-flex items-center gap-1.5 pl-2 pr-2.5 py-1.5 rounded-full text-[11.5px] font-medium transition whitespace-nowrap",
                playing
                  ? "bg-cream-100 text-ink-400"
                  : "bg-ink-900 text-cream-50 hover:bg-ink-800",
              )}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              {playing ? "Playing" : items.length ? "Replay" : "Play"}
            </button>
          </div>
        </div>

        {/* Chat area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto chat-scroll px-4 py-5 space-y-3 bg-cream-50"
        >
          {items.length === 0 && <EmptyState onPlay={playDemo} property={property} />}
          <AnimatePresence initial={false}>
            {items.map((it, idx) => {
              if (it.kind === "typing") {
                return (
                  <motion.div
                    key={`typing-${it.id}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={cn(
                      "flex items-end gap-2",
                      it.from === "reception" ? "justify-start" : "justify-start",
                    )}
                  >
                    {it.from === "expe" ? (
                      <ExpeOrb size={22} />
                    ) : (
                      <div className="w-[22px] h-[22px] rounded-full bg-ink-900 text-cream-50 text-[10px] font-mono inline-flex items-center justify-center">
                        IN
                      </div>
                    )}
                    <TypingDots />
                  </motion.div>
                );
              }
              return (
                <Bubble key={`m-${idx}-${it.msg.id}`} msg={it.msg} />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Composer */}
        <div className="flex-shrink-0 px-3 pt-2 pb-3 border-t border-ink-100 bg-cream-50">
          <div className="flex items-end gap-2">
            <button
              className="flex-shrink-0 w-9 h-9 rounded-full text-ink-500 hover:text-ink-900 hover:bg-cream-100 inline-flex items-center justify-center transition"
              aria-label="Call reception"
            >
              <Phone className="w-[18px] h-[18px]" />
            </button>
            <div className="flex-1 flex items-end bg-cream-100 rounded-3xl px-3.5 py-2 ring-1 ring-transparent focus-within:ring-ink-200 transition">
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask Expe anything…"
                className="flex-1 bg-transparent outline-none text-[14px] placeholder:text-ink-400 py-1"
              />
              <button
                onClick={() => setVoiceActive((v) => !v)}
                className={cn(
                  "ml-1 w-8 h-8 rounded-full inline-flex items-center justify-center transition",
                  voiceActive
                    ? "bg-amber text-ink-900 shadow-amber"
                    : "text-ink-500 hover:text-ink-900",
                )}
                aria-label="Voice"
              >
                <Mic className="w-[16px] h-[16px]" />
              </button>
            </div>
            <button
              disabled={!draft.trim()}
              className={cn(
                "flex-shrink-0 w-9 h-9 rounded-full inline-flex items-center justify-center transition",
                draft.trim()
                  ? "bg-ink-900 text-cream-50"
                  : "bg-cream-100 text-ink-300",
              )}
              aria-label="Send"
            >
              <Send className="w-[16px] h-[16px]" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-center gap-1.5 text-[9.5px] text-ink-400 font-mono uppercase tracking-[0.14em] whitespace-nowrap">
            <Sparkles className="w-2.5 h-2.5" />
            <span>Powered by Expedia</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Bubble({ msg }: { msg: Message }) {
  const isGuest = msg.from === "guest";
  const isReception = msg.from === "reception";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
      className={cn(
        "flex items-end gap-2 max-w-full",
        isGuest ? "justify-end" : "justify-start",
      )}
    >
      {!isGuest && (
        <div className="flex-shrink-0">
          {isReception ? (
            <div className="w-[22px] h-[22px] rounded-full bg-ink-900 text-cream-50 text-[10px] font-mono inline-flex items-center justify-center">
              IN
            </div>
          ) : (
            <ExpeOrb size={22} />
          )}
        </div>
      )}
      <div className={cn("flex flex-col", isGuest ? "items-end" : "items-start", "max-w-[78%]")}>
        {isReception && (
          <div className="text-[10px] font-mono uppercase tracking-wider text-ink-400 mb-1 px-1">
            Reception · Inês
          </div>
        )}
        <div
          className={cn(
            "px-3.5 py-2.5 rounded-2xl text-[14px] leading-snug",
            isGuest
              ? "bg-amber text-ink-900 rounded-br-md"
              : isReception
                ? "bg-ink-900 text-cream-50 rounded-bl-md"
                : "bg-cream-100 text-ink-900 rounded-bl-md",
          )}
        >
          {msg.text}
        </div>
        {msg.meta?.kind === "ticket" && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cream-50 ring-1 ring-ink-200 text-[11px] text-ink-600 font-mono"
          >
            <Receipt className="w-3 h-3" />
            <span>{msg.meta.ticketId}</span>
            <span className="text-ink-400">·</span>
            <span>{msg.meta.summary}</span>
          </motion.div>
        )}
        <div className="text-[10px] text-ink-400 mt-1 px-1 font-mono">
          {msg.timestamp}
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({
  onPlay,
  property,
}: {
  onPlay: () => void;
  property: ReturnType<typeof getProperty>;
}) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center px-6 py-10">
      <span className="inline-flex items-center gap-1.5 mb-5 px-2.5 py-1 rounded-full bg-cream-100 text-[10px] font-mono uppercase tracking-[0.16em] text-ink-500">
        <span className="w-1.5 h-1.5 rounded-full bg-amber" />
        Concept prototype · scripted demo
      </span>
      <ExpeOrb size={56} active />
      <h2 className="font-display text-[28px] mt-4 leading-tight text-ink-900">
        Hello, {property.guestName}.
      </h2>
      <p className="text-[14px] text-ink-500 mt-1 max-w-[260px]">
        I'm Expe - your in-stay concierge for {property.name}. Tap play to watch
        a real stay unfold.
      </p>
      <button
        onClick={onPlay}
        className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink-900 text-cream-50 text-[13px] font-medium hover:bg-ink-800 transition"
      >
        <PlayCircle className="w-4 h-4" />
        Play the demo
      </button>
      <div className="mt-6 grid grid-cols-3 gap-2 max-w-[300px]">
        {[
          "Where are the towels?",
          "Extra pillows please",
          "What time is checkout?",
        ].map((s) => (
          <div
            key={s}
            className="text-[10.5px] text-ink-500 bg-cream-100 rounded-xl px-2.5 py-2 leading-tight"
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
