import type { OrientadorRequest } from "../types/orientador";

export async function inserirOrientador(data: OrientadorRequest): Promise<void> {
  const res = await fetch("/api/orientadores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro ao inserir orientador" }));
    throw new Error(err.message);
  }
}
