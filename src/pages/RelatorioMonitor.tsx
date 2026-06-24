import { useState } from "react";
import type { CSSProperties, ChangeEvent } from "react";
import { FiUploadCloud, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import { required } from "../utils/validators";

interface FormData {
	monitor: string;
	conceito: string;
	arquivo: File | null;
}

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

function RelatorioMonitorPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [validationErrors, setValidationErrors] = useState<string[]>([]);
	const [form, setForm] = useState<FormData>({
		monitor: "",
		conceito: "",
		arquivo: null,
	});
	const [fileName, setFileName] = useState("Nenhum arquivo escolhido");

	const set =
		(key: keyof FormData) =>
		(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
			if (key === "arquivo" && e.target instanceof HTMLInputElement) {
				const files = e.target.files;
				if (files && files[0]) {
					setForm((prev) => ({ ...prev, arquivo: files[0] }));
					setFileName(files[0].name);
				}
			} else {
				setForm((prev) => ({ ...prev, [key]: e.target.value }));
			}
		};

	const handleClear = () => {
		setForm({
			monitor: "",
			conceito: "",
			arquivo: null,
		});
		setFileName("Nenhum arquivo escolhido");
		setSuccess(null);
		setError(null);
		setValidationErrors([]);
	};

	const validate = (): boolean => {
		const errors: string[] = [];
		const fields: [string, string][] = [
			[form.monitor, "Monitor"],
			[form.conceito, "Conceito"],
		];
		for (const [value, label] of fields) {
			const err = required(value, label);
			if (err) errors.push(err);
		}
		if (!form.arquivo) {
			errors.push("Arquivo do relatório é obrigatório.");
		}
		setValidationErrors(errors);
		return errors.length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSuccess(null);
		setError(null);
		setValidationErrors([]);

		if (!validate()) {
			return;
		}

		setIsLoading(true);

		setTimeout(() => {
			setSuccess("Relatório do monitor inserido com sucesso!");
			setIsLoading(false);
			handleClear();
		}, 1000);
	};

	return (
		<div style={styles.page}>
			<div style={styles.headerBlock}>
				<h1 style={styles.pageTitle}>RELATÓRIO DE AVALIAÇÃO DO(A) MONITOR(A)</h1>
				<p style={styles.pageSubtitle}>
					Formulário para envio do relatório de avaliação do monitor.
				</p>
			</div>

			<div style={styles.card}>
				<SectionTitle>Dados do relatório</SectionTitle>

				<form onSubmit={handleSubmit}>
					<div style={styles.grid}>
						<Field label="Monitor:" span={1}>
							<select
								style={styles.input}
								value={form.monitor}
								onChange={set("monitor")}
							>
								<option value="">Selecione um monitor</option>
								<option value="monitor1">Monitor 1</option>
								<option value="monitor2">Monitor 2</option>
								<option value="monitor3">Monitor 3</option>
							</select>
						</Field>

						<Field label="Conceito:" span={1}>
							<select
								style={styles.input}
								value={form.conceito}
								onChange={set("conceito")}
							>
								<option value="">Selecione um conceito</option>
								<option value="A">A</option>
								<option value="B">B</option>
								<option value="C">C</option>
								<option value="D">D</option>
							</select>
						</Field>
					</div>

					<div style={styles.fileSection}>
						<SectionTitle>Anexar relatório do monitor</SectionTitle>
						<div style={styles.fileUpload}>
							<label style={styles.fileLabel}>
								<FiUploadCloud style={styles.uploadIcon} />
								<input
									type="file"
									style={styles.fileInput}
									onChange={set("arquivo")}
									accept=".pdf,.doc,.docx,.xlsx,.txt"
								/>
							</label>
							<span style={styles.fileName}>{fileName}</span>
						</div>
					</div>

					<div style={styles.observations}>
						<div style={styles.obsBox}>
							<FiAlertTriangle style={styles.obsIcon} />
							<span>
								<strong>OBS:</strong> Incluir relatório e resumo do EID em um único arquivo.
							</span>
						</div>
						<div style={styles.obsBox}>
							<FiAlertTriangle style={styles.obsIcon} />
							<span>
								<strong>OBS2:</strong> É preciso desligar o monitor antes de enviar o relatório
							</span>
						</div>
					</div>

					<div style={styles.actions}>
						<button
							type="button"
							onClick={handleClear}
							style={styles.cancelBtn}
							disabled={isLoading}
						>
							Limpar
						</button>
						<button
							type="submit"
							style={styles.submitBtn}
							disabled={isLoading}
						>
							{isLoading ? "Enviando..." : "Enviar"}
						</button>
					</div>
				</form>
			</div>

			{validationErrors.length > 0 && (
				<div style={styles.msgBox}>
					<div style={{ fontWeight: 600, marginBottom: 6 }}>
						{validationErrors.length} erro(s) encontrado(s):
					</div>
					{validationErrors.slice(0, 5).map((message, index) => (
						<div key={index} style={{ marginLeft: 12 }}>
							&bull; {message}
						</div>
					))}
				</div>
			)}
			{error && <div style={styles.msgBox}>{error}</div>}
			{success && (
				<div style={{ ...styles.msgBox, background: "#f0fdf4", borderColor: "#4ade80", color: "#166534" }}>
					<span style={styles.successIcon}><FiCheckCircle /></span>
					{success}
				</div>
			)}
		</div>
	);
}

const styles: Record<string, CSSProperties> = {
	page: {
		minHeight: "calc(100vh - 120px)",
		padding: "32px 24px 48px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 20,
		fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
		background: "linear-gradient(180deg, #f6f9fc 0%, #eef3f8 100%)",
	},
	headerBlock: {
		textAlign: "center",
		maxWidth: 980,
	},
	pageTitle: {
		fontSize: 24,
		fontWeight: 700,
		color: "#1a3a5c",
		margin: 0,
		letterSpacing: "0.03em",
	},
	pageSubtitle: {
		margin: "8px 0 0",
		fontSize: 14,
		color: "#6b7f94",
	},
	card: {
		width: "100%",
		maxWidth: 980,
		background: "#fff",
		border: "0.5px solid #d0dbe8",
		borderRadius: 12,
		padding: "24px 28px 28px",
		boxShadow: "0 8px 30px rgba(26,58,92,0.05)",
	},
	sectionTitle: {
		display: "flex",
		alignItems: "center",
		gap: 12,
		marginBottom: 22,
	},
	sectionTitleText: {
		fontSize: 13,
		fontWeight: 700,
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
		gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
		gap: "16px 20px",
		marginBottom: 24,
	},
	field: {
		display: "flex",
		flexDirection: "column",
		gap: 6,
	},
	label: {
		fontSize: 12,
		fontWeight: 600,
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
	fileSection: {
		marginBottom: 24,
	},
	fileUpload: {
		display: "flex",
		alignItems: "center",
		gap: 16,
		padding: 16,
		backgroundColor: "#f8fafc",
		border: "2px dashed #d0dbe8",
		borderRadius: 8,
	},
	fileLabel: {
		display: "flex",
		alignItems: "center",
		cursor: "pointer",
		position: "relative",
	},
	uploadIcon: {
		fontSize: 24,
		color: "#1a6bb5",
	},
	fileInput: {
		position: "absolute",
		opacity: 0,
		width: 0,
		height: 0,
		cursor: "pointer",
	},
	fileName: {
		fontSize: 14,
		color: "#6b7f94",
	},
	observations: {
		marginBottom: 24,
		display: "flex",
		flexDirection: "column",
		gap: 12,
	},
	obsBox: {
		display: "flex",
		alignItems: "flex-start",
		gap: 12,
		padding: 12,
		backgroundColor: "#fef3c7",
		borderLeft: "4px solid #b45309",
		borderRadius: 4,
		fontSize: 13,
		color: "#78350f",
	},
	obsIcon: {
		color: "#b45309",
		marginTop: 2,
		flexShrink: 0,
	},
	actions: {
		display: "flex",
		justifyContent: "center",
		gap: 12,
	},
	cancelBtn: {
		height: 42,
		padding: "0 22px",
		background: "#fff",
		color: "#6b7f94",
		border: "0.5px solid #d0dbe8",
		borderRadius: 8,
		fontSize: 13,
		fontWeight: 600,
		cursor: "pointer",
	},
	submitBtn: {
		height: 42,
		padding: "0 28px",
		background: "#1a6bb5",
		color: "#fff",
		border: "none",
		borderRadius: 8,
		fontSize: 13,
		fontWeight: 700,
		cursor: "pointer",
		boxShadow: "0 6px 16px rgba(26,107,181,0.18)",
	},
	msgBox: {
		width: "100%",
		maxWidth: 980,
		background: "#fef2f2",
		border: "0.5px solid #f87171",
		borderRadius: 8,
		padding: "12px 16px",
		fontSize: 13,
		color: "#991b1b",
	},
	successIcon: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 8,
		fontSize: 14,
	},
};

export default RelatorioMonitorPage;
