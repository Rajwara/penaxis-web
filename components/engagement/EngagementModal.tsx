"use client";

import { useEffect, useRef } from "react";
import EngagementForm from "./EngagementForm";
import type { EngagementModel } from "@/lib/engagementForms";

// Large modal on desktop, full screen on phones (CSS). Uses the native
// <dialog> for focus trapping and Escape-to-close. The opener puts the
// form's own URL (/get-started/<model>) in the address bar while it is
// open, so Back closes it and the link can be shared.
export default function EngagementModal({ model, onClose }: { model: EngagementModel | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (model && !d.open) {
      d.showModal();
      document.documentElement.classList.add("ef-lock");
    } else if (!model && d.open) {
      d.close();
    }
    if (!model) document.documentElement.classList.remove("ef-lock");
  }, [model]);

  useEffect(() => () => document.documentElement.classList.remove("ef-lock"), []);

  return (
    <dialog
      ref={ref}
      className="ef-dialog"
      aria-label="Engagement enquiry"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      {model && <EngagementForm key={model} model={model} variant="modal" onClose={onClose} />}
    </dialog>
  );
}
