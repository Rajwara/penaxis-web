// Logo lookup for the case-study tech stack table. Logos live in
// public/images/tech-logos/<name>-logo.webp. An item with no logo is shown
// as a text chip. "AWS/Azure"-style items show every logo they name.
const L = (n: string) => `/images/tech-logos/${n}-logo.webp`;

const RULES: [RegExp, string][] = [
  [/^react( native| 18)?$/i, "react"],
  [/^next\.js/i, "nextjs"],
  [/^typescript$/i, "typescript"],
  [/^javascript/i, "javascript"],
  [/^node\.js$/i, "nodejs"],
  [/^python$/i, "python"],
  [/^fastapi$/i, "fastapi"],
  [/^spring boot$/i, "spring-boot"],
  [/^kotlin$/i, "kotlin"],
  [/^jetpack compose$/i, "jetpack-compose"],
  [/postgresql$/i, "postgresql"],
  [/^redis$/i, "redis"],
  [/^prisma/i, "prisma"],
  [/^opensearch$/i, "opensearch"],
  [/^elasticsearch$/i, "elasticsearch"],
  [/^(aws|amazon)\b/i, "aws"],
  [/^azure$/i, "azure"],
  [/^docker$/i, "docker"],
  [/^nginx$/i, "nginx"],
  [/^openai\b/i, "openai"],
  [/^claude\b/i, "claude"],
  [/^gemini$/i, "gemini"],
  [/^langchain$/i, "langchain"],
  [/^stripe\b/i, "stripe"],
  [/^shopify$/i, "shopify"],
  [/^webflow\b/i, "webflow"],
  [/^figma$/i, "figma"],
  [/^html5?$/i, "html"],
  [/^css3?$/i, "css"],
  [/^tailwind css$/i, "tailwindcss"],
  [/^github actions$/i, "github"],
  [/^vercel$/i, "vercel"],
  [/^django$/i, "django"],
  [/^flutter$/i, "flutter"],
  [/^mongodb$/i, "mongodb"],
  [/^mysql$/i, "mysql"],
  [/^kubernetes$/i, "kubernetes"],
  [/^\.net$/i, "dotnet"],
];

const one = (name: string) => RULES.find(([re]) => re.test(name.trim()))?.[1];

export type TechItem = { name: string; logos: string[] };

export function techItem(name: string): TechItem {
  // "AWS/Azure", "OpenSearch/Elasticsearch", "LangChain/LlamaIndex": logos for the parts we have
  const parts = name.split("/").map((p) => one(p)).filter((x): x is string => !!x);
  if (name.includes("/") && parts.length) return { name: name.replace(/\s*\/\s*/g, " / "), logos: [...new Set(parts)].map(L) };
  const direct = one(name);
  return { name, logos: direct ? [L(direct)] : [] };
}
