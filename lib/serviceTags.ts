// Sub-service tags for each of the 4 services. Shown as pill links in the
// Services mega menu cards and the "Relevant services" tabs on industry pages.
export const SERVICE_TAGS: Record<string, string[]> = {
  "ai-mvp": ["SaaS & MVP Development", "LLM & RAG Solutions", "AI Agents & Copilots", "AI Chatbots & Voice Agents"],
  "digital-transformation": ["AI & Workflow Automation", "Business Process Consulting", "Data & Business Intelligence", "Systems & API Integration"],
  "sales-growth": ["Fractional Sales & Lead Generation", "Social Media Marketing", "Performance Marketing", "SEO, AEO & GEO"],
  "web-crm-software": ["Web & E-Commerce Development", "CRM & ERP Solutions", "Custom Software Development", "Mobile App Development"],
};

// One-line description per service for the mega menu cards.
export const SERVICE_MENU_TEXT: Record<string, string> = {
  "ai-mvp": "Building intelligent products and bringing new ideas to market.",
  "digital-transformation": "Modernising business operations through technology and automation.",
  "sales-growth": "Helping businesses acquire customers, build pipelines and scale revenue.",
  "web-crm-software": "Engineering scalable digital platforms and business software.",
};
