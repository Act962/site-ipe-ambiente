import { verifySession } from "@/server/auth/dal";
import { logout } from "@/server/auth/actions";
import { getContent } from "@/content/get";
import Editor from "./_components/Editor";
import Sidebar from "./_components/Sidebar";
import MobileNav from "./_components/MobileNav";
import { TabsProvider } from "./_components/tabs";

// Sempre renderiza com o conteúdo fresco do Blob (o editor precisa ver o atual).
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await verifySession();
  const content = await getContent();

  return (
    <div className="admin">
      <header className="admin-bar">
        <strong className="admin-brand">Painel IPÊ</strong>
        <div className="admin-bar-right">
          <span className="admin-muted">{session.email}</span>
          <a href="/" className="admin-link" target="_blank" rel="noreferrer">
            Ver site
          </a>
          <form action={logout}>
            <button type="submit" className="admin-link">
              Sair
            </button>
          </form>
        </div>
      </header>

      <TabsProvider>
        <MobileNav />

        <div className="admin-layout">
          <Sidebar />
          <main className="admin-main">
            <div className="admin-intro">
              <span className="admin-eyebrow">Conteúdo do site</span>
              <h1>Edite textos e imagens por seção</h1>
              <p className="admin-muted">
                Escolha a seção na lista, altere o que precisar e clique em{" "}
                <strong>Salvar seção</strong> — a mudança aparece no site na hora.
                Um ponto vermelho na lista marca a seção com edição ainda não
                salva. Campos em branco voltam ao texto padrão; use{" "}
                <strong>Restaurar padrão</strong> para desfazer as edições de uma
                seção.
              </p>
            </div>

            <Editor data={content} />
          </main>
        </div>
      </TabsProvider>
    </div>
  );
}
