import "@/styles/gallery.css";

const TILES = [
  { className: "t1", label: "Mirante Vale do Rio Azul" },
  { className: "t2", label: "Trilha educativa" },
  { className: "t3", label: "Flora amazônica" },
  { className: "t4", label: "Estudo de campo" },
  { className: "t5", label: "Visita guiada · ICMBio" },
  { className: "t6", label: "Oficina sensorial" },
  { className: "t7", label: "Exposição escolar" },
  { className: "t8", label: "Paisagens do cerrado" },
  { className: "t9", label: "Sítio arqueológico" },
];

export default function Gallery() {
  return (
    <section className="gallery" id="galeria">
      <div className="wrap">
        <div className="section-head">
          <div>
            <span className="eyebrow">Experiências em campo</span>
            <h2>
              Trilhas, oficinas e <i>encontros que ensinam.</i>
            </h2>
          </div>
          <p className="lead">
            Cada projeto começa com escuta e termina em vivência. Uma seleção do
            que acontece quando ciência, natureza e comunidade se encontram.
          </p>
        </div>

        <div className="mosaic">
          {TILES.map((tile) => (
            <div
              key={tile.className}
              className={`tile ${tile.className}`}
              data-label={tile.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
