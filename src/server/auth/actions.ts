"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "./session";
import { verifyCredentials } from "./credentials";

export type LoginState = { error?: string };

/** Server Action de login, usada via `useActionState` no formulário. */
export async function login(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Preencha e-mail e senha." };
  }

  let ok = false;
  try {
    ok = await verifyCredentials(email, password);
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Erro ao validar credenciais.",
    };
  }

  if (!ok) {
    return { error: "E-mail ou senha incorretos." };
  }

  await createSession(email);
  // redirect() lança internamente — fica fora do try/catch acima.
  redirect("/admin");
}

/** Server Action de logout. */
export async function logout(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
