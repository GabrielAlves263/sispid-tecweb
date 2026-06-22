import { useState } from "react";
import type { CSSProperties, ChangeEvent } from "react";
import { inserirDisciplina } from "../services/disciplinaService";

interface FormData {
	monitor: string;
	codigoDisciplina: string;
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
	children,
}: {
	label: string;
	children: React.ReactNode;
}) {
	return (
		<div style={styles.field}>
			<label style={styles.label}>{label}</label>
			{children}
		</div>
	);
}

export default function InserirDisciplinaPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [form, setForm] = useState<FormData>({
		monitor: "",
		codigoDisciplina: "",
	});

	const set =
		(key: keyof FormData) =>
		(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
			setForm((f) => ({ ...f, [key]: e.target.value }));

	const handleSubmit = async () => {
		setSuccess(null);
		setError(null);
		setIsLoading(true);

		try {
			await inserirDisciplina({ monitorId: form.monitor, codigoDisciplina: form.codigoDisciplina });
			setSuccess("Disciplina inserida com sucesso!");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erro ao inserir disciplina");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div style={styles.page}>
			<div style={styles.card}>
				<SectionTitle>Dados da disciplina</SectionTitle>

				<div style={styles.grid}>
					<Field label="Monitor">
						<select
							style={styles.input}
							value={form.monitor}
							onChange={set("monitor")}
						>
							{MONITORES_MOCK.map((m) => (
								<option key={m.value} value={m.value}>
									{m.label}
								</option>
							))}
						</select>
					</Field>

					<Field label="Código da disciplina">
						<input
							style={styles.input}
							type="text"
							placeholder="Ex: CK0196"
							value={form.codigoDisciplina}
							onChange={set("codigoDisciplina")}
						/>
					</Field>
				</div>
			</div>

			{error && <div style={styles.msgBox}>{error}</div>}
			{success && <div style={{ ...styles.msgBox, background: "#f0fdf4", borderColor: "#4ade80", color: "#166534" }}>{success}</div>}

			<div style={styles.submitRow}>
				<button
					style={styles.cancelBtn}
					onClick={() => setForm({ monitor: "", codigoDisciplina: "" })}
				>
					Limpar
				</button>
				<button style={styles.submitBtn} onClick={handleSubmit} disabled={isLoading}>
					{isLoading ? "Enviando..." : "Inserir disciplina"}
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
		maxWidth: 600,
		margin: "0 auto",
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
		display: "flex",
		flexDirection: "column",
		gap: 16,
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
