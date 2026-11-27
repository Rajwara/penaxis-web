// "AI in this project" section on single case study pages (shown before the
// tech stack). Built from each project's write-up and tech stack.
// - kind "built": AI that is part of the delivered / designed product.
// - kind "next":  the project shipped without AI in the live product; we say
//   so plainly and list where AI could add value next (recommendations, not
//   claims of work done).
// DRAFT COPY - review before launch.

export type AiPoint = { title: string; text: string };
export type CaseStudyAI = { kind: "built" | "next"; intro: string; points: AiPoint[]; tools?: string[] };

export const CASE_STUDY_AI: Record<string, CaseStudyAI> = {
  "ai-receptionist-visitor-kiosk": {
    kind: "built",
    intro:
      "AI powers how the kiosk listens, understands and answers, while every answer still comes from the school's approved knowledge base.",
    points: [
      { title: "Speech recognition", text: "Visitors can simply speak to the kiosk; their speech is transcribed and understood in real time." },
      { title: "Semantic question matching", text: "Questions are matched by meaning, not keywords, against up to 100 school-approved FAQs." },
      { title: "Confidence-based answers", text: "The kiosk only answers when it is confident, and logs unanswered questions for staff to review." },
      { title: "Two-way translation", text: "Reception staff and visitors can talk across six languages with live translation." },
    ],
    tools: ["OpenAI Whisper", "Multilingual sentence embeddings", "pgvector", "Google/Azure Speech", "Android native TTS"],
  },
  "bidlogics-tender-intelligence": {
    kind: "built",
    intro:
      "AI sits at the heart of the platform: it finds the right tenders, explains why they fit and drafts the first version of each proposal, while people keep the final say.",
    points: [
      { title: "Explainable fit scores", text: "Every tender gets an AI fit score with the reasons behind it and a confidence indicator." },
      { title: "Document intelligence", text: "Deadlines, requirements, evaluation criteria and risks are extracted from tender documents automatically." },
      { title: "RAG proposal drafting", text: "First drafts are written using only the organisation's approved documents and past bids." },
      { title: "Bid / no-bid guidance", text: "Structured Bid, Do Not Bid and Manual Review recommendations help teams focus earlier." },
    ],
    tools: ["OpenAI", "Claude", "Gemini", "LangChain / LlamaIndex", "RAG", "pgvector / Pinecone", "OCR & PDF parsing"],
  },
  "hotel-booking-revenue-platform": {
    kind: "built",
    intro:
      "AI turns booking data into forward-looking decisions on occupancy, pricing and guest experience, with management approving every recommendation.",
    points: [
      { title: "Occupancy forecasting", text: "Predicts demand ahead so the team can plan rates, staffing and promotions." },
      { title: "Smart rate recommendations", text: "Suggests rates and promotions based on demand, which management reviews before publishing." },
      { title: "Review intelligence", text: "Analyses guest reviews to surface recurring feedback and issues." },
      { title: "Cancellation-risk alerts", text: "Flags bookings likely to cancel, and drafts personalised guest messages." },
    ],
    tools: ["OpenAI", "Claude", "Gemini", "Occupancy forecasting", "Review analysis"],
  },
  "the-plate-agent-marketplace": {
    kind: "built",
    intro:
      "AI helps classify private registrations and produce indicative valuations, inside clear rules and confidence limits, while the dealer keeps full control of quotes.",
    points: [
      { title: "Pattern recognition", text: "Recognises names, initials, dates and number patterns in each registration." },
      { title: "Plate classification", text: "Automatically classifies plates so inventory and search stay consistent." },
      { title: "Indicative valuations", text: "Gives valuation ranges using AI combined with a controlled pricing rules engine." },
      { title: "Guardrails", text: "Confidence thresholds, valuation boundaries and fallback rules keep every output safe and explainable." },
    ],
    tools: ["OpenAI GPT-4o mini", "Structured outputs", "Hybrid rules engine", "JSON schema validation"],
  },
  "ai-automotive-search-oktabytes": {
    kind: "built",
    intro:
      "AI lets buyers search for a car the way they would ask a salesperson, in plain language, and returns real vehicles from live inventory.",
    points: [
      { title: "Natural-language search", text: "Buyers describe what they need and the AI understands budget, lifestyle and priorities." },
      { title: "Safe query generation", text: "Requests are turned into controlled database queries against live marketplace inventory." },
      { title: "Personalised recommendations", text: "Results and comparisons adapt to preferences, location and previous searches." },
      { title: "Model & prompt testing", text: "Admins control prompts and models, and A/B test them to keep improving results." },
    ],
    tools: ["Claude 3.5 Sonnet", "Llama 3", "Amazon SageMaker", "AWS Lambda", "Python NLP"],
  },
  "recruitment-talent-platform": {
    kind: "built",
    intro:
      "AI turns scattered CVs into a searchable talent pool and helps recruiters find the right people faster, with a human reviewing every suggestion.",
    points: [
      { title: "Resume parsing", text: "CVs are parsed automatically into structured candidate profiles." },
      { title: "Explainable matching", text: "Candidates are matched to roles with clear reasons recruiters can check." },
      { title: "Vector search", text: "Recruiters can find candidates by meaning and skills, not just exact keywords." },
      { title: "AI summaries & drafts", text: "Candidate summaries and outreach messages are drafted for human review." },
    ],
    tools: ["AI matching", "Vector search", "OpenSearch"],
  },
  "luxury-furniture-ecommerce": {
    kind: "built",
    intro:
      "AI brings products into the customer's own space, so buyers can see a piece in their room before they spend.",
    points: [
      { title: "View in Your Room", text: "Customers upload a photo of their room and see the furniture placed realistically." },
      { title: "Computer vision", text: "Room images are analysed so products are placed at a believable scale and position." },
      { title: "Saved visualisations", text: "Visualisations are saved and linked straight to checkout." },
    ],
    tools: ["Computer vision", "AI image processing", "WebGL", "Three.js"],
  },
  "drivelo-logistics-platform": {
    kind: "next",
    intro:
      "The live platform runs on real-time tracking and automation rather than AI. Its delivery, driver and GPS data give a strong base for AI, and this is where we see it adding value next:",
    points: [
      { title: "Smarter dispatch", text: "Suggest the best driver for each job based on location, load and history." },
      { title: "Delivery-time predictions", text: "More accurate ETAs from past journeys and live traffic." },
      { title: "Operations assistant", text: "Let dispatchers ask questions about jobs and fleet status in plain language." },
    ],
  },
  "seka-gravel-cycling-platform": {
    kind: "next",
    intro:
      "This community hub was built on Webflow CMS and memberships without AI in the live product. Its structured rider, race and gear data is ready for AI, and this is where we see it adding value next:",
    points: [
      { title: "Personalised content", text: "Recommend races, routes and gear to each member." },
      { title: "Smart search", text: "Help riders find past races and results by asking in plain language." },
      { title: "Member support assistant", text: "Answer common membership questions instantly." },
    ],
  },
  "dry-cleaning-delivery-platform": {
    kind: "next",
    intro:
      "The live platform focuses on real-time logistics and payments rather than AI. Its order and route data gives a strong base for AI, and this is where we see it adding value next:",
    points: [
      { title: "Route optimisation", text: "Plan pickup and return routes to save drivers time." },
      { title: "Demand forecasting", text: "Predict busy days so partners can plan capacity." },
      { title: "Customer assistant", text: "Handle order status and booking questions automatically." },
    ],
  },
  "cybersecurity-hr-platform": {
    kind: "next",
    intro:
      "This corporate website and HR system were delivered without AI in the live product. The structured HR data is ready for AI, and this is where we see it adding value next:",
    points: [
      { title: "HR assistant", text: "Let employees ask about leave, policies and payslips in plain language." },
      { title: "Workforce insights", text: "Spot attendance and performance trends earlier." },
      { title: "Document automation", text: "Draft standard HR letters and documents for review." },
    ],
  },
  "patient-care-management-platform": {
    kind: "next",
    intro:
      "The live platform focuses on secure records and scheduling rather than AI. Its structured clinical data gives a strong base for AI, and this is where we see it adding value next:",
    points: [
      { title: "Visit summaries", text: "Draft After Visit Summaries from consultation notes for practitioners to approve." },
      { title: "Smart scheduling", text: "Reduce no-shows with reminders and better slot suggestions." },
      { title: "Intake triage", text: "Highlight key points from pre-consultation assessments." },
    ],
  },
};
