import { useState } from "react";
import type { CSSProperties, ChangeEvent } from "react";
import { inserirMonitorVoluntario } from "../services/monitorService";

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

const ESTADOS = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS",
  "MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC",
  "SP","SE","TO",
];

function SectionTitle({ children }: { children: string }) {
  return (
    <div style={styles.sectionTitle}>
      <span style={styles.sectionTitleText}>{children}</span>
      <div style={styles.sectionTitleLine} />
    </div>
  );
}

function Field({
  label,
  children,
  span = 1,
}: {
  label: string;
  children: React.ReactNode;
  span?: number;
}) {
  return (
    <div style={{ ...styles.field, gridColumn: `span ${span}` }}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

function FileUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value: File | null;
  onChange: (file: File | null) => void;
}) {
  return (
    <div style={styles.fileRow}>
      <label style={styles.fileLabel}>{label}</label>
      <div style={styles.fileInputWrapper}>
        <label style={styles.fileBtn}>
           Escolher arquivo
          <input
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            onChange={(e) => onChange(e.target.files?.[0] ?? null)}
          />
        </label>
        <span style={styles.fileName}>
          {value ? value.name : "Nenhum arquivo escolhido"}
        </span>
      </div>
    </div>
  );
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

  const set = (key: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const setFile = (key: keyof FormData) => (file: File | null) =>
    setForm((f) => ({ ...f, [key]: file }));

  const handleSubmit = async () => {
    setSuccess(null);
    setError(null);
    setIsLoading(true);

    try {
      await inserirMonitorVoluntario(form);
      setSuccess("Monitor voluntário inserido com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao inserir monitor");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      {/* Busca por matrícula */}
      <div style={styles.card}>
        <SectionTitle>Dados do monitor voluntário</SectionTitle>

        <div style={styles.searchRow}>
          <div style={styles.field}>
            <label style={styles.label}>Matrícula</label>
            <input
              style={styles.input}
              type="text"
              placeholder="Digite a matrícula"
              value={form.matriculaConsulta}
              onChange={set("matriculaConsulta")}
            />
          </div>
          <button style={styles.searchBtn}>Consultar</button>
        </div>
      </div>

      {/* Dados gerais */}
      <div style={styles.card}>
        <SectionTitle>Informações gerais</SectionTitle>
        <div style={styles.grid}>
          <Field label="Período — início" span={1}>
            <input style={styles.input} type="date" value={form.periodoInicio} onChange={set("periodoInicio")} />
          </Field>
          <Field label="Período — fim" span={1}>
            <input style={styles.input} type="date" value={form.periodoFim} onChange={set("periodoFim")} />
          </Field>
          <Field label="Nº do edital que selecionou o aluno na unidade" span={2}>
            <input style={styles.input} type="text" value={form.nrEdital} onChange={set("nrEdital")} />
          </Field>

          <Field label="Nome completo" span={2}>
            <input style={styles.input} type="text" value={form.nome} onChange={set("nome")} />
          </Field>
          <Field label="Matrícula" span={1}>
            <input style={styles.input} type="text" value={form.matricula} onChange={set("matricula")} />
          </Field>
          <Field label="Data de nascimento" span={1}>
            <input style={styles.input} type="date" value={form.dataNascimento} onChange={set("dataNascimento")} />
          </Field>

          <Field label="Curso" span={2}>
            <input style={styles.input} type="text" value={form.curso} onChange={set("curso")} />
          </Field>
          <Field label="Código do curso" span={1}>
            <input style={styles.input} type="text" value={form.codigoCurso} onChange={set("codigoCurso")} />
          </Field>
          <Field label="E-mail" span={1}>
            <input style={styles.input} type="email" value={form.email} onChange={set("email")} />
          </Field>

          <Field label="Telefone(s)" span={1}>
            <input style={styles.input} type="text" value={form.telefone} onChange={set("telefone")} />
          </Field>
          <Field label="RG" span={1}>
            <input style={styles.input} type="text" value={form.rg} onChange={set("rg")} />
          </Field>
          <Field label="CPF" span={1}>
            <input style={styles.input} type="text" value={form.cpf} onChange={set("cpf")} />
          </Field>
        </div>
      </div>

      {/* Endereço */}
      <div style={styles.card}>
        <SectionTitle>Endereço</SectionTitle>
        <div style={styles.grid}>
          <Field label="CEP" span={1}>
            <input style={styles.input} type="text" placeholder="00000-000" value={form.cep} onChange={set("cep")} />
          </Field>
          <Field label="Estado" span={1}>
            <select style={styles.input} value={form.estado} onChange={set("estado")}>
              <option value="">Selecione</option>
              {ESTADOS.map((uf) => (
                <option key={uf} value={uf}>{uf}</option>
              ))}
            </select>
          </Field>
          <Field label="Cidade" span={2}>
            <input style={styles.input} type="text" value={form.cidade} onChange={set("cidade")} />
          </Field>

          <Field label="Bairro" span={2}>
            <input style={styles.input} type="text" value={form.bairro} onChange={set("bairro")} />
          </Field>
          <Field label="Rua / Avenida" span={2}>
            <input style={styles.input} type="text" value={form.rua} onChange={set("rua")} />
          </Field>

          <Field label="Número" span={1}>
            <input style={styles.input} type="text" value={form.numero} onChange={set("numero")} />
          </Field>
          <Field label="Complemento" span={3}>
            <input style={styles.input} type="text" placeholder="Apto, bloco, etc." value={form.complemento} onChange={set("complemento")} />
          </Field>
        </div>
      </div>

      {/* Atividades */}
      <div style={styles.card}>
        <SectionTitle>Atividades</SectionTitle>
        <div style={styles.field}>
          <label style={styles.label}>
            Atividades propostas para o monitor com suas respectivas cargas horárias semanais
          </label>
          <textarea
            style={styles.textarea}
            rows={6}
            value={form.atividades}
            onChange={set("atividades")}
            placeholder="Descreva as atividades e as cargas horárias semanais correspondentes..."
          />
        </div>
      </div>

      {/* Anexos */}
      <div style={styles.card}>
        <SectionTitle>Anexos (somente PDF)</SectionTitle>
        <div style={styles.fileList}>
          <FileUpload
            label="Termo de Compromisso"
            value={form.termoCompromisso}
            onChange={setFile("termoCompromisso")}
          />
          <FileUpload
            label="Edital Publicado na Unidade"
            value={form.editalPublicado}
            onChange={setFile("editalPublicado")}
          />
          <FileUpload
            label="Resultado da Seleção do Monitor"
            value={form.resultadoSelecao}
            onChange={setFile("resultadoSelecao")}
          />
          <FileUpload
            label="Declaração de Não Acúmulo ou Acúmulo de Atividades"
            value={form.declaracaoAcumulo}
            onChange={setFile("declaracaoAcumulo")}
          />
        </div>
      </div>

      {/* Mensagens */}
      {error && <div style={styles.errorMsg}>{error}</div>}
      {success && <div style={styles.successMsg}>{success}</div>}

      {/* Botão enviar */}
      <div style={styles.submitRow}>
        <button style={styles.submitBtn} onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Enviando..." : "Inserir monitor voluntário"}
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    padding: "32px 24px 48px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
    maxWidth: 860,
    margin: "0 auto",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    background: "#fff",
    border: "0.5px solid #d0dbe8",
    borderRadius: 12,
    padding: "24px 28px",
  },
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
  },
  sectionTitleText: {
    fontSize: 13,
    fontWeight: 600,
    color: "#1a3a5c",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
  },
  sectionTitleLine: {
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
  textarea: {
    padding: "10px 12px",
    border: "0.5px solid #d0dbe8",
    borderRadius: 8,
    fontSize: 13,
    color: "#1a3a5c",
    background: "#f8fafc",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    resize: "vertical",
    lineHeight: 1.6,
  },
  searchRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: 12,
  },
  searchBtn: {
    height: 38,
    padding: "0 20px",
    background: "#1a6bb5",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  fileList: {
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  fileRow: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "12px 16px",
    background: "#f8fafc",
    border: "0.5px solid #d0dbe8",
    borderRadius: 8,
  },
  fileLabel: {
    fontSize: 13,
    color: "#1a3a5c",
    fontWeight: 500,
    flex: 1,
    minWidth: 0,
  },
  fileInputWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },
  fileBtn: {
    padding: "6px 14px",
    background: "#fff",
    border: "0.5px solid #d0dbe8",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 500,
    color: "#1a3a5c",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  fileName: {
    fontSize: 12,
    color: "#6b7f94",
    whiteSpace: "nowrap",
  },
  errorMsg: {
    background: "#fef2f2",
    border: "0.5px solid #f87171",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 13,
    color: "#991b1b",
  },
  successMsg: {
    background: "#f0fdf4",
    border: "0.5px solid #4ade80",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 13,
    color: "#166534",
  },
  submitRow: {
    display: "flex",
    justifyContent: "flex-end",
  },
  submitBtn: {
    height: 44,
    padding: "0 32px",
    background: "#1a3a5c",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: "0.02em",
  },
};