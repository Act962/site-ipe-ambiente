import type { SiteContent } from "@/content/defaults";
import "@/styles/esg.css";

export default function Esg({ data }: { data: SiteContent["esg"] }) {
  return (
    <section className="esg" id="esg">
      <div className="wrap">
        <div className="esg-grid">
          <div>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2>
              {data.titleLead}
              <i>{data.titleEmphasis}</i>
            </h2>
            <p className="lead">{data.lead}</p>
            <a href={data.cta.href} className="btn btn-outline">
              {data.cta.label}
              <span className="arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </a>
            <div className="ods-grid">
              {data.ods.map((ods) => (
                <span key={ods} className="ods-chip">
                  {ods}
                </span>
              ))}
            </div>
          </div>

          <div className="esg-pillars">
            {data.pillars.map((pillar) => (
              <div key={pillar.title} className="esg-pillar">
                <span className="letter">{pillar.letter}</span>
                <h4>{pillar.title}</h4>
                <p>{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
