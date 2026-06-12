import type { SiteContent } from "@/content/defaults";
import "@/styles/values.css";

export default function Values({ data }: { data: SiteContent["values"] }) {
  return (
    <section className="values">
      <div className="wrap values-head">
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
      </div>

      <div className="wrap values-body">
        <div className="values-grid">
          {data.items.map((value, index) => (
            <div
              key={value.num}
              className={`value reveal${index > 0 ? ` d${index}` : ""}`}
            >
              <span className="num">{value.num}</span>
              <h4>{value.title}</h4>
              <p>{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
