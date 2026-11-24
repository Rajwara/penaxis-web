import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/space-grotesk/index.css";
import "@fontsource-variable/wix-madefor-display/index.css";
import "./content-shell.css";

/**
 * Brand wrapper for the content pages (/policies, /blog, /faq): Big Shoulders
 * uppercase headings and Wix Madefor Display text in the /home-v2 look
 * (theme in home-v2-theme.css, loaded by each page after its own styles). Every style for these pages is scoped under `.fwb`, so nothing
 * leaks into the rest of the site. The page renders <Navbar /> and
 * <Footer /> around it.
 */
export default function ContentShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`fwb ${className}`.trim()}>{children}</div>;
}
