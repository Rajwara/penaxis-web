"use client";

import { useRef, useState } from "react";
import { submitForm } from "@/lib/submitForm";

// Sticky "Apply for this position" form on /careers/[slug], from the
// supplied single-job template. Sends through the site's /api/contact
// endpoint with the careers recipient (formType "careers"), the same way
// the general careers form does. Resume is required (PDF/DOC/DOCX, 3MB —
// the API's per-file limit).

const MAX_FILE_BYTES = 3 * 1024 * 1024;
const ACCEPT = ".pdf,.doc,.docx";
const empty = { firstName: "", lastName: "", email: "", phone: "", currentSalary: "", desiredSalary: "", company_website: "" };

export default function JobApplyForm({ roleTitle }: { roleTitle: string }) {
  const [form, setForm] = useState(empty);
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const pickFile = (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    if (file.size > MAX_FILE_BYTES) {
      setFileError(`"${file.name}" is over the 3MB limit.`);
      setResume(null);
      return;
    }
    setFileError("");
    setResume(file);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!resume) {
      setFileError("Please attach your resume.");
      return;
    }
    setStatus("sending");
    try {
      await submitForm(
        `Job application — ${roleTitle}`,
        {
          name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          role: roleTitle,
          currentSalary: form.currentSalary.trim(),
          desiredSalary: form.desiredSalary.trim(),
          company_website: form.company_website,
        },
        [resume],
        "careers"
      );
      setStatus("success");
      setForm(empty);
      setResume(null);
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="job-apply-done" role="status">
        <h2 className="job-apply-title">Application sent</h2>
        <p>Thanks for applying for {roleTitle}. Our team will review your resume and get back to you.</p>
        <button type="button" className="job-btn job-btn--ghost" onClick={() => setStatus("idle")}>
          Send another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      <h2 className="job-apply-title">Apply for this position</h2>
      <div className="job-field">
        <label htmlFor="ja-first">First Name <span className="req">*</span></label>
        <input id="ja-first" type="text" required maxLength={120} value={form.firstName} onChange={set("firstName")} autoComplete="given-name" />
      </div>
      <div className="job-field">
        <label htmlFor="ja-last">Last Name <span className="req">*</span></label>
        <input id="ja-last" type="text" required maxLength={120} value={form.lastName} onChange={set("lastName")} autoComplete="family-name" />
      </div>
      <div className="job-field">
        <label htmlFor="ja-email">Email Address <span className="req">*</span></label>
        <input id="ja-email" type="email" required maxLength={200} value={form.email} onChange={set("email")} autoComplete="email" />
      </div>
      <div className="job-field">
        <label htmlFor="ja-phone">Phone <span className="req">*</span></label>
        <input id="ja-phone" type="tel" required maxLength={40} value={form.phone} onChange={set("phone")} autoComplete="tel" />
      </div>
      <div className="job-field">
        <span className="job-label">Resume <span className="req">*</span></span>
        <label className={`job-upload${resume ? " has-file" : ""}`}>
          <span className="job-upload-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="M17 8l-5-5-5 5" /><path d="M12 3v12" /></svg>
          </span>
          <strong>{resume ? resume.name : "Upload your resume"}</strong>
          <small>{resume ? "Click to choose a different file" : "PDF or DOCX, up to 3MB"}</small>
          <input ref={fileRef} type="file" accept={ACCEPT} onChange={(e) => pickFile(e.target.files)} />
        </label>
        {fileError && <p className="job-error">{fileError}</p>}
      </div>
      <div className="job-field">
        <label htmlFor="ja-cur">Current Salary <span className="req">*</span></label>
        <input id="ja-cur" type="text" required maxLength={80} value={form.currentSalary} onChange={set("currentSalary")} placeholder="e.g. PKR 150,000 / month" />
      </div>
      <div className="job-field">
        <label htmlFor="ja-des">Desired Salary <span className="req">*</span></label>
        <input id="ja-des" type="text" required maxLength={80} value={form.desiredSalary} onChange={set("desiredSalary")} placeholder="e.g. PKR 200,000 / month" />
      </div>
      {/* Honeypot — hidden from people, filled by bots */}
      <input className="job-hp" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" value={form.company_website} onChange={set("company_website")} />
      <button type="submit" className="job-btn job-submit" disabled={status === "sending"}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4 20-7Z" /></svg>
        {status === "sending" ? "Sending…" : "Submit Application"}
      </button>
      {status === "error" && <p className="job-error" role="alert">{error}</p>}
    </form>
  );
}
