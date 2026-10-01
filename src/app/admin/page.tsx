import { verifySession } from "@/server/auth/dal";
import { getContent } from "@/content/get";
import Editor from "./_components/Editor";
import Sidebar from "./_components/Sidebar";
import MobileNav from "./_components/MobileNav";
import LogoutButton from "./_components/LogoutButton";
import { TabsProvider } from "./_components/tabs";

// Sempre renderiza com o conteúdo fresco do KV (o editor precisa ver o atual).
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await verifySession();
  const content = await getContent();

  return (
    <div className="admin">
      {/* O provider envolve também o topo: o "Sair" consulta as edições pendentes. */}
      <TabsProvider>
        <header className="admin-bar">
          <strong className="admin-brand">Painel IPÊ</strong>
          <div className="admin-bar-right">
            <span className="admin-muted">{session.email}</span>
            <a href="/" className="admin-link" target="_blank" rel="noreferrer">
              Ver site
            </a>
            <LogoutButton />
          </div>
        </header>

        <MobileNav />

        <div className="admin-layout">
          <Sidebar />
          <main className="admin-main">
            <div className="admin-intro">
              <span className="admin-eyebrow">Conteúdo do site</span>
              <h1>Edite textos e imagens por seção</h1>
              <p className="admin-muted">
                Escolha a seção na lista e altere o que precisar: ao mexer em
                qualquer campo, aparece ao pé da tela a barra com o botão{" "}
                <strong>Salvar seção</strong>; ao salvar, a mudança vai para o site
                na hora. Se tentar sair de uma seção sem salvar, o painel avisa
                antes. Campos em branco voltam ao texto padrão; use{" "}
                <strong>Restaurar padrão</strong>, no topo da seção, para
                desfazer as edições dela.
              </p>
            </div>

            <Editor data={content} />
          </main>
        </div>
      </TabsProvider>
    </div>
  );
}
