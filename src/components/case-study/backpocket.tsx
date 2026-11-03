// Graphics for the Backpocket case study: the header, the
// morning brief flow, and the lesson cards. Real text and simple line icons,
// so they stay sharp and readable at any size.

import { DemoVideo } from "@/components/case-study/DemoVideo";
import { Icon, IconBadge, type IconName } from "@/components/case-study/icons";
import { SaveStory } from "@/components/case-study/SaveStory";

/** The header: how saving used to go, and a way down to the agent working. */
export function SaveGraveyard() {
  return (
    <div className="bg-surface-50 p-5 md:p-8">
      <SaveStory />
      {/* The problem in one line, and the way down to the fix */}
      <div className="mt-6 flex flex-col gap-5 border-t border-black/10 pt-6 md:flex-row md:items-center md:justify-between">
        <p className="text-base text-ink-80 md:text-lg">
          <span className="font-display font-bold text-purple-600">The problem · </span>
          I could save anything in seconds, but I couldn&apos;t find it when I needed it.
        </p>
        <a
          href="#see-it-in-whatsapp"
          className="group inline-flex shrink-0 items-center gap-3 self-start rounded-pill bg-purple-600 py-2 pl-2 pr-6 text-white shadow-[0_14px_30px_-12px_rgb(83_65_132/0.8)] transition-colors hover:bg-purple-800 md:self-auto"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold text-purple-600" aria-hidden>
            ✓
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-bold uppercase tracking-[0.1em] text-[#d9cff5]">After · Solved with Backpocket</span>
            <span className="font-display text-base font-bold md:text-lg">
              View the live solution in action{" "}
              <span className="inline-block transition-transform motion-safe:group-hover:translate-y-0.5">↓</span>
            </span>
          </span>
        </a>
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
      <div className="flex flex-col items-center bg-[linear-gradient(135deg,#f4f1fa,#fafafa)] px-4 py-6 md:py-10">
        <DemoVideo
          src="/images/case-studies/backpocket/demo.mp4"
          label="Screen recording of Backpocket in WhatsApp: asking for a list, marking one applied, and getting a saved reel back"
          portrait
        />
        <figcaption className="mt-3 text-sm text-ink-52">The agent, live in my WhatsApp</figcaption>
      </div>
    </figure>
  );
}
