import "server-only";

import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { decrypt, SESSION_COOKIE, type SessionPayload } from "./jwt";

/** Lê e decifra a sessão atual (ou null). Memoizado por render. */
export const getSession = cache(async (): Promise<SessionPayload | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return decrypt(token);
});

/**
 * Garante que há sessão de admin válida; senão redireciona ao login.
 * Use no topo de toda página/Server Action protegida (defesa em profundidade —
 * o `proxy.ts` é só um filtro otimista).
 */
export const verifySession = cache(async () => {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    redirect("/admin/login");
  }
  return { isAuth: true as const, email: session.email };
});
