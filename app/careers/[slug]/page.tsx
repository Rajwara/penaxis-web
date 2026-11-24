import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import JobApplyForm from "@/components/JobApplyForm";
// Same type system as /home-v2 (Big Shoulders + Wix Madefor Display).
import "@fontsource-variable/big-shoulders/opsz.css";
import "@fontsource-variable/wix-madefor-display/index.css";
import { careers } from "@/lib/data";

// Single job page, from the supplied single-job template: job details on the
// left (3/5), a sticky application form on the right (2/5). Content comes
// from `careers` in lib/data.ts. Sections only show what the data has:
// requirements that start with "Good to have:" / "... is a plus:" are listed
// under "Nice to have"; the role's note is shown as "Good to know".

export const dynamicParams = false;

export function generateStaticParams() {
  return careers.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const role = careers.find((c) => c.slug === params.slug);
  if (!role) return {};
  return {
    title: `${role.title} - Careers - Penaxis`,
    description: role.summary,
    alternates: { canonical: `/careers/${role.slug}` },
  };
}

const NICE = /^(good to have|[^:]{0,40}\bis a plus)\s*:\s*/i;

export default function JobPage({ params }: { params: { slug: string } }) {
  const role = careers.find((c) => c.slug === params.slug);
  if (!role) notFound();

  const required = role.requirements.filter((r) => !NICE.test(r));
  const nice = role.requirements.filter((r) => NICE.test(r)).map((r) => {
    const t = r.replace(NICE, "");
    return t.charAt(0).toUpperCase() + t.slice(1);
  });
  const [kind, hours] = role.type.split(" - ");

  return (
    <>
      <Navbar />
      <main className="job-page">
        <div className="job-container">
          <div className="job-grid">
            <div className="job-main">
              <a href="/careers#open-roles" className="job-back">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                Back to all jobs
              </a>

              <h1 className="job-title">{role.title}</h1>

              <div className="job-meta">
                <span className="item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  {role.location}
                </span>
                <span className="sep" />
                <span className="item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  {hours ? `${kind} · ${hours}` : kind}
                </span>
              </div>

              <div className="job-chips">
                <span className="job-chip">{role.department}</span>
                <span className="job-chip">{role.experience}</span>
                <span className="job-chip">{kind}</span>
              </div>

              <div className="job-content">
                <section>
                  <h2>About the role</h2>
                  <p>{role.summary}</p>
                </section>
                <section>
                  <h2>Requirements</h2>
                  <ul>
                    {required.map((r) => (
                      <li key={r}>{r}</li>
                    ))}
                  </ul>
                </section>
                {nice.length > 0 && (
                  <section>
                    <h2>Nice to have</h2>
                    <ul>
                      {nice.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </section>
                )}
                {role.note && (
                  <section>
                    <h2>Good to know</h2>
                    <p>{role.note}</p>
                  </section>
                )}
              </div>
            </div>

            <aside className="job-aside">
              <div className="job-sticky">
                <JobApplyForm roleTitle={role.title} />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
