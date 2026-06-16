import type { LoginRequest, LoginResponse } from "../types/user"

export async function login(data: LoginRequest): Promise<LoginResponse> {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro de conexão" }))
    throw new Error(err.message)
  }

  return res.json()
}
