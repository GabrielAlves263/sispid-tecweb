import { useState } from "react";
import type { ChangeEvent } from "react";
import { inserirMonitorVoluntario } from "../services/monitorService";
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

export default function InserirMonitorVoluntarioPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
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
  });

  const set =
    (key: string) =>
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const setFile = (key: string) => (file: File | null) =>
    setForm((f) => ({ ...f, [key]: file }));

  const handleSubmit = async () => {
    setSuccess(null);
    setError(null);
    setIsLoading(true);

    try {
      await inserirMonitorVoluntario(form);
      setSuccess("Monitor voluntário inserido com sucesso!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro ao inserir monitor",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MonitorForm
      title="Dados do monitor voluntário"
      submitLabel="Inserir monitor voluntário"
      isLoading={isLoading}
      error={error}
      success={success}
      form={form}
      onFieldChange={set}
      onSubmit={handleSubmit}
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
