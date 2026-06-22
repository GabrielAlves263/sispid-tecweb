import { useState } from "react";
import type { ChangeEvent } from "react";
import { inserirMonitorRemunerado } from "../services/monitorService";
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
  nomeBanco: string;
  agencia: string;
  numeroConta: string;
  extratoBancario: File | null;
  termoCompromisso: File | null;
  declaracaoNegativaBolsa: File | null;
  editalPublicado: File | null;
  resultadoSelecao: File | null;
  declaracaoAcumulo: File | null;
}

export default function InserirMonitorRemuneradoPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
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
    nomeBanco: "",
    agencia: "",
    numeroConta: "",
    extratoBancario: null,
    termoCompromisso: null,
    declaracaoNegativaBolsa: null,
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
      ["nomeBanco", "Nome do Banco"],
      ["agencia", "Agência"],
      ["numeroConta", "Número da conta"],
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
      [form.extratoBancario, "Extrato Bancário"],
      [form.termoCompromisso, "Termo de Compromisso"],
      [form.declaracaoNegativaBolsa, "Declaração Negativa de Bolsa"],
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

    if (!validate()) return;

    setIsLoading(true);

    try {
      await inserirMonitorRemunerado(form);
      setSuccess("Monitor remunerado inserido com sucesso!");
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
      title="Dados do monitor remunerado"
      submitLabel="Inserir monitor remunerado"
      isLoading={isLoading}
      error={error}
      success={success}
      form={form}
      onFieldChange={set}
      onSubmit={handleSubmit}
      fileUploads={[
        {
          label: "Extrato Bancário",
          value: form.extratoBancario,
          onChange: setFile("extratoBancario"),
        },
        {
          label: "Termo de Compromisso",
          value: form.termoCompromisso,
          onChange: setFile("termoCompromisso"),
        },
        {
          label: "Declaração Negativa de Bolsa",
          value: form.declaracaoNegativaBolsa,
          onChange: setFile("declaracaoNegativaBolsa"),
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
    >
      <div
        style={{
          background: "#fff",
          border: "0.5px solid #d0dbe8",
          borderRadius: 12,
          padding: "24px 28px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#1a3a5c",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Dados Bancários
          </span>
          <div style={{ flex: 1, height: 1, background: "#d0dbe8" }} />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              gridColumn: "span 2",
            }}
          >
            <label
              style={{ fontSize: 12, fontWeight: 500, color: "#6b7f94" }}
            >
              Nome do Banco
            </label>
            <input
              style={{
                height: 38,
                padding: "0 12px",
                border: "0.5px solid #d0dbe8",
                borderRadius: 8,
                fontSize: 13,
                color: "#1a3a5c",
                background: "#f8fafc",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
              type="text"
              placeholder="Nome do banco"
              value={form.nomeBanco}
              onChange={set("nomeBanco")}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              gridColumn: "span 1",
            }}
          >
            <label
              style={{ fontSize: 12, fontWeight: 500, color: "#6b7f94" }}
            >
              Agência
            </label>
            <input
              style={{
                height: 38,
                padding: "0 12px",
                border: "0.5px solid #d0dbe8",
                borderRadius: 8,
                fontSize: 13,
                color: "#1a3a5c",
                background: "#f8fafc",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
              type="text"
              placeholder="0000-0"
              value={form.agencia}
              onChange={set("agencia")}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              gridColumn: "span 1",
            }}
          >
            <label
              style={{ fontSize: 12, fontWeight: 500, color: "#6b7f94" }}
            >
              Número da conta
            </label>
            <input
              style={{
                height: 38,
                padding: "0 12px",
                border: "0.5px solid #d0dbe8",
                borderRadius: 8,
                fontSize: 13,
                color: "#1a3a5c",
                background: "#f8fafc",
                outline: "none",
                width: "100%",
                boxSizing: "border-box",
              }}
              type="text"
              placeholder="000000-0"
              value={form.numeroConta}
              onChange={set("numeroConta")}
            />
          </div>
        </div>
      </div>
    </MonitorForm>
    </>
  );
}
