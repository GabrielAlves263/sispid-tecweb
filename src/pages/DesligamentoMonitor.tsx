import { useState } from "react";
import type { CSSProperties, ChangeEvent } from "react";
import { inserirDesligamento } from "../services/desligamentoService";

interface FormData {
  dataDesligamento: string;
  monitor: string;
  tipo: string;
  motivo: string;
}

const MONITORES_MOCK = [
  { value: "", label: "Selecione um monitor" },
  { value: "1", label: "João Silva" },
  { value: "2", label: "Maria Souza" },
  { value: "3", label: "Carlos Lima" },
];

const TIPOS_DESLIGAMENTO = [
  { value: "", label: "Selecione o tipo" },
  { value: "voluntario", label: "A pedido do monitor" },
  { value: "reprovacao", label: "Reprovação na disciplina" },
  { value: "rendimento", label: "Baixo rendimento acadêmico" },
  { value: "conduta", label: "Conduta inadequada" },
  { value: "outro", label: "Outro" },
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
  hint,
  span = 1,
  children,
}: {
  label: string;
  hint?: string;
  span?: number;
  children: React.ReactNode;
}) {
  return (
    <div style={{ ...styles.field, gridColumn: `span ${span}` }}>
      <label style={styles.label}>{label}</label>
      {hint && <span style={styles.hint}>{hint}</span>}
      {children}
    </div>
  );
}

export default function DesligamentoMonitorPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [form, setForm] = useState<FormData>({
    dataDesligamento: "",
    monitor: "",
    tipo: "",
    motivo: "",
  });

  const set =
    (key: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleLimpar = () =>
    setForm({ dataDesligamento: "2026-03-31", monitor: "", tipo: "", motivo: "" });

  const handleSubmit = async () => {
    setShowConfirmModal(false);
    setSuccess(null);
    setError(null);
    setIsLoading(true);

    try {
      await inserirDesligamento({
        dataDesligamento: form.dataDesligamento,
        monitorId: form.monitor,
        tipo: form.tipo,
        motivo: form.motivo,
      });
      setSuccess("Desligamento registrado com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao registrar desligamento");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <SectionTitle>Solicitação de desligamento do(a) monitor(a)</SectionTitle>

        <div style={styles.grid}>
          <Field label="Data de desligamento" hint="O monitor será desligado a partir desta data" span={1}>
            <input
              style={styles.input}
              type="date"
              value={form.dataDesligamento}
              onChange={set("dataDesligamento")}
            />
          </Field>

          <Field label="Monitor" hint="Selecione o monitor a ser desligado" span={1}>
            <select style={styles.input} value={form.monitor} onChange={set("monitor")}>
              {MONITORES_MOCK.map((m) => (
                <option key={m.value} value={m.value}>
                  {m.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Tipo de desligamento" span={2}>
            <select style={styles.input} value={form.tipo} onChange={set("tipo")}>
              {TIPOS_DESLIGAMENTO.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Motivo(s) da solicitação de desligamento" span={2}>
            <textarea
              style={styles.textarea}
              rows={5}
              placeholder="Descreva os motivos que justificam o desligamento do monitor..."
              value={form.motivo}
              onChange={set("motivo")}
            />
          </Field>
        </div>
      </div>

      {/* Aviso */}
      <div style={styles.warning}>
        <span style={styles.warningIcon}>⚠️</span>
        <span style={styles.warningText}>
          Esta ação é irreversível. Após a inserção, o monitor será desligado do projeto a partir da data informada.
        </span>
      </div>

      {/* Mensagens */}
      {error && <div style={styles.msgBox}>{error}</div>}
      {success && <div style={{ ...styles.msgBox, background: "#f0fdf4", borderColor: "#4ade80", color: "#166534" }}>{success}</div>}

      {/* Botões */}
      <div style={styles.submitRow}>
        <button style={styles.cancelBtn} onClick={handleLimpar}>
          Limpar
        </button>
        <button style={styles.submitBtn} onClick={() => setShowConfirmModal(true)} disabled={isLoading}>
          {isLoading ? "Enviando..." : "Confirmar desligamento"}
        </button>
      </div>

      {/* Modal de confirmação */}
      {showConfirmModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalIcon}>⚠️</div>
            <h3 style={styles.modalTitle}>Confirmar desligamento</h3>
            <p style={styles.modalText}>
              Tem certeza que deseja desligar este monitor? Esta ação é irreversível.
            </p>
            <div style={styles.modalActions}>
              <button style={styles.cancelBtn} onClick={() => setShowConfirmModal(false)}>
                Cancelar
              </button>
              <button style={styles.submitBtn} onClick={handleSubmit}>
                Sim, confirmar
              </button>
            </div>
          </div>
        </div>
      )}
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
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: 500,
    color: "#6b7f94",
  },
  hint: {
    fontSize: 11,
    color: "#a0b0c0",
    marginBottom: 2,
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
  warning: {
    display: "flex",
    alignItems: "flex-start",
    gap: 10,
    background: "#fff8ec",
    border: "0.5px solid #f5c842",
    borderRadius: 8,
    padding: "12px 16px",
  },
  warningIcon: {
    fontSize: 16,
    flexShrink: 0,
    marginTop: 1,
  },
  warningText: {
    fontSize: 13,
    color: "#7a5c00",
    lineHeight: 1.5,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    borderRadius: 16,
    padding: "32px 36px",
    maxWidth: 420,
    width: "90%",
    textAlign: "center",
    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
  },
  modalIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "#1a3a5c",
    margin: "0 0 8px",
  },
  modalText: {
    fontSize: 14,
    color: "#6b7f94",
    lineHeight: 1.5,
    margin: "0 0 24px",
  },
  modalActions: {
    display: "flex",
    justifyContent: "center",
    gap: 12,
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
    background: "#993c1d",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
};