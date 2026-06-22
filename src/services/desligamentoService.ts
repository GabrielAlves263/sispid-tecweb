import type { DesligamentoRequest } from "../types/desligamento";

export async function inserirDesligamento(data: DesligamentoRequest): Promise<void> {
  const res = await fetch("/api/desligamentos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro ao inserir desligamento" }));
    throw new Error(err.message);
  }
}
