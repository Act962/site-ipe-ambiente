import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt, SESSION_COOKIE } from "@/server/auth/jwt";

/**
 * Filtro otimista de rota (Next 16 renomeou Middleware → Proxy). Só lê o cookie
 * e redireciona; a verificação real acontece no `verifySession()` de cada
 * página/Server Action protegida.
 */

const LOGIN_PATH = "/admin/login";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const session = await decrypt(token);
  const isAuthed = session?.role === "admin";

  // Página de login: liberada; se já está logado, manda pro painel.
  if (pathname === LOGIN_PATH) {
    if (isAuthed) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Demais rotas /admin/*: exigem sessão.
  if (!isAuthed) {
    const url = request.nextUrl.clone();
    url.pathname = LOGIN_PATH;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
