import { bgVar } from "@/content/get";
import type { SiteContent } from "@/content/defaults";
import "@/styles/about.css";

export default function About({ data }: { data: SiteContent["about"] }) {
  return (
    <section className="about" id="sobre">
      <div className="wrap">
        <div className="about-grid">
          <div className="about-img-stack reveal">
            <div className="primary" style={bgVar(data.image)} />
            <div className="badge">
              <span className="num serif">{data.badgeNum}</span>
              <span className="lbl">{data.badgeLabel}</span>
            </div>
          </div>

          <div className="about-body">
            <span className="eyebrow reveal">{data.eyebrow}</span>
            <h2 className="reveal d1">
              {data.titleLead}
              <i>{data.titleEmphasis}</i>
            </h2>
            <p className="reveal d2">{data.paragraph1}</p>
            <p className="reveal d3">{data.paragraph2}</p>
            <div className="mv-grid reveal d4">
              <div>
                <h4>{data.missao.title}</h4>
                <p>{data.missao.text}</p>
              </div>
              <div>
                <h4>{data.visao.title}</h4>
                <p>{data.visao.text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
