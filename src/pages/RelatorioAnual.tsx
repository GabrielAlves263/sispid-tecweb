import { useState } from "react";
import type { CSSProperties, ChangeEvent } from "react";
import { FiCheckCircle } from "react-icons/fi";
import { required } from "../utils/validators";

interface FormData {
	numeroProjeto: string;
	tituloProjeto: string;
	cpfProfessor: string;
	professor: string;
	unidadeAcademica: string;
	regimeTrabalho: string;
	dedicacaoExclusiva: string;
	situacao: string;
	qtdRemunerados: string;
	qtdVoluntarios: string;
	resumosEid: string;
	justificativaSemResumo: string;
	justificativaResumoInferior: string;
	trabalhosInscritos: string;
	atividadesPrevistas: string;
	atividadesRealizadas: string;
	dificuldades: string;
	avaliacaoInstrumentos: string;
	reflexaoParticipacao: string;
	contribuicoesSugestoes: string;
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
	hint,
	children,
}: {
	label: string;
	span?: number;
	hint?: string;
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

const INITIAL_FORM: FormData = {
	numeroProjeto: "",
	tituloProjeto: "",
	cpfProfessor: "",
	professor: "",
	unidadeAcademica: "",
	regimeTrabalho: "",
	dedicacaoExclusiva: "",
	situacao: "",
	qtdRemunerados: "",
	qtdVoluntarios: "",
	resumosEid: "",
	justificativaSemResumo: "",
	justificativaResumoInferior: "",
	trabalhosInscritos: "",
	atividadesPrevistas: "",
	atividadesRealizadas: "",
	dificuldades: "",
	avaliacaoInstrumentos: "",
	reflexaoParticipacao: "",
	contribuicoesSugestoes: "",
};

export default function RelatorioAnualPage() {
	const [isLoading, setIsLoading] = useState(false);
	const [success, setSuccess] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [validationErrors, setValidationErrors] = useState<string[]>([]);
	const [form, setForm] = useState<FormData>(INITIAL_FORM);

	const set =
		(key: keyof FormData) =>
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
			setForm((current) => ({ ...current, [key]: e.target.value }));

	const handleLimpar = () => {
		setForm(INITIAL_FORM);
		setSuccess(null);
		setError(null);
	};

	const validate = (): boolean => {
		const errors: string[] = [];
		const fields: [string, string][] = [
			[form.numeroProjeto, "Número do Projeto"],
			[form.tituloProjeto, "Título do Projeto"],
			[form.cpfProfessor, "CPF do Professor"],
			[form.professor, "Professor"],
			[form.unidadeAcademica, "Unidade Acadêmica"],
			[form.regimeTrabalho, "Regime de Trabalho"],
			[form.dedicacaoExclusiva, "Dedicação Exclusiva"],
			[form.situacao, "Situação"],
			[form.qtdRemunerados, "Qtd Monitores Remunerados"],
			[form.qtdVoluntarios, "Qtd Monitores Voluntários"],
			[form.resumosEid, "Quantidade de Resumos Inscritos no EID"],
			[form.trabalhosInscritos, "Trabalhos Inscritos no EID"],
			[form.atividadesPrevistas, "Atividades Previstas"],
			[form.atividadesRealizadas, "Atividades Realizadas"],
			[form.dificuldades, "Dificuldades na Execução"],
			[form.avaliacaoInstrumentos, "Avaliação dos Instrumentos"],
			[form.reflexaoParticipacao, "Reflexão sobre a Participação"],
			[form.contribuicoesSugestoes, "Contribuições e Sugestões"],
		];
		for (const [value, label] of fields) {
			const err = required(value, label);
			if (err) errors.push(err);
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
			setSuccess("Relatório anual enviado com sucesso!");
		}, 500);
	};

	return (
		<div style={styles.page}>
			<div style={styles.headerBlock}>
				<h1 style={styles.pageTitle}>RELATÓRIO ANUAL DO PROJETO</h1>
				<p style={styles.pageSubtitle}>
					Formulário inspirado na tela antiga da UFC, reorganizado para o remake do SisPID.
				</p>
			</div>

			<div style={styles.card}>
				<SectionTitle>Dados do projeto</SectionTitle>

				<div style={styles.grid}>
					<Field label="Número do Projeto:" span={1}>
						<input style={styles.input} type="text" placeholder="Ex: PID202619432" value={form.numeroProjeto} onChange={set("numeroProjeto")} />
					</Field>

					<Field label="Título do Projeto:" span={2}>
						<textarea style={styles.textarea} rows={2} placeholder="Digite o título do projeto" value={form.tituloProjeto} onChange={set("tituloProjeto")} />
					</Field>

					<Field label="CPF Professor:" span={1}>
						<input style={styles.input} type="text" placeholder="000.000.000-00" value={form.cpfProfessor} onChange={set("cpfProfessor")} />
					</Field>

					<Field label="Professor:" span={1}>
						<input style={styles.input} type="text" placeholder="Nome completo do professor" value={form.professor} onChange={set("professor")} />
					</Field>

					<Field label="Unidade Acadêmica:" span={1}>
						<input style={styles.input} type="text" placeholder="Ex: Centro de Ciências" value={form.unidadeAcademica} onChange={set("unidadeAcademica")} />
					</Field>

					<Field label="Regime de Trabalho:" span={1}>
						<input style={styles.input} type="text" placeholder="Digite o regime de trabalho" value={form.regimeTrabalho} onChange={set("regimeTrabalho")} />
					</Field>

					<Field label="Dedicação Exclusiva:" span={1}>
						<input style={styles.input} type="text" placeholder="Ex: DEDICAÇÃO EXCLUSIVA" value={form.dedicacaoExclusiva} onChange={set("dedicacaoExclusiva")} />
					</Field>

					<Field label="Situação:" span={1}>
						<input style={styles.input} type="text" placeholder="Ex: Aprovado" value={form.situacao} onChange={set("situacao")} />
					</Field>

					<Field label="Qtd Monitores Remunerados:" span={1}>
						<input style={styles.input} type="text" placeholder="0" value={form.qtdRemunerados} onChange={set("qtdRemunerados")} />
					</Field>

					<Field label="Qtd Monitores Voluntários:" span={1}>
						<input style={styles.input} type="text" placeholder="0" value={form.qtdVoluntarios} onChange={set("qtdVoluntarios")} />
					</Field>
				</div>
			</div>

			<div style={styles.card}>
				<SectionTitle>Informações do relatório</SectionTitle>

				<div style={styles.grid}>
					<Field label="Quantidade de Resumos INSCRITOS no EID 2025:" span={1}>
						<input style={styles.input} type="number" min={0} placeholder="0" value={form.resumosEid} onChange={set("resumosEid")} />
					</Field>

					<Field label="Justificativa dos projetos que receberam vagas e NÃO inscreveram resumos no EID 2025:" span={2}>
						<textarea style={styles.textarea} rows={5} placeholder="Descreva as justificativas..." value={form.justificativaSemResumo} onChange={set("justificativaSemResumo")} />
					</Field>

					<Field label="Justificativa dos projetos que receberam vagas e inscreveram resumos em número INFERIOR ao total de vagas:" span={2}>
						<textarea style={styles.textarea} rows={5} placeholder="Descreva as justificativas..." value={form.justificativaResumoInferior} onChange={set("justificativaResumoInferior")} />
					</Field>

					<Field label="Trabalho(s) inscrito(s) no EID 2025:" span={2}>
						<textarea style={styles.textarea} rows={5} placeholder="Digite os títulos e autores dos trabalhos..." value={form.trabalhosInscritos} onChange={set("trabalhosInscritos")} />
					</Field>

					<Field label="Atividades Previstas:" span={2}>
						<textarea style={styles.textarea} rows={5} placeholder="Descreva as atividades previstas..." value={form.atividadesPrevistas} onChange={set("atividadesPrevistas")} />
					</Field>

					<Field label="Atividades Realizadas:" span={2}>
						<textarea style={styles.textarea} rows={5} placeholder="Descreva as atividades realizadas..." value={form.atividadesRealizadas} onChange={set("atividadesRealizadas")} />
					</Field>

					<Field label="Dificuldade(s) na execução do Projeto:" span={2}>
						<textarea style={styles.textarea} rows={5} placeholder="Descreva as dificuldades encontradas..." value={form.dificuldades} onChange={set("dificuldades")} />
					</Field>

					<Field label="Avaliação dos instrumentos indicados para acompanhamento do Projeto:" span={2}>
						<textarea style={styles.textarea} rows={5} placeholder="Descreva sua avaliação..." value={form.avaliacaoInstrumentos} onChange={set("avaliacaoInstrumentos")} />
					</Field>

					<Field label="Reflexão sobre a participação do(s) monitor(es) do Projeto:" span={2}>
						<textarea style={styles.textarea} rows={5} placeholder="Descreva sua reflexão..." value={form.reflexaoParticipacao} onChange={set("reflexaoParticipacao")} />
					</Field>

					<Field label="Contribuições e sugestões para melhoria do Programa de Iniciação à Docência:" span={2}>
						<textarea style={styles.textarea} rows={5} placeholder="Descreva suas sugestões..." value={form.contribuicoesSugestoes} onChange={set("contribuicoesSugestoes")} />
					</Field>
				</div>

				<div style={styles.actions}>
					<button style={styles.cancelBtn} onClick={handleLimpar}>
						Limpar
					</button>
					<button style={styles.submitBtn} onClick={handleSubmit} disabled={isLoading}>
						{isLoading ? "Enviando..." : "Enviar"}
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
	actions: {
		display: "flex",
		justifyContent: "center",
		gap: 12,
		marginTop: 24,
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