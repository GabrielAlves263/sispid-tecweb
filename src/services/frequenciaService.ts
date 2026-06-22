import type { FrequenciaRequest } from "../types/frequencia";

export async function inserirFrequencia(data: FrequenciaRequest): Promise<void> {
  const res = await fetch("/api/frequencias", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro ao inserir frequência" }));
    throw new Error(err.message);
  }
}
