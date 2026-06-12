import { ReactNode } from "react";
import type { SiteContent } from "@/content/defaults";
import "@/styles/areas.css";

/** Ícones fixos por índice — casam com a ordem de `areas.items`. Não editáveis. */
const AREA_ICONS: ReactNode[] = [
  <svg key="a" viewBox="0 0 24 24">
    <path d="M3 7l9-4 9 4-9 4-9-4z" />
    <path d="M3 7v6l9 4 9-4V7" />
    <path d="M12 11v10" />
  </svg>,
  <svg key="b" viewBox="0 0 24 24">
    <path d="M3 21h18" />
    <path d="M5 21V8l7-5 7 5v13" />
    <path d="M9 21v-6h6v6" />
    <path d="M9 12h.01M15 12h.01" />
  </svg>,
  <svg key="c" viewBox="0 0 24 24">
    <path d="M2 20h20" />
    <path d="M5 20V9l7-4 7 4v11" />
    <path d="M9 13h6M9 17h6" />
  </svg>,
  <svg key="d" viewBox="0 0 24 24">
    <path d="M4 4h12a4 4 0 014 4v12H8a4 4 0 01-4-4V4z" />
    <path d="M4 4l16 16" />
    <path d="M9 10h6M9 14h4" />
  </svg>,
];

export default function Areas({ data }: { data: SiteContent["areas"] }) {
  return (
    <section className="areas" id="atuacao">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2>
              {data.titleLead}
              <i>{data.titleEmphasis}</i>
            </h2>
          </div>
          <p className="lead">{data.lead}</p>
        </div>

        <div className="area-grid">
          {data.items.map((area, index) => (
            <article
              key={area.tag}
              className={`area reveal${index > 0 ? ` d${index}` : ""}`}
            >
              <div className="area-head">
                <div className="area-icon">{AREA_ICONS[index]}</div>
                <span className="area-tag">{area.tag}</span>
              </div>
              <h3>{area.title}</h3>
              <p>{area.description}</p>
              <ul>
                {area.bullets.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
