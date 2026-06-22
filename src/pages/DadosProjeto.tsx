import type { CSSProperties } from "react";

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

export default function DadosProjetoPage() {
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.pageTitle}>Dados do Projeto</h2>
        <hr style={styles.divider} />

        <div style={styles.grid}>
          {/* Linha 1 */}
          <Field label="Número do Projeto:">
            <input
              style={styles.input}
              type="text"
              value="PID202619432"
              readOnly
            />
          </Field>

          <Field label="Regime de Trabalho:">
            <input
              style={styles.input}
              type="text"
              value="DEDICAÇÃO EXCLUSIVA"
              readOnly
            />
          </Field>

          {/* Linha 2 */}
          <Field label="Título do Projeto:">
            <textarea
              style={{ ...styles.input, ...styles.textArea }}
              value="Melhoria Pedagógica das disciplinas da área de controle e automação"
              readOnly
            />
          </Field>

          <Field label="Dedicação Exclusiva:">
            <input style={styles.input} type="text" value="Sim" readOnly />
          </Field>

          {/* Linha 3 */}
          <Field label="CPF Professor:">
            <input
              style={styles.input}
              type="text"
              value="123.456.789-10"
              readOnly
            />
          </Field>

          <Field label="Situação:">
            <input
              style={{ ...styles.input, ...styles.inputSuccess }}
              type="text"
              value="Aprovado"
              readOnly
            />
          </Field>

          {/* Linha 4 */}
          <Field label="Professor:">
            <input
              style={styles.input}
              type="text"
              value="DANILLO FERNANDES DO NASCIMENTO"
              readOnly
            />
          </Field>

          <Field label="Qtd Monitores Remunerados:">
            <input style={styles.input} type="text" value="1" readOnly />
          </Field>

          {/* Linha 5 */}
          <Field label="Unidade Acadêmica:">
            <input
              style={styles.input}
              type="text"
              value="CUFCSOBRAL"
              readOnly
            />
          </Field>

          <Field label="Qtd Monitores Voluntários:">
            <input style={styles.input} type="text" value="0" readOnly />
          </Field>
        </div>
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
    maxWidth: 900,
    margin: "0 auto",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  card: {
    background: "#fff",
    border: "0.5px solid #d0dbe8",
    borderRadius: 12,
    padding: "32px 40px",
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 500,
    color: "#2c3e50",
    margin: "0 0 16px 0",
  },
  divider: {
    border: "none",
    borderTop: "1px solid #edf2f7",
    margin: "0 0 24px 0",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "24px 32px",
    alignItems: "start", // Garante que campos menores não estiquem se o vizinho for uma textarea
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: "#4a5568",
  },
  input: {
    height: 42,
    padding: "0 14px",
    border: "1px solid #e2e8f0",
    borderRadius: 8,
    fontSize: 14,
    color: "#2d3748",
    background: "#f8fafc",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  textArea: {
    height: 64,
    padding: "10px 14px",
    resize: "none",
    lineHeight: "1.4",
  },
  inputSuccess: {
    background: "#f0fdf4",
    borderColor: "#bbf7d0",
    color: "#16a34a",
    fontWeight: 500,
  },
};
