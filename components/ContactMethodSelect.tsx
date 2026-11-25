"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

// Custom dropdown for "Preferred way to contact" (the native <select> list
// can't be styled). Rounded trigger, a white panel with an icon per option,
// purple hover/active state and a tick on the chosen one. Keyboard: Enter /
// Space / arrows open it, arrows move, Enter selects, Escape closes.

const ICONS: Record<string, ReactNode> = {
  WhatsApp: (
    <>
      <path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z" />
      <path d="M9 9.5c.3 2 2.5 4.2 4.5 4.5l1-1.2 1.8.8-.3 1.4c-3.5.5-7.7-3.7-7.2-7.2l1.4-.3.8 1.8z" />
    </>
  ),
  Message: <path d="M4 5h16v11H8l-4 4z" />,
  Call: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z" />,
  Email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
};

function Icon({ name }: { name: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name] ?? <circle cx="12" cy="12" r="3" />}
    </svg>
  );
}

type Props = { options: string[]; value: string; onChange: (v: string) => void; placeholder?: string; name?: string; labelId?: string };

export default function ContactMethodSelect({ options, value, onChange, placeholder = "Select an option", name, labelId }: Props) {
  const [open, setOpen] = useState(false);
  const [up, setUp] = useState(false);
  const [active, setActive] = useState(Math.max(0, options.indexOf(value)));
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  // Open upward when there isn't room below inside the scrolling modal/page
  useEffect(() => {
    if (!open || !rootRef.current) return;
    const trigger = rootRef.current.getBoundingClientRect();
    let bottom = window.innerHeight;
    for (let el = rootRef.current.parentElement; el; el = el.parentElement) {
      const o = getComputedStyle(el).overflowY;
      if (o === "auto" || o === "scroll" || o === "hidden") {
        bottom = Math.min(bottom, el.getBoundingClientRect().bottom);
        break;
      }
    }
    const listH = options.length * 52 + 14;
    setUp(bottom - trigger.bottom < listH + 12 && trigger.top > listH + 12);
  }, [open, options.length]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const choose = (i: number) => {
    onChange(options[i]);
    setActive(i);
    setOpen(false);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        e.stopPropagation(); // don't also close the modal
        setOpen(false);
      }
      return;
    }
    if (!open && ["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + options.length) % options.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`cms${open ? " is-open" : ""}${up ? " is-up" : ""}`}>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        className="cms-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-labelledby={labelId}
        aria-activedescendant={open ? `${listId}-${active}` : undefined}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKey}
      >
        <span className={`cms-value${value ? "" : " is-placeholder"}`}>
          {value && <Icon name={value} />}
          {value || placeholder}
        </span>
        <svg className="cms-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <ul id={listId} role="listbox" className="cms-list" aria-labelledby={labelId} hidden={!open}>
        {options.map((o, i) => (
          <li
            key={o}
            id={`${listId}-${i}`}
            role="option"
            aria-selected={value === o}
            className={`cms-option${i === active ? " is-active" : ""}${value === o ? " is-selected" : ""}`}
            onMouseEnter={() => setActive(i)}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => choose(i)}
          >
            <span className="cms-icon">
              <Icon name={o} />
            </span>
            <span className="cms-label">{o}</span>
            {value === o && (
              <svg className="cms-tick" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
