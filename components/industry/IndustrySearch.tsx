"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { searchIndustries } from "@/lib/industrySearch";

// "Find your industry…" search for the /industries banner. Live suggestions
// from all 24 industries, their synonyms and business segments (e.g. hotel
// -> Hospitality & Tourism, SOC -> Cybersecurity), each linking straight to
// its page. Keyboard: Up/Down to move, Enter to open, Esc to close. No match
// -> offers the enquiry form (opens the site's "Let's chat" form).
export default function IndustrySearch({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const listId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const results = useMemo(() => searchIndustries(q, 6), [q]);
  const noMatch = q.trim().length > 1 && results.length === 0;
  const count = results.length + (noMatch ? 1 : 0);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const openEnquiry = () => {
    setOpen(false);
    window.dispatchEvent(new Event("penaxis:open-quote"));
  };
  const choose = (i: number) => {
    if (noMatch) return openEnquiry();
    const r = results[i];
    if (r) {
      setOpen(false);
      router.push(r.href);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      if (count) setActive((a) => (a + 1) % count);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (count) setActive((a) => (a - 1 + count) % count);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return router.push("/industries#all-industries");
    choose(active);
  };

  const showList = open && q.trim().length > 0;

  return (
    <div ref={wrapRef} className="nx-search">
      <form className="nx-prompt" onSubmit={onSubmit} role="search">
        <svg className="nx-search-ico" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-4-4" />
        </svg>
        <input
          type="text"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          placeholder={placeholder}
          aria-label={placeholder}
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={showList && count ? `${listId}-${active}` : undefined}
          autoComplete="off"
        />
        <button type="submit">➚ Search</button>
      </form>

      {showList && (
        <ul id={listId} className="nx-suggest" role="listbox" aria-label="Industry suggestions">
          {results.map((r, i) => (
            <li
              key={r.label}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              className={i === active ? "is-active" : ""}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                choose(i);
              }}
            >
              <span className="nx-suggest-label">{r.label}</span>
              <span className="nx-suggest-group">{r.group}</span>
              <span className="nx-suggest-arrow" aria-hidden="true">➚</span>
            </li>
          ))}
          {noMatch && (
            <li
              id={`${listId}-0`}
              role="option"
              aria-selected
              className="is-active nx-suggest-none"
              onMouseDown={(e) => {
                e.preventDefault();
                openEnquiry();
              }}
            >
              <span className="nx-suggest-label">No exact match for &ldquo;{q.trim()}&rdquo;</span>
              <span className="nx-suggest-group">Tell us about your industry: open the enquiry form</span>
              <span className="nx-suggest-arrow" aria-hidden="true">➚</span>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
