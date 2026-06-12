import type { SiteContent } from "@/content/defaults";
import "@/styles/differentials.css";

export default function Differentials({
  data,
}: {
  data: SiteContent["differentials"];
}) {
  return (
    <section className="diff" id="diferenciais">
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

        <div className="stats">
          {data.items.map((stat, index) => (
            <div
              key={stat.title}
              className={`stat reveal${index > 0 ? ` d${index}` : ""}`}
            >
              <div className="num">
                {stat.num}
                <small>{stat.unit}</small>
              </div>
              <h5>{stat.title}</h5>
              <p>{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
