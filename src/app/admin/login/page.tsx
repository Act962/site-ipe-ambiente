"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/server/auth/actions";

const INITIAL: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, INITIAL);

  return (
    <main className="admin-auth">
      <form action={formAction} className="admin-card admin-login">
        <div className="admin-login-head">
          <span className="admin-eyebrow">Área restrita</span>
          <h1>Painel IPÊ</h1>
          <p className="admin-muted">Entre para editar o conteúdo do site.</p>
        </div>

        <label className="admin-field">
          <span>E-mail</span>
          <input
            name="email"
            type="email"
            autoComplete="username"
            required
            autoFocus
          />
        </label>

        <label className="admin-field">
          <span>Senha</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
        </label>

        {state.error ? <p className="admin-error">{state.error}</p> : null}

        <button type="submit" className="admin-btn" disabled={pending}>
          {pending ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  );
}
