import { useState } from "react";
import { FiUploadCloud, FiAlertTriangle } from "react-icons/fi";

interface FormData {
	monitor: string;
	conceito: string;
	arquivo: File | null;
}

function RelatorioMonitorPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [form, setForm] = useState<FormData>({
		monitor: "",
		conceito: "",
		arquivo: null,
	});
	const [fileName, setFileName] = useState("Nenhum arquivo escolhido");

	const set =
		(key: keyof FormData) =>
		(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!form.monitor || !form.conceito || !form.arquivo) {
			setError("Por favor, preencha todos os campos e selecione um arquivo.");
			return;
		}

		setIsLoading(true);
		setSuccess(null);
		setError(null);

		// Simular envio para backend
		setTimeout(() => {
			setSuccess("Relatório do monitor inserido com sucesso!");
			setIsLoading(false);
			handleClear();
		}, 1000);
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.title}>RELATÓRIO DE AVALIAÇÃO DO(A) MONITOR(A)</h1>

			{success && <div style={styles.successBox}>{success}</div>}
			{error && <div style={styles.errorBox}>{error}</div>}

			<form onSubmit={handleSubmit}>
				<div style={styles.grid}>
					<Field label="Monitor:">
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

					<Field label="Conceito:">
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
					<h3 style={styles.sectionTitle}>Anexar o relatório do monitor:</h3>
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

				<div style={styles.buttonGroup}>
					<button
						type="button"
						onClick={handleClear}
						style={styles.buttonClear}
						disabled={isLoading}
					>
						Limpar
					</button>
					<button
						type="submit"
						style={styles.buttonSubmit}
						disabled={isLoading}
					>
						{isLoading ? "Enviando..." : "Inserir"}
					</button>
				</div>
			</form>
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

const styles: Record<string, React.CSSProperties> = {
	container: {
		maxWidth: 800,
		margin: "0 auto",
		padding: 24,
		backgroundColor: "#ffffff",
		borderRadius: 8,
		boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
	},
	title: {
		fontSize: 24,
		fontWeight: 700,
		color: "#1a3a5c",
		marginBottom: 24,
		textAlign: "center",
	},
	successBox: {
		padding: 12,
		marginBottom: 16,
		backgroundColor: "#d1fae5",
		color: "#065f46",
		borderRadius: 6,
		fontSize: 14,
		border: "1px solid #a7f3d0",
	},
	errorBox: {
		padding: 12,
		marginBottom: 16,
		backgroundColor: "#fee2e2",
		color: "#991b1b",
		borderRadius: 6,
		fontSize: 14,
		border: "1px solid #fecaca",
	},
	grid: {
		display: "grid",
		gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
		gap: 16,
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
		padding: "8px 12px",
		fontSize: 14,
		border: "1px solid #d0dbe8",
		borderRadius: 4,
		backgroundColor: "#f8fafc",
		color: "#1a3a5c",
		fontFamily: "inherit",
		transition: "border-color 0.2s",
	},
	fileSection: {
		marginBottom: 24,
		paddingBottom: 16,
		borderBottom: "1px solid #d0dbe8",
	},
	sectionTitle: {
		fontSize: 14,
		fontWeight: 600,
		color: "#6b7f94",
		marginBottom: 12,
	},
	fileUpload: {
		display: "flex",
		alignItems: "center",
		gap: 16,
		padding: 16,
		backgroundColor: "#f8fafc",
		border: "2px dashed #d0dbe8",
		borderRadius: 6,
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
	buttonGroup: {
		display: "flex",
		gap: 12,
		justifyContent: "flex-end",
	},
	buttonClear: {
		padding: "10px 20px",
		fontSize: 14,
		fontWeight: 600,
		color: "#6b7f94",
		backgroundColor: "#f0f4f9",
		border: "1px solid #d0dbe8",
		borderRadius: 4,
		cursor: "pointer",
		transition: "background-color 0.2s",
	},
	buttonSubmit: {
		padding: "10px 20px",
		fontSize: 14,
		fontWeight: 600,
		color: "#ffffff",
		backgroundColor: "#1a6bb5",
		border: "none",
		borderRadius: 4,
		cursor: "pointer",
		transition: "background-color 0.2s",
	},
};

export default RelatorioMonitorPage;
