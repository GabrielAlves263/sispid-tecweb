import { useState } from "react";
import type { ChangeEvent } from "react";
import { consultarMonitorPorMatricula, atualizarMonitorVoluntario } from "../services/monitorService";
import MonitorForm from "../components/MonitorForm";

interface FormData {
  matriculaConsulta: string;
  periodoInicio: string;
  periodoFim: string;
  nrEdital: string;
  nome: string;
  matricula: string;
  curso: string;
  codigoCurso: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  rg: string;
  cpf: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  atividades: string;
  termoCompromisso: File | null;
  editalPublicado: File | null;
  resultadoSelecao: File | null;
  declaracaoAcumulo: File | null;
}

const emptyForm: FormData = {
  matriculaConsulta: "",
  periodoInicio: "",
  periodoFim: "",
  nrEdital: "",
  nome: "",
  matricula: "",
  curso: "",
  codigoCurso: "",
  email: "",
  telefone: "",
  dataNascimento: "",
  rg: "",
  cpf: "",
  rua: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  estado: "",
  cep: "",
  atividades: "",
  termoCompromisso: null,
  editalPublicado: null,
  resultadoSelecao: null,
  declaracaoAcumulo: null,
};

export default function AtualizarMonitorVoluntarioPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [monitorId, setMonitorId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm);

  const set =
    (key: string) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const setFile = (key: string) => (file: File | null) =>
    setForm((f) => ({ ...f, [key]: file }));

  const handleSearch = async () => {
    if (!form.matriculaConsulta.trim()) {
      setError("Digite uma matrícula para consultar");
      return;
    }

    setSuccess(null);
    setError(null);
    setIsSearching(true);

    try {
      const data = await consultarMonitorPorMatricula(form.matriculaConsulta);
      setMonitorId(data.id as string);
      setForm((f) => ({
        ...f,
        periodoInicio: (data.periodoInicio as string) ?? "",
        periodoFim: (data.periodoFim as string) ?? "",
        nrEdital: (data.nrEdital as string) ?? "",
        nome: (data.nome as string) ?? "",
        matricula: (data.matricula as string) ?? "",
        curso: (data.curso as string) ?? "",
        codigoCurso: (data.codigoCurso as string) ?? "",
        email: (data.email as string) ?? "",
        telefone: (data.telefone as string) ?? "",
        dataNascimento: (data.dataNascimento as string) ?? "",
        rg: (data.rg as string) ?? "",
        cpf: (data.cpf as string) ?? "",
        rua: (data.rua as string) ?? "",
        numero: (data.numero as string) ?? "",
        complemento: (data.complemento as string) ?? "",
        bairro: (data.bairro as string) ?? "",
        cidade: (data.cidade as string) ?? "",
        estado: (data.estado as string) ?? "",
        cep: (data.cep as string) ?? "",
        atividades: (data.atividades as string) ?? "",
      }));
      setSuccess("Monitor encontrado. Faça as alterações e salve.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao consultar monitor",
      );
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = async () => {
    if (!monitorId) {
      setError("Consulte um monitor antes de atualizar");
      return;
    }

    setSuccess(null);
    setError(null);
    setIsLoading(true);

    try {
      await atualizarMonitorVoluntario(monitorId, form);
      setSuccess("Monitor voluntário atualizado com sucesso!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao atualizar monitor",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MonitorForm
      title="Atualizar monitor voluntário"
      submitLabel="Salvar alterações"
      isLoading={isLoading}
      error={error}
      success={success}
      form={form}
      onFieldChange={set}
      onSubmit={handleSubmit}
      onSearch={handleSearch}
      isSearching={isSearching}
      fileUploads={[
        {
          label: "Termo de Compromisso",
          value: form.termoCompromisso,
          onChange: setFile("termoCompromisso"),
        },
        {
          label: "Edital Publicado na Unidade",
          value: form.editalPublicado,
          onChange: setFile("editalPublicado"),
        },
        {
          label: "Resultado da Seleção do Monitor",
          value: form.resultadoSelecao,
          onChange: setFile("resultadoSelecao"),
        },
        {
          label:
            "Declaração de Não Acúmulo ou Acúmulo de Atividades",
          value: form.declaracaoAcumulo,
          onChange: setFile("declaracaoAcumulo"),
        },
      ]}
    />
  );
}
