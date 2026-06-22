import { useState } from "react";
import type { ChangeEvent, CSSProperties } from "react";
import { consultarMonitorPorMatricula, atualizarMonitorRemunerado } from "../services/monitorService";
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
  nomeBanco: "",
  agencia: "",
  numeroConta: "",
  extratoBancario: null,
  termoCompromisso: null,
  declaracaoNegativaBolsa: null,
  editalPublicado: null,
  resultadoSelecao: null,
  declaracaoAcumulo: null,
};

function SectionTitle({ children }: { children: string }) {
  return (
    <div style={sectionStyles.title}>
      <span style={sectionStyles.titleText}>{children}</span>
      <div style={sectionStyles.titleLine} />
    </div>
  );
}

function BankField({
  label,
  span,
  children,
}: {
  label: string;
  span: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{ ...sectionStyles.field, gridColumn: `span ${span}` }}>
      <label style={sectionStyles.label}>{label}</label>
      {children}
    </div>
  );
}

export default function AtualizarMonitorRemuneradoPage() {
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
        nomeBanco: (data.nomeBanco as string) ?? "",
        agencia: (data.agencia as string) ?? "",
        numeroConta: (data.numeroConta as string) ?? "",
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
      await atualizarMonitorRemunerado(monitorId, form);
      setSuccess("Monitor remunerado atualizado com sucesso!");
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
      title="Atualizar monitor remunerado"
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
      <div style={sectionStyles.card}>
        <SectionTitle>Dados Bancários</SectionTitle>
        <div style={sectionStyles.grid}>
          <BankField label="Nome do Banco" span={2}>
            <input
              style={sectionStyles.input}
              type="text"
              placeholder="Nome do banco"
              value={form.nomeBanco}
              onChange={set("nomeBanco")}
            />
          </BankField>
          <BankField label="Agência" span={1}>
            <input
              style={sectionStyles.input}
              type="text"
              placeholder="0000-0"
              value={form.agencia}
              onChange={set("agencia")}
            />
          </BankField>
          <BankField label="Número da conta" span={1}>
            <input
              style={sectionStyles.input}
              type="text"
              placeholder="000000-0"
              value={form.numeroConta}
              onChange={set("numeroConta")}
            />
          </BankField>
        </div>
      </div>
    </MonitorForm>
  );
}

const sectionStyles: Record<string, CSSProperties> = {
  card: {
    background: "#fff",
    border: "0.5px solid #d0dbe8",
    borderRadius: 12,
    padding: "24px 28px",
  },
  title: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  titleText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1a3a5c",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  titleLine: {
    flex: 1,
    height: 1,
    background: "#d0dbe8",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px 20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: 500,
    color: "#6b7f94",
  },
  input: {
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
  },
};
