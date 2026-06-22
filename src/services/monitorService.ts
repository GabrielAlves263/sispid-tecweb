import type { MonitorVoluntarioRequest, MonitorRemuneradoRequest } from "../types/monitor";

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

export async function inserirMonitorRemunerado(data: MonitorRemuneradoRequest): Promise<void> {
  const res = await fetch("/api/monitores/remunerado", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro ao inserir monitor remunerado" }));
    throw new Error(err.message);
  }
}

export async function consultarMonitorPorMatricula(matricula: string): Promise<Record<string, unknown>> {
  const res = await fetch(`/api/monitores/${matricula}`);

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro ao consultar monitor" }));
    throw new Error(err.message);
  }

  return res.json();
}

export async function atualizarMonitorVoluntario(id: string, data: MonitorVoluntarioRequest): Promise<void> {
  const res = await fetch(`/api/monitores/voluntario/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro ao atualizar monitor voluntário" }));
    throw new Error(err.message);
  }
}

export async function atualizarMonitorRemunerado(id: string, data: MonitorRemuneradoRequest): Promise<void> {
  const res = await fetch(`/api/monitores/remunerado/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Erro ao atualizar monitor remunerado" }));
    throw new Error(err.message);
  }
}
