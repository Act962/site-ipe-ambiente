import { bgVar } from "@/content/get";
import type { SiteContent } from "@/content/defaults";
import "@/styles/cta.css";

export default function CtaFinal({
  data,
  contact,
}: {
  data: SiteContent["ctaFinal"];
  contact: SiteContent["contact"];
}) {
  return (
    <section className="cta-final" id="contato">
      <div className="cta-bg" style={bgVar(data.bgImage)} />
      <div className="wrap">
        <span className="eyebrow">{data.eyebrow}</span>
        <h2>
          {data.titleLead}
          <i>{data.titleEmphasis}</i>
        </h2>
        <p>{data.paragraph}</p>
        <div className="hero-ctas">
          <a href={`mailto:${contact.email}`} className="btn btn-light">
            {data.primaryCta.label}
            <span className="arrow">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </span>
          </a>
          <a href={data.ghostCta.href} className="btn btn-ghost">
            {data.ghostCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
