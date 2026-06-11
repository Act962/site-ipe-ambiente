import Image from "next/image";
import "@/styles/footer.css";

const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#atuacao", label: "Áreas de Atuação" },
  { href: "#diferenciais", label: "Diferenciais" },
  { href: "#esg", label: "ESG" },
  { href: "#galeria", label: "Experiências" },
];

const SERVICES = [
  "Serviços Educacionais",
  "Órgãos Públicos",
  "Empresariais · ESG",
  "Materiais Educativos",
  "Consultoria & Mentoria",
];

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#top" className="brand">
              <span className="mark">
                <Image src="/assets/logo.png" alt="" width={32} height={32} />
              </span>
              <span className="txt">
                <b>IPÊ</b>
                <small>Educação Ambiental</small>
              </span>
            </a>
            <p>
              Educação ambiental, ESG e projetos socioambientais nascidos na
              Amazônia, com atuação em todo o Brasil.
            </p>
            <div className="quote">&ldquo;Raízes locais, consciência global.&rdquo;</div>
          </div>

          <div>
            <h5>Navegação</h5>
            <ul>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5>Atuação</h5>
            <ul>
              {SERVICES.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          <div className="foot-contact">
            <h5>Contato</h5>
            <div className="row">
              <span>E-mail</span>
              <b>contato@ipeeducacaoambiental.com.br</b>
            </div>
            <div className="row">
              <span>Telefone</span>
              <b>+55 (00) 0000-0000</b>
            </div>
            <div className="row">
              <span>Localização</span>
              <b>Amazônia · Atuação nacional</b>
            </div>
            <div className="foot-socials">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2.2c3.2 0 3.6 0 4.8.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.5.4 1.1.4 2.2.1 1.2.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.5.2-1.1.4-2.2.4-1.2.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-1.2-.1-1.8-.3-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.5-.4-1.1-.4-2.2-.1-1.2-.1-1.6-.1-4.8s0-3.6.1-4.8c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.5-.2 1.1-.4 2.2-.4 1.2-.1 1.6-.1 4.8-.1zm0 5.4a4.4 4.4 0 100 8.8 4.4 4.4 0 000-8.8zm0 7.2a2.8 2.8 0 110-5.6 2.8 2.8 0 010 5.6zm5.6-7.4a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24">
                  <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zM8.3 18.3H5.7V9.7h2.6v8.6zM7 8.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm11.3 9.8h-2.6v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3H10v-8.6h2.5v1.2c.4-.7 1.2-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4v4.8z" />
                </svg>
              </a>
              <a href="#" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24">
                  <path d="M17.5 14.4c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.1-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-1.5-.7-2.5-1.3-3.5-3-.3-.5.3-.4.8-1.4.1-.2 0-.3 0-.5-.1-.1-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.4 1 2.8 1.2 3 .2.2 2 3.1 5 4.3 1.9.8 2.6.9 3.6.7.6-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.2-.3-.3-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 4.9L2 22l5.2-1.4c1.4.8 3 1.2 4.8 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.2-.5-4.5-1.3l-.3-.2-3.1.8.8-3-.2-.3c-.9-1.4-1.4-3-1.4-4.7C3.3 7.2 7.2 3.3 12 3.3s8.7 3.9 8.7 8.7-3.9 8.2-8.7 8.2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="foot-bottom">
          <span>© 2026 IPÊ EDUCAÇÃO AMBIENTAL · CNPJ 00.000.000/0001-00</span>
          <span>RAÍZES LOCAIS · CONSCIÊNCIA GLOBAL</span>
        </div>
      </div>
    </footer>
  );
}
