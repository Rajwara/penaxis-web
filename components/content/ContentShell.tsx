import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/space-grotesk/index.css";
import "./content-shell.css";

/**
 * Brand wrapper for the content pages (/policies, /blog, /faq): Big Shoulders
 * uppercase headings, Space Grotesk text, black/white/#f6f6f6 and 12px
 * radius. Every style for these pages is scoped under `.fwb`, so nothing
 * leaks into the rest of the site. The page renders <Navbar /> and
 * <Footer /> around it.
 */
export default function ContentShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`fwb ${className}`.trim()}>{children}</div>;
}
