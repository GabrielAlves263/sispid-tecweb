import type { DisciplinaRequest } from "../types/disciplina";

export async function inserirDisciplina(data: DisciplinaRequest): Promise<void> {
  const res = await fetch("/api/disciplinas", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro ao inserir disciplina" }));
    throw new Error(err.message);
  }
}
