// Graphics for the Backpocket case study: the graveyard at the top, the
// morning brief flow, and the lesson cards. Real text and simple line icons,
// so they stay sharp and readable at any size.

import { DemoVideo } from "@/components/case-study/DemoVideo";

const ICONS = {
  film: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM7 4v16M17 4v16M2 12h20M2 8h5M2 16h5M17 8h5M17 16h5",
  image: "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM21 15l-5-5L5 21",
  chat: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",
  calendar: "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM16 2v4M8 2v4M3 10h18",
  mail: "M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM22 6l-10 7L2 6",
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  sun: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4",
  bell: "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",
  question: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3M12 17h.01",
  shorten: "M4 6h16M4 12h10M4 18h6",
  link: "M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7",
  doc: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8",
  list: "M9 6h12M9 12h12M9 18h12M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2",
  server: "M4 3h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM4 13h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2zM6 7h.01M6 17h.01",
  spark: "M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9zM19 16l.9 2.1L22 19l-2.1.9L19 22l-.9-2.1L16 19l2.1-.9z",
  database: "M12 8c5 0 9-1.3 9-3s-4-3-9-3-9 1.3-9 3 4 3 9 3zM3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3",
} as const;

export type IconName = keyof typeof ICONS;

function Icon({ name, className = "h-5 w-5" }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={ICONS[name]} />
    </svg>
  );
}

function IconBadge({ name }: { name: IconName }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tile bg-lavender text-purple-600">
      <Icon name={name} />
    </span>
  );
}

const GRAVEYARDS: { icon: IconName; place: string; label: string; items: string[] }[] = [
  {
    icon: "film",
    place: "Instagram Saved",
    label: "The reel graveyard",
    items: ["Reels I meant to come back to", "Recipes and how-tos", "Everything, in one endless grid"],
  },
  {
    icon: "image",
    place: "Camera roll",
    label: "The slide graveyard",
    items: ["Slides presented in class", "Notes I felt were important", "Buried under every other photo"],
  },
  {
    icon: "chat",
    place: "WhatsApp chat to myself",
    label: "The link graveyard",
    items: ["Internship posts I found while scrolling", "Quick points from a conversation", "Scrolled past within a day"],
  },
];

/** The header: the problem as a picture, beside the agent working in WhatsApp. */
export function SaveGraveyard() {
  return (
    <div className="grid gap-6 bg-surface-50 p-5 md:p-8 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
      <figure className="order-first flex flex-col items-center lg:order-last">
        <DemoVideo
          src="/images/case-studies/backpocket/demo.mp4"
          label="Screen recording of Backpocket in WhatsApp: asking for a list, marking one applied, and getting a saved reel back"
          portrait
        />
        <figcaption className="mt-3 text-sm text-ink-52">The agent, live in my WhatsApp</figcaption>
      </figure>
      <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-80">Where my saves went to die</p>
        <p className="text-sm italic text-ink-52">Before Backpocket</p>
      </div>

      <ul className="mt-6 grid gap-3 md:grid-cols-3 lg:grid-cols-1">
        {GRAVEYARDS.map((g) => (
          <li key={g.place} className="rounded-card border-l-4 border-purple-600 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <IconBadge name={g.icon} />
              <div>
                <p className="font-display text-lg font-bold leading-snug">{g.label}</p>
                <p className="text-sm text-ink-60">{g.place}</p>
              </div>
            </div>
            <ul className="mt-3 space-y-1 text-[15px] leading-snug text-ink-70">
              {g.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-ink-52" />
                  {item}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* What happens next */}
      <ol className="mt-5 grid gap-2 text-center sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
        <li className="rounded-tile bg-white px-4 py-3 shadow-sm">
          <p className="font-numeric text-xl font-bold">Seconds</p>
          <p className="text-sm text-ink-60">to save it</p>
        </li>
        <li className="hidden text-ink-52 sm:block" aria-hidden>→</li>
        <li className="rounded-tile bg-white px-4 py-3 shadow-sm">
          <p className="font-numeric text-xl font-bold">Weeks</p>
          <p className="text-sm text-ink-60">of never opening it</p>
        </li>
        <li className="hidden text-ink-52 sm:block" aria-hidden>→</li>
        <li className="rounded-tile bg-[#fbeee9] px-4 py-3 shadow-sm">
          <p className="font-numeric text-xl font-bold text-[#b4441a]">10 to 30 minutes</p>
          <p className="text-sm text-ink-60">to find it again, if I found it at all</p>
        </li>
      </ol>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-card bg-lavender px-5 py-4">
        <p className="text-base text-ink-80 md:text-lg">
          <span className="font-display font-bold text-purple-600">The problem · </span>
          I could save anything in seconds, but I couldn&apos;t find it when I needed it.
        </p>
        <a
          href="#see-it-in-whatsapp"
          className="shrink-0 rounded-pill bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-800"
        >
          See the screenshots ↓
        </a>
      </div>
      </div>
    </div>
  );
}

function FlowBox({ icon, title, body }: { icon: IconName; title: string; body: string }) {
  return (
    <div className="flex-1 rounded-card border border-black/10 bg-white p-4 shadow-sm">
      <IconBadge name={icon} />
      <p className="mt-3 font-display text-base font-bold leading-snug">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-ink-70">{body}</p>
    </div>
  );
}

const Arrow = () => (
  <span className="flex shrink-0 items-center justify-center text-xl text-purple-600" aria-hidden>
    <span className="hidden md:inline">→</span>
    <span className="md:hidden">↓</span>
  </span>
);

const BRIEF_PARTS: { icon: IconName; title: string; body: string }[] = [
  { icon: "calendar", title: "Before today's meetings", body: "Saves that help with who I'm meeting, with the one point worth reading." },
  { icon: "bell", title: "Still waiting on you", body: "Saved job posts I haven't applied to, deadlines first, numbered so I can reply." },
  { icon: "mail", title: "Applied, from your inbox", body: "A \"thanks for applying\" email marks the matching job as done." },
];

/** How the morning brief gets made: calendar and inbox in, one message out. */
export function BriefFlow() {
  return (
    <figure className="my-10 rounded-card border border-black/10 bg-surface-50 p-5 shadow-[0_18px_40px_-32px_rgb(83_65_132/0.45)] md:p-8">
      <figcaption className="flex items-baseline justify-between gap-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-80">How the brief gets made</p>
        <p className="text-sm text-ink-52">Every morning, 6 AM</p>
      </figcaption>

      <div className="mt-6 flex flex-col gap-2 md:flex-row md:items-stretch">
        <FlowBox icon="sun" title="Google Apps Script" body="Runs in my own Google account at 6 AM." />
        <Arrow />
        <FlowBox icon="calendar" title="Calendar and Gmail" body="Today's events, plus sender, subject and one line from confirmation emails." />
        <Arrow />
        <FlowBox icon="list" title="The agent matches" body="Finds saves that fit each meeting, and jobs each email confirms." />
        <Arrow />
        <FlowBox icon="chat" title="One WhatsApp message" body="Nothing useful today? No message at all." />
      </div>

      <p className="mt-6 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-60">What&apos;s in the brief</p>
      <ul className="mt-3 grid gap-3 md:grid-cols-3">
        {BRIEF_PARTS.map((part) => (
          <li key={part.title} className="flex gap-3 rounded-card border-l-4 border-purple-600 bg-white p-4 shadow-sm">
            <span className="mt-0.5 text-purple-600">
              <Icon name={part.icon} />
            </span>
            <div>
              <p className="font-display text-base font-bold leading-snug">{part.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-70">{part.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** What went wrong in real use, and what changed because of it. */
export function LessonCards({ items }: { items: { icon: IconName; title: string; broke: string; now: string }[] }) {
  return (
    <ul className="my-8 grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="rounded-card border border-black/10 bg-surface-50 p-5">
          <div className="flex items-center gap-3">
            <IconBadge name={item.icon} />
            <p className="font-display text-lg font-bold leading-snug">{item.title}</p>
          </div>
          <dl className="mt-4 space-y-3 text-[15px] leading-relaxed">
            <div className="rounded-tile bg-[#fbeee9] px-3 py-2">
              <dt className="text-[12px] font-semibold uppercase tracking-wide text-[#b4441a]">What broke</dt>
              <dd className="mt-0.5 text-ink-70">{item.broke}</dd>
            </div>
            <div className="rounded-tile bg-lavender px-3 py-2">
              <dt className="text-[12px] font-semibold uppercase tracking-wide text-purple-600">What changed</dt>
              <dd className="mt-0.5 text-ink-70">{item.now}</dd>
            </div>
          </dl>
        </li>
      ))}
    </ul>
  );
}

const AGENT_STEPS: { title: string; body: string; tool: string }[] = [
  { title: "Route", body: "Is this a save, a question, a list request or an update?", tool: "Claude" },
  { title: "Read", body: "Pulls the page text, or the image from WhatsApp's media API.", tool: "Cheerio, Media API" },
  { title: "Write a card", body: "Title, summary, key points, topics, and company, role and deadline for jobs.", tool: "Claude vision" },
  { title: "Embed", body: "Turns the card into a vector so it can be found by meaning.", tool: "OpenAI embeddings" },
];

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-pill bg-lavender px-2.5 py-0.5 text-xs font-semibold text-purple-600">{children}</span>;
}

/** The system: what comes in, what the agent does, where it's stored, what goes out. */
export function AgentArchitecture() {
  return (
    <figure className="my-10 rounded-card border border-black/10 bg-surface-50 p-5 shadow-[0_18px_40px_-32px_rgb(83_65_132/0.45)] md:p-8">
      <figcaption className="flex items-baseline justify-between gap-4">
        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-ink-80">How the agent is built</p>
        <p className="text-sm text-ink-52">System overview</p>
      </figcaption>

      {/* In */}
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        <FlowBox icon="chat" title="WhatsApp Cloud API" body="Every message reaches a signed webhook." />
        <FlowBox icon="sun" title="Google Apps Script" body="Posts calendar events and confirmation emails at 6 AM, signed the same way." />
      </div>
      <p className="my-2 text-center text-xl text-purple-600" aria-hidden>↓</p>

      {/* Server */}
      <div className="flex items-start gap-3 rounded-card border border-black/10 bg-white p-4 shadow-sm">
        <IconBadge name="server" />
        <div>
          <p className="font-display text-base font-bold leading-snug">Next.js on Vercel</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-70">
            Checks the signature and the allowed numbers, answers Meta right away, then does the work in the background.
          </p>
        </div>
      </div>
      <p className="my-2 text-center text-xl text-purple-600" aria-hidden>↓</p>

      {/* Agent */}
      <div className="rounded-card border border-purple-600/30 bg-[#f4f1fa] p-4 md:p-5">
        <p className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-purple-600">
          <Icon name="spark" className="h-4 w-4" /> The agent, on Claude
        </p>
        <ol className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {AGENT_STEPS.map((step, i) => (
            <li key={step.title} className="flex flex-col rounded-tile bg-white p-4 shadow-sm">
              <p className="font-numeric text-sm font-bold text-purple-600">0{i + 1}</p>
              <p className="mt-1 font-display text-base font-bold leading-snug">{step.title}</p>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-ink-70">{step.body}</p>
              <p className="mt-3">
                <Chip>{step.tool}</Chip>
              </p>
            </li>
          ))}
        </ol>
      </div>
      <p className="my-2 text-center text-xl text-purple-600" aria-hidden>↓</p>

      {/* Out */}
      <div className="grid gap-3 md:grid-cols-2">
        <FlowBox icon="database" title="Supabase" body="Postgres with pgvector for cards and meaning search, private Storage for screenshots." />
        <FlowBox icon="chat" title="Reply on WhatsApp" body="Vector search finds the 5 closest saves, Claude answers from them, and the reply quotes your original message." />
      </div>
    </figure>
  );
}

/** Each decision in one row: what I chose, what I passed on, and why. */
export function DecisionTable({ rows }: { rows: { chose: string; over: string; why: string }[] }) {
  return (
    <div className="my-8 overflow-hidden rounded-card border border-black/10">
      <div className="hidden grid-cols-[1fr_1fr_1.6fr] gap-4 bg-lavender px-5 py-3 text-[12px] font-semibold uppercase tracking-wide text-purple-600 md:grid">
        <span>What I chose</span>
        <span>Instead of</span>
        <span>Why, and what it cost</span>
      </div>
      <ul>
        {rows.map((row) => (
          <li key={row.chose} className="grid gap-1 border-t border-black/10 bg-surface-50 px-5 py-4 first:border-t-0 md:grid-cols-[1fr_1fr_1.6fr] md:gap-4 md:first:border-t">
            <p className="font-display text-base font-bold leading-snug">{row.chose}</p>
            <p className="text-[15px] leading-relaxed text-ink-60">
              <span className="md:hidden">Instead of: </span>
              {row.over}
            </p>
            <p className="text-[15px] leading-relaxed text-ink-70">{row.why}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** The real chat, played like a phone in the middle of the page. */
export function WhatsAppDemo() {
  return (
    <figure className="my-8 overflow-hidden rounded-panel border border-black/10">
      <div className="flex justify-center bg-[linear-gradient(135deg,#f4f1fa,#fafafa)] px-4 py-6 md:py-10">
        <DemoVideo
          src="/images/case-studies/backpocket/demo.mp4"
          label="Screen recording of Backpocket in WhatsApp: asking for a list, marking one applied, and getting a saved reel back"
          portrait
        />
      </div>
    </figure>
  );
}
