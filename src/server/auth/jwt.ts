import { SignJWT, jwtVerify, type JWTPayload } from "jose";

/**
 * Criptografia da sessão (JWT, HS256) — SEM `next/headers` nem `server-only`,
 * para poder ser importada também pelo `proxy.ts`. As operações de cookie ficam
 * em `session.ts`.
 */

export const SESSION_COOKIE = "ipe_session";
export const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias

export type SessionPayload = JWTPayload & {
  sub: string;
  role: "admin";
  email: string;
};

function encodedKey(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "SESSION_SECRET não definido. Gere uma chave e adicione ao ambiente (.env.local).",
    );
  }
  return new TextEncoder().encode(secret);
}

export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey());
}

export async function decrypt(
  token: string | undefined,
): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey(), {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch {
    return null;
  }
}
