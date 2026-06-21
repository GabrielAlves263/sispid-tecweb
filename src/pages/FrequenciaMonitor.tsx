import { useState } from "react";
import type { CSSProperties, ChangeEvent } from "react";

interface FormData {
	referencia: string;
	monitor: string;
	declaracao: boolean;
}

const REFERENCIAS_MOCK = [
	{ value: "", label: "Selecione o mês de referência" },
	{ value: "01/2026", label: "01/2026" },
	{ value: "02/2026", label: "02/2026" },
	{ value: "03/2026", label: "03/2026" },
	{ value: "04/2026", label: "04/2026" },
	{ value: "05/2026", label: "05/2026" },
	{ value: "06/2026", label: "06/2026" },
];

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

export default function FrequenciaMensalMonitorPage() {
	const [form, setForm] = useState<FormData>({
		referencia: "04/2026",
		monitor: "",
		declaracao: false,
	});

	const set =
		(key: "referencia" | "monitor") =>
		(e: ChangeEvent<HTMLSelectElement>) =>
			setForm((f) => ({ ...f, [key]: e.target.value }));

	const toggleDeclaracao = (e: ChangeEvent<HTMLInputElement>) =>
		setForm((f) => ({ ...f, declaracao: e.target.checked }));

	const isValid = form.referencia !== "" && form.monitor !== "" && form.declaracao;

	const handleSubmit = () => {
		if (!isValid) return;
		console.log("Frequência inserida:", form);
	};

	return (
		<div style={styles.page}>
			<h1 style={styles.pageTitle}>Frequência mensal do monitor PID</h1>

			<div style={styles.card}>
				<SectionTitle>Dados da frequência</SectionTitle>

				<div style={styles.grid}>
					<Field label="Referência">
						<select
							style={styles.input}
							value={form.referencia}
							onChange={set("referencia")}
						>
							{REFERENCIAS_MOCK.map((r) => (
								<option key={r.value} value={r.value}>
									{r.label}
								</option>
							))}
						</select>
					</Field>

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
				</div>

				<label style={styles.checkboxRow}>
					<input
						style={styles.checkbox}
						type="checkbox"
						checked={form.declaracao}
						onChange={toggleDeclaracao}
					/>
					<span style={styles.checkboxText}>
						Declaro que o bolsista/voluntário apresenta matrícula em, no
						mínimo, 12 (doze) horas semanais em componentes curriculares, no
						semestre vigente, e que cumpriu 48 (quarenta e oito) horas mensais
						no mês de referência acima explicitado.
					</span>
				</label>
			</div>

			<div style={styles.submitRow}>
				<button
					style={styles.cancelBtn}
					onClick={() =>
						setForm({ referencia: "", monitor: "", declaracao: false })
					}
				>
					Limpar
				</button>
				<button
					style={{
						...styles.submitBtn,
						...(isValid ? {} : styles.submitBtnDisabled),
					}}
					onClick={handleSubmit}
					disabled={!isValid}
				>
					✅ Inserir
				</button>
			</div>
		</div>
	);
}

const styles: Record<string, CSSProperties> = {
	page: {
		background: "#f0f4f8",
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
	pageTitle: {
		fontSize: 18,
		fontWeight: 700,
		color: "#1a3a5c",
		margin: "0 0 4px",
		letterSpacing: "-0.01em",
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
	checkboxRow: {
		display: "flex",
		alignItems: "flex-start",
		gap: 10,
		marginTop: 24,
		paddingTop: 20,
		borderTop: "0.5px solid #d0dbe8",
		cursor: "pointer",
	},
	checkbox: {
		marginTop: 2,
		width: 16,
		height: 16,
		minWidth: 16,
		accentColor: "#1a3a5c",
		cursor: "pointer",
	},
	checkboxText: {
		fontSize: 12.5,
		lineHeight: 1.5,
		color: "#445b73",
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
	submitBtnDisabled: {
		background: "#a9b8c8",
		cursor: "not-allowed",
	},
};