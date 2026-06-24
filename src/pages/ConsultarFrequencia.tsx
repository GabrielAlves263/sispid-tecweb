import type { CSSProperties } from "react";
import { FiTrash2 } from "react-icons/fi";

interface Frequencia {
	id: string;
	monitor: string;
	disciplina: string;
	mes: string;
	presencas: number;
	faltas: number;
	dataCadastro: string;
}

function ConsultarFrequenciaPage() {
	const frequencias: Frequencia[] = [
		{
			id: "1",
			monitor: "André Lucas Modesto Soares",
			disciplina: "CONTROLE DE SISTEMAS DINÂMICOS",
			mes: "Abril 2026",
			presencas: 8,
			faltas: 0,
			dataCadastro: "22/04/2026",
		},
		{
			id: "2",
			monitor: "Maria Silva Santos",
			disciplina: "ANÁLISE DE SISTEMAS",
			mes: "Março 2026",
			presencas: 7,
			faltas: 1,
			dataCadastro: "15/04/2026",
		},
	];

	return (
		<div style={styles.page}>
			<div style={styles.headerBlock}>
				<h1 style={styles.pageTitle}>CONSULTAR FREQUÊNCIA</h1>
				<p style={styles.pageSubtitle}>
					Consulte os registros de frequência cadastrados no sistema.
				</p>
			</div>
			<div style={styles.card}>
				<div style={styles.tableWrapper}>
					<table style={styles.table}>
						<thead>
							<tr style={styles.headerRow}>
								<th style={styles.headerCell}>Monitor</th>
								<th style={styles.headerCell}>Disciplina</th>
								<th style={styles.headerCell}>Mês</th>
								<th style={styles.headerCell}>Presenças</th>
								<th style={styles.headerCell}>Faltas</th>
								<th style={styles.headerCell}>Data Cadastro</th>
								<th style={styles.headerCell}>Ações</th>
							</tr>
						</thead>
						<tbody>
							{frequencias.map((freq, index) => (
								<tr key={freq.id} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
									<td style={styles.cell}>{freq.monitor}</td>
									<td style={styles.cell}>{freq.disciplina}</td>
									<td style={styles.cell}>{freq.mes}</td>
									<td style={styles.cell}>{freq.presencas}</td>
									<td style={styles.cell}>{freq.faltas}</td>
									<td style={styles.cell}>{freq.dataCadastro}</td>
									<td style={styles.cellAction}>
										<button style={styles.deleteButton}>
											<FiTrash2 size={16} />
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
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
	tableWrapper: {
		overflowX: "auto",
	},
	table: {
		width: "100%",
		borderCollapse: "collapse",
		backgroundColor: "#ffffff",
	},
	headerRow: {
		backgroundColor: "#1a3a5c",
		color: "#ffffff",
	},
	headerCell: {
		padding: 12,
		textAlign: "left",
		fontSize: 13,
		fontWeight: 600,
		borderBottom: "2px solid #1a3a5c",
	},
	rowEven: {
		backgroundColor: "#f8fafc",
	},
	rowOdd: {
		backgroundColor: "#ffffff",
	},
	cell: {
		padding: 12,
		fontSize: 13,
		color: "#1a3a5c",
		borderBottom: "1px solid #d0dbe8",
	},
	cellAction: {
		padding: 12,
		textAlign: "center",
		borderBottom: "1px solid #d0dbe8",
	},
	deleteButton: {
		backgroundColor: "transparent",
		border: "none",
		color: "#b45309",
		cursor: "pointer",
		padding: 4,
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		transition: "color 0.2s",
	},
};

export default ConsultarFrequenciaPage;
