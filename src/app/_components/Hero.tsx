import { bgVar } from "@/content/get";
import type { SiteContent } from "@/content/defaults";
import "@/styles/hero.css";

export default function Hero({ data }: { data: SiteContent["hero"] }) {
  return (
    <header className="hero" id="top">
      <div className="hero-img" style={bgVar(data.bgImage)} />
      <div className="wrap">
        <div className="reveal in">
          <span className="hero-eyebrow">{data.eyebrow}</span>
        </div>
        <h1 className="reveal in d1">
          {data.titleLead}
          <i>{data.titleEmphasis}</i>
        </h1>
        <p className="lede reveal in d2">{data.lede}</p>
        <div className="hero-ctas reveal in d3">
          <a href={data.primaryCta.href} className="btn btn-light">
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
      <div className="hero-scroll">
        <svg className="scroll-arrow" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 4v15M6 13l6 6 6-6" />
        </svg>
      </div>
    </header>
  );
}
