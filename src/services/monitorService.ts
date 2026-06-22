import type { MonitorVoluntarioRequest } from "../types/monitor";

export async function inserirMonitorVoluntario(data: MonitorVoluntarioRequest): Promise<void> {
  const res = await fetch("/api/monitores/voluntario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro ao inserir monitor voluntário" }));
    throw new Error(err.message);
  }
}
