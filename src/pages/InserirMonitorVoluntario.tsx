import { useState, useRef } from "react";
import type { ChangeEvent } from "react";
import { inserirMonitorVoluntario } from "../services/monitorService";
import MonitorForm from "../components/MonitorForm";
import {
  required,
  requiredFile,
  isEmail,
  isCpf,
  isCep,
} from "../utils/validators";

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
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const topRef = useRef<HTMLDivElement>(null);
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

  const validate = (): boolean => {
    const errors: string[] = [];

    const textFields: [string, string][] = [
      ["nome", "Nome"],
      ["matricula", "Matrícula"],
      ["rg", "RG"],
      ["dataNascimento", "Data de nascimento"],
      ["curso", "Curso"],
      ["codigoCurso", "Código do curso"],
      ["telefone", "Telefone"],
      ["periodoInicio", "Período — início"],
      ["periodoFim", "Período — fim"],
      ["nrEdital", "Nº do edital"],
      ["rua", "Rua / Avenida"],
      ["numero", "Número"],
      ["bairro", "Bairro"],
      ["cidade", "Cidade"],
      ["estado", "Estado"],
      ["cep", "CEP"],
      ["atividades", "Atividades"],
    ];

    for (const [key, label] of textFields) {
      const err = required(form[key as keyof typeof form] as string, label);
      if (err) errors.push(err);
    }

    const emailErr = isEmail(form.email);
    if (emailErr) errors.push(emailErr);

    const cpfErr = isCpf(form.cpf);
    if (cpfErr) errors.push(cpfErr);

    const cepErr = isCep(form.cep);
    if (cepErr) errors.push(cepErr);

    const fileRules: [File | null, string][] = [
      [form.termoCompromisso, "Termo de Compromisso"],
      [form.editalPublicado, "Edital Publicado na Unidade"],
      [form.resultadoSelecao, "Resultado da Seleção do Monitor"],
      [form.declaracaoAcumulo, "Declaração de Não Acúmulo ou Acúmulo de Atividades"],
    ];

    for (const [file, label] of fileRules) {
      const err = requiredFile(file, label);
      if (err) errors.push(err);
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async () => {
    setSuccess(null);
    setError(null);
    setValidationErrors([]);

    if (!validate()) {
      setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
      return;
    }

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
    <>
      <div ref={topRef} />
      {validationErrors.length > 0 && (
        <div style={{
          background: "#fef2f2",
          border: "0.5px solid #f87171",
          borderRadius: 8,
          padding: "12px 16px",
          fontSize: 13,
          color: "#991b1b",
          maxWidth: 860,
          margin: "20px auto 0px",
        }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>
            {validationErrors.length} erro(s) encontrado(s):
          </div>
          {validationErrors.slice(0, 5).map((e, i) => (
            <div key={i} style={{ marginLeft: 12 }}>&bull; {e}</div>
          ))}
          {validationErrors.length > 5 && (
            <div style={{ marginLeft: 12, marginTop: 4 }}>
              e mais {validationErrors.length - 5} erro(s).
            </div>
          )}
        </div>
      )}
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
    </>
  );
}
