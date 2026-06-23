import { useState } from "react";
import type { CSSProperties, ChangeEvent } from "react";
import {
	FiAlertTriangle,
	FiCalendar,
	FiCheckCircle,
	FiClock,
	FiFileText,
	FiUsers,
} from "react-icons/fi";
import { required } from "../utils/validators";

interface FormData {
	dataInicio: string;
	monitor: string;
	tipoAtividade: string;
	situacao: string;
	cargaHoraria: string;
	declaracao: boolean;
}

const MONITORES = [
	{ value: "", label: "Selecione um monitor" },
	{ value: "1", label: "João Silva" },
	{ value: "2", label: "Maria Souza" },
	{ value: "3", label: "Carlos Lima" },
];

const SITUACOES = [
	{ value: "", label: "Selecione a situação" },
	{ value: "nao-contraria", label: "Não contraria a condição de monitor" },
	{ value: "contraria-sem-prejuizo", label: "Contraria, mas sem prejuízo ao programa" },
	{ value: "contraria-com-autorizacao", label: "Contraria com autorização excepcional" },
];

const CARGAS = [
	{ value: "", label: "Selecione a carga" },
	{ value: "2", label: "Até 2 horas semanais" },
	{ value: "4", label: "Até 4 horas semanais" },
	{ value: "6", label: "Até 6 horas semanais" },
	{ value: "8", label: "Até 8 horas semanais" },
];

function SectionTitle({ children }: { children: string }) {
	return (
		<div style={styles.sectionTitle}>
			<span style={styles.sectionTitleIcon}>
				<FiFileText />
			</span>
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

export default function AutorizacaoAcumuloPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [validationErrors, setValidationErrors] = useState<string[]>([]);
	const [form, setForm] = useState<FormData>({
		dataInicio: "2026-05-01",
		monitor: "",
		tipoAtividade: "",
		situacao: "",
		cargaHoraria: "",
		declaracao: false,
	});

	const set =
		(key: keyof FormData) =>
		(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
			setForm((current) => ({
				...current,
				[key]:
					e.target instanceof HTMLInputElement && e.target.type === "checkbox"
						? e.target.checked
						: e.target.value,
			}));

	const validate = (): boolean => {
		const errors: string[] = [];
		const fields: [string, string][] = [
			[form.dataInicio, "Data a partir da qual o acúmulo é autorizado"],
			[form.monitor, "Monitor"],
			[form.tipoAtividade, "Tipo de atividade"],
			[form.situacao, "Situação da atividade acumulada"],
			[form.cargaHoraria, "Carga horária mensal da atividade acumulada"],
		];

		for (const [value, label] of fields) {
			const err = required(value, label);
			if (err) errors.push(err);
		}

		if (!form.declaracao) {
			errors.push("Você precisa declarar a autorização para continuar.");
		}

		setValidationErrors(errors);
		return errors.length === 0;
	};

	const handleSubmit = () => {
		setSuccess(null);
		setError(null);
		setValidationErrors([]);

		if (!validate()) {
			return;
		}

		setIsLoading(true);
		window.setTimeout(() => {
			setIsLoading(false);
			setSuccess("Autorização de acúmulo registrada com sucesso!");
		}, 450);
	};

	return (
		<div style={styles.page}>
			<div style={styles.hero}>
				<span style={styles.eyebrow}>Cadastro de autorização</span>
				<h1 style={styles.title}>Autorização de Acúmulo de Atividades</h1>
				<p style={styles.subtitle}>
					Registre a autorização do monitor para acumular outra atividade sem comprometer o PID.
				</p>
			</div>

			<div style={styles.card}>
				<SectionTitle>Autorizo o acúmulo de atividades pelo monitor</SectionTitle>

				<div style={styles.grid}>
					<Field
						label="A partir de"
						hint="Data inicial da autorização"
						span={1}
					>
						<div style={styles.inputWithIcon}>
							<span style={styles.inputIcon}><FiCalendar /></span>
							<input
								style={styles.input}
								type="date"
								value={form.dataInicio}
								onChange={set("dataInicio")}
							/>
						</div>
					</Field>

					<Field label="Monitor" hint="Selecione o monitor autorizado" span={1}>
						<div style={styles.inputWithIcon}>
							<span style={styles.inputIcon}><FiUsers /></span>
							<select style={styles.input} value={form.monitor} onChange={set("monitor")}>
								{MONITORES.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</Field>

					<Field label="Tipo de atividade" hint="Descreva a outra atividade exercida" span={2}>
						<textarea
							style={styles.textarea}
							rows={4}
							placeholder="Ex: estágio, bolsa de pesquisa, atividade administrativa..."
							value={form.tipoAtividade}
							onChange={set("tipoAtividade")}
						/>
					</Field>

					<Field label="Situação da atividade acumulada" span={1}>
						<select style={styles.input} value={form.situacao} onChange={set("situacao")}>
							{SITUACOES.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</Field>

					<Field label="Carga horária mensal da atividade acumulada" span={1}>
						<div style={styles.inputWithIcon}>
							<span style={styles.inputIcon}><FiClock /></span>
							<select style={styles.input} value={form.cargaHoraria} onChange={set("cargaHoraria")}>
								{CARGAS.map((option) => (
									<option key={option.value} value={option.value}>
										{option.label}
									</option>
								))}
							</select>
						</div>
					</Field>

					<Field
						label="Declaração"
						hint="Confirmação obrigatória antes do registro"
						span={2}
					>
						<label style={styles.checkboxRow}>
							<input
								style={styles.checkbox}
								type="checkbox"
								checked={form.declaracao}
								onChange={set("declaracao")}
							/>
							<span style={styles.checkboxText}>
								Declaro que autorizo o monitor citado a acumular atividades com o Programa de Iniciação à Docência (PID), desde que atenda aos requisitos do edital vigente e que a atividade exercida seja contrária à condição de monitor do PID sem prejuízos para o programa.
							</span>
						</label>
					</Field>
				</div>

				<div style={styles.actions}>
					<button
						style={styles.submitBtn}
						onClick={handleSubmit}
						disabled={isLoading}
					>
						{isLoading ? "Inserindo..." : "Inserir"}
					</button>
				</div>
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
					<span style={styles.successIcon}>
						<FiCheckCircle />
					</span>
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
		background: "linear-gradient(180deg, #f6f9fc 0%, #eef3f8 100%)",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 20,
	},
	hero: {
		width: "100%",
		maxWidth: 980,
		textAlign: "center",
		padding: "4px 0 6px",
	},
	eyebrow: {
		display: "inline-block",
		fontSize: 12,
		fontWeight: 700,
		letterSpacing: "0.14em",
		textTransform: "uppercase",
		color: "#6b7f94",
		marginBottom: 10,
	},
	title: {
		fontSize: 30,
		lineHeight: 1.2,
		fontWeight: 700,
		color: "#1a3a5c",
		margin: 0,
	},
	subtitle: {
		margin: "10px auto 0",
		maxWidth: 760,
		fontSize: 15,
		lineHeight: 1.6,
		color: "#6b7f94",
	},
	notice: {
		width: "100%",
		maxWidth: 980,
		display: "flex",
		alignItems: "center",
		gap: 12,
		background: "#fff8ec",
		border: "0.5px solid #f5c842",
		borderRadius: 10,
		padding: "12px 16px",
		color: "#7a5c00",
	},
	noticeIcon: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: 18,
		color: "#b45309",
		flexShrink: 0,
	},
	noticeText: {
		fontSize: 13,
		lineHeight: 1.5,
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
		gap: 10,
		marginBottom: 22,
	},
	sectionTitleIcon: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		width: 28,
		height: 28,
		borderRadius: 8,
		background: "#d6e6f5",
		color: "#1a6bb5",
		fontSize: 14,
		flexShrink: 0,
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
	hint: {
		fontSize: 11,
		color: "#93a6bb",
		marginBottom: 1,
	},
	inputWithIcon: {
		display: "flex",
		alignItems: "center",
		gap: 8,
	},
	inputIcon: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		fontSize: 14,
		color: "#1a6bb5",
		flexShrink: 0,
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
	checkboxRow: {
		display: "flex",
		alignItems: "flex-start",
		gap: 10,
		padding: "12px 14px",
		border: "0.5px solid #d0dbe8",
		borderRadius: 8,
		background: "#f8fafc",
	},
	checkbox: {
		marginTop: 2,
		accentColor: "#1a6bb5",
		flexShrink: 0,
	},
	checkboxText: {
		fontSize: 13,
		lineHeight: 1.55,
		color: "#3d5570",
	},
	actions: {
		display: "flex",
		justifyContent: "flex-end",
		marginTop: 24,
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
