// Config for the three engagement enquiry flows (Project, Hourly, Team as a
// Service), from "Penaxis Engagement Forms - Visual Specification".
// One reusable form (components/engagement/EngagementForm.tsx) reads this.
// Budget bands, durations and the discovery-call wording are the spec's
// proposed defaults - confirm before launch.

export type EngagementModel = "project" | "hourly" | "dedicated-team";

export type Choice = { label: string; hint?: string };
export type RadioGroup = { kind: "radio"; name: string; label: string; options: string[]; cols?: 2 | 3; defaultValue?: string };
export type SelectField = { kind: "select"; name: string; label: string; placeholder: string; options: string[] };
export type TextArea = { kind: "textarea"; name: string; label: string; placeholder: string; full?: boolean };
export type TextInput = { kind: "text"; name: string; label: string; placeholder: string };
export type DateField = { kind: "date"; name: string; label: string };
export type FileField = { kind: "file"; name: string; label: string; hint: string };
export type Step2Field = RadioGroup | SelectField | TextArea | TextInput | DateField | FileField;

export type EngagementConfig = {
  model: EngagementModel;
  crumb: string; // "Project enquiry"
  title: string;
  intro: string;
  steps: [string, string, string];
  step1: { question: string; choices: Choice[]; rich?: boolean };
  step2: { fields: Step2Field[]; layout: "stack" | "grid" };
  submitLabel: string;
  discoveryCallOption?: boolean;
};

export const ENGAGEMENTS: Record<EngagementModel, EngagementConfig> = {
  project: {
    model: "project",
    crumb: "Project enquiry",
    title: "Let's build something together.",
    intro: "Tell us what you're looking to achieve. We'll help you define the right approach.",
    steps: ["Requirements", "Project scope", "Your details"],
    step1: {
      question: "What can we help you with?",
      choices: [
        "SaaS & MVP Development", "AI Agents & Copilots", "LLM & RAG Solutions", "AI Chatbots & Voice Agents",
        "AI & Workflow Automation", "Digital Transformation", "Website & E-Commerce", "CRM & ERP Solutions",
        "Custom Software", "Mobile Applications", "Social Media Marketing", "Performance Marketing",
        "SEO, AEO & GEO", "Sales & Lead Generation", "Other / Not sure yet",
      ].map((label) => ({ label })),
    },
    step2: {
      layout: "stack",
      fields: [
        { kind: "radio", name: "Estimated budget (USD)", label: "Estimated project budget (USD)", cols: 3, defaultValue: "Not sure yet",
          options: ["Under $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "$10,000 – $25,000", "$25,000 – $50,000", "$50,000+", "Not sure yet"] },
        { kind: "radio", name: "Start timing", label: "When would you like to get started?", cols: 2, defaultValue: "Flexible",
          options: ["Immediately", "Within 2–4 weeks", "Within 1–3 months", "Flexible"] },
        { kind: "textarea", name: "About the project", label: "Tell us about your project", placeholder: "Your requirements, objectives, existing challenges or ideas…", full: true },
        { kind: "file", name: "Project brief", label: "Attach project brief", hint: "Optional / PDF, DOCX or supporting files (max 3MB)" },
      ],
    },
    submitLabel: "Submit Project Enquiry",
    discoveryCallOption: true,
  },
  hourly: {
    model: "hourly",
    crumb: "Hourly engagement",
    title: "The right expertise. When you need it.",
    intro: "Access experienced specialists without the commitment of a full-time hire.",
    steps: ["Expertise", "Engagement", "Your details"],
    step1: {
      question: "What expertise are you looking for?",
      choices: [
        "AI / LLM Engineer", "Automation Specialist", "Full-Stack Developer", "Frontend Developer",
        "Backend Developer", "CRM / ERP Specialist", "UI/UX Designer", "Graphic & Motion Designer",
        "Social Media Specialist", "Media Buyer", "SEO Specialist", "Business Analyst",
        "Sales Specialist", "Technology Consultant", "Other",
      ].map((label) => ({ label })),
    },
    step2: {
      layout: "grid",
      fields: [
        { kind: "radio", name: "Hours per week", label: "Estimated hours required per week", defaultValue: "Not sure yet",
          options: ["Less than 10 hours", "10–20 hours", "20–30 hours", "30–40 hours", "On-demand / As required", "Not sure yet"] },
        { kind: "radio", name: "Experience level", label: "Preferred experience level", defaultValue: "Open to recommendation",
          options: ["Junior", "Mid-level", "Senior", "Lead / Consultant", "Open to recommendation"] },
        { kind: "select", name: "Engagement duration", label: "Expected engagement duration", placeholder: "Select duration",
          options: ["One-time requirement", "Less than a month", "1–3 months", "3–6 months", "6+ months", "Ongoing"] },
        { kind: "date", name: "Preferred start date", label: "Preferred start date" },
        { kind: "textarea", name: "Work description", label: "Describe the work you need support with", placeholder: "Tell us about your requirements…", full: true },
      ],
    },
    submitLabel: "Request a Specialist",
  },
  "dedicated-team": {
    model: "dedicated-team",
    crumb: "Team as a Service",
    title: "Your team. Without the overhead.",
    intro: "Build a dedicated team around your business objectives, backed by Penaxis's expertise and infrastructure.",
    steps: ["Team composition", "Engagement", "Your details"],
    step1: {
      question: "What kind of team are you looking to build?",
      rich: true,
      choices: [
        { label: "Software Engineering Team", hint: "Developers, QA and technical leads" },
        { label: "AI & Automation Team", hint: "AI engineers and automation specialists" },
        { label: "Digital Marketing Team", hint: "Content, social media, paid media and SEO" },
        { label: "Sales & Business Development Team", hint: "Prospecting, outreach and sales specialists" },
        { label: "Design & Creative Team", hint: "UI/UX, graphics, motion and video" },
        { label: "CRM & Business Systems Team", hint: "CRM, ERP and integration specialists" },
        { label: "Cross-Functional Team", hint: "A combination of multiple disciplines" },
        { label: "Help Me Build a Team", hint: "A team designed around your requirements" },
      ],
    },
    step2: {
      layout: "grid",
      fields: [
        { kind: "radio", name: "Dedicated resources", label: "How many dedicated resources do you need?", defaultValue: "Help me decide",
          options: ["1 dedicated specialist", "2–3 team members", "4–6 team members", "7–10 team members", "10+ team members", "Help me decide"] },
        { kind: "radio", name: "Working arrangement", label: "Preferred working arrangement", defaultValue: "Open to recommendation",
          options: ["Full-time dedicated", "Part-time dedicated", "Mixed team allocation", "Open to recommendation"] },
        { kind: "select", name: "Engagement duration", label: "Expected engagement duration", placeholder: "Select duration",
          options: ["1–3 months", "3–6 months", "6–12 months", "12+ months", "Long-term / Ongoing"] },
        { kind: "select", name: "Monthly budget (USD)", label: "Estimated monthly budget (USD)", placeholder: "Select budget",
          options: ["Under $2,500", "$2,500 – $5,000", "$5,000 – $10,000", "$10,000 – $20,000", "$20,000+", "Open to discussion"] },
        { kind: "text", name: "Time zone / working hours", label: "Preferred time zone or working hours", placeholder: "e.g. UAE, Australia, UK, US Eastern" },
        { kind: "textarea", name: "Ideal team", label: "Tell us about your ideal team", placeholder: "Required skills, responsibilities, objectives and expectations…" },
      ],
    },
    submitLabel: "Request a Team Proposal",
  },
};

export const isEngagementModel = (v: string): v is EngagementModel => v === "project" || v === "hourly" || v === "dedicated-team";

// Preselection: a service page can open a flow with ?service=<slug>; only
// the mapped option is ticked, and visitors can change it.
export const SERVICE_PRESELECT: Record<EngagementModel, Record<string, string>> = {
  project: {
    "ai-mvp": "SaaS & MVP Development",
    "digital-transformation": "Digital Transformation",
    "sales-growth": "Sales & Lead Generation",
    "web-crm-software": "Custom Software",
  },
  hourly: {
    "ai-mvp": "AI / LLM Engineer",
    "digital-transformation": "Business Analyst",
    "sales-growth": "Sales Specialist",
    "web-crm-software": "Full-Stack Developer",
  },
  "dedicated-team": {
    "ai-mvp": "AI & Automation Team",
    "digital-transformation": "Cross-Functional Team",
    "sales-growth": "Sales & Business Development Team",
    "web-crm-software": "Software Engineering Team",
  },
};

export const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia",
  "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada",
  "Cape Verde", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia",
  "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Estonia",
  "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana",
  "Greece", "Guatemala", "Guinea", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya",
  "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania",
  "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
  "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Somalia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria",
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Togo", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Yemen", "Zambia",
  "Zimbabwe",
];
