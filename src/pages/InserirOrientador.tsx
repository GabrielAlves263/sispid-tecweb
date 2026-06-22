import { useState } from "react";
import type { CSSProperties, ChangeEvent } from "react";
import { inserirOrientador } from "../services/orientadorService";
import { required, isEmail, isCpf } from "../utils/validators";

interface FormData {
  cpfConsulta: string;
  monitor: string;
  cpf: string;
  nome: string;
  email: string;
  telefone: string;
  unidadeAcademica: string;
}

const MONITORES_MOCK = [
  { value: "", label: "Selecione um monitor" },
  { value: "1", label: "João Silva" },
  { value: "2", label: "Maria Souza" },
  { value: "3", label: "Carlos Lima" },
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
  span = 1,
  children,
}: {
  label: string;
  span?: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{ ...styles.field, gridColumn: `span ${span}` }}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

export default function InserirOrientadorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [form, setForm] = useState<FormData>({
    cpfConsulta: "",
    monitor: "",
    cpf: "",
    nome: "",
    email: "",
    telefone: "",
    unidadeAcademica: "",
  });

  const set =
    (key: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleConsultar = () => {
    console.log("Consultando CPF:", form.cpfConsulta);
  };

  const validate = (): boolean => {
    const errors: string[] = [];

    const fields: [string, string][] = [
      ["monitor", "Monitor"],
      ["cpf", "CPF"],
      ["nome", "Nome"],
      ["email", "E-mail"],
      ["telefone", "Telefone"],
      ["unidadeAcademica", "Unidade acadêmica"],
    ];

    for (const [key, label] of fields) {
      const err = required(form[key as keyof typeof form] as string, label);
      if (err) errors.push(err);
    }

    const emailErr = isEmail(form.email);
    if (emailErr) errors.push(emailErr);

    const cpfErr = isCpf(form.cpf);
    if (cpfErr) errors.push(cpfErr);

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
      await inserirOrientador({
        monitorId: form.monitor,
        cpf: form.cpf,
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        unidadeAcademica: form.unidadeAcademica,
      });
      setSuccess("Orientador inserido com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao inserir orientador");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLimpar = () => {
    setForm({
      cpfConsulta: "",
      monitor: "",
      cpf: "",
      nome: "",
      email: "",
      telefone: "",
      unidadeAcademica: "",
    });
  };

  return (
    <div style={styles.page}>

      {/* Busca por CPF */}
      <div style={styles.card}>
        <SectionTitle>Dados do orientador</SectionTitle>
        <div style={styles.searchRow}>
          <div style={{ ...styles.field, flex: 1, maxWidth: 260 }}>
            <label style={styles.label}>CPF</label>
            <input
              style={styles.input}
              type="text"
              placeholder="000.000.000-00"
              value={form.cpfConsulta}
              onChange={set("cpfConsulta")}
            />
          </div>
          <button style={styles.searchBtn} onClick={handleConsultar}>
            Consultar
          </button>
        </div>
      </div>

      {/* Dados do orientador */}
      <div style={styles.card}>
        <SectionTitle>Informações do orientador</SectionTitle>
        <div style={styles.grid}>
          <Field label="Monitor" span={2}>
            <select style={styles.input} value={form.monitor} onChange={set("monitor")}>
              {MONITORES_MOCK.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="CPF" span={1}>
            <input
              style={styles.input}
              type="text"
              placeholder="000.000.000-00"
              value={form.cpf}
              onChange={set("cpf")}
            />
          </Field>

          <Field label="Nome completo" span={2}>
            <input
              style={styles.input}
              type="text"
              placeholder="Nome completo do orientador"
              value={form.nome}
              onChange={set("nome")}
            />
          </Field>

          <Field label="E-mail" span={1}>
            <input
              style={styles.input}
              type="email"
              placeholder="orientador@email.com"
              value={form.email}
              onChange={set("email")}
            />
          </Field>

          <Field label="Telefone(s)" span={1}>
            <input
              style={styles.input}
              type="text"
              placeholder="(00) 00000-0000"
              value={form.telefone}
              onChange={set("telefone")}
            />
          </Field>

          <Field label="Unidade acadêmica" span={2}>
            <input
              style={styles.input}
              type="text"
              placeholder="Ex: Centro de Ciências"
              value={form.unidadeAcademica}
              onChange={set("unidadeAcademica")}
            />
          </Field>
        </div>
      </div>

      {/* Mensagens */}
      {validationErrors.length > 0 && (
        <div style={styles.msgBox}>
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
      {error && <div style={styles.msgBox}>{error}</div>}
      {success && <div style={{ ...styles.msgBox, background: "#f0fdf4", borderColor: "#4ade80", color: "#166534" }}>{success}</div>}

      {/* Botões */}
      <div style={styles.submitRow}>
        <button style={styles.cancelBtn} onClick={handleLimpar}>
          Limpar
        </button>
        <button style={styles.submitBtn} onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Enviando..." : "Inserir orientador"}
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
    maxWidth: 700,
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
    marginBottom: 24,
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
    gridTemplateColumns: "repeat(2, 1fr)",
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
  msgBox: {
    background: "#fef2f2",
    border: "0.5px solid #f87171",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 13,
    color: "#991b1b",
  },
  submitRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },
  cancelBtn: {
    height: 40,
    padding: "0 20px",
    background: "#fff",
    color: "#6b7f94",
    border: "0.5px solid #d0dbe8",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
  },
  submitBtn: {
    height: 40,
    padding: "0 28px",
    background: "#1a3a5c",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
};