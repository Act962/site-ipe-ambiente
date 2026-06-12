import "server-only";

import { cookies } from "next/headers";
import {
  encrypt,
  SESSION_COOKIE,
  SESSION_MAX_AGE_MS,
} from "./jwt";

/** Cria a sessão do editor e grava o cookie HttpOnly. */
export async function createSession(email: string): Promise<void> {
  const expiresAt = new Date(Date.now() + SESSION_MAX_AGE_MS);
  const token = await encrypt({ sub: "editor", role: "admin", email });
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    // Em dev (http://localhost) um cookie Secure não é enviado em todos os
    // navegadores; em produção (https) é obrigatório.
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

/** Encerra a sessão (logout). */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
