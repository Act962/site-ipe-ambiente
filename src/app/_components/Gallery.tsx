import { bgVar } from "@/content/get";
import type { SiteContent } from "@/content/defaults";
import "@/styles/gallery.css";

export default function Gallery({ data }: { data: SiteContent["gallery"] }) {
  return (
    <section className="gallery" id="galeria">
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

        <div className="mosaic">
          {data.tiles.map((tile) => (
            <div
              key={tile.key}
              className={`tile ${tile.key}`}
              data-label={tile.label}
              style={bgVar(tile.image)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
