"use client";

import { logout } from "@/server/auth/actions";
import { useTabs } from "./tabs";

/** "Sair" do painel — pergunta antes, se a seção aberta tem edição pendente. */
export default function LogoutButton() {
  const { guard } = useTabs();
  return (
    <button
      type="button"
      className="admin-link"
      onClick={() => guard(() => void logout())}
    >
      Sair
    </button>
  );
}
