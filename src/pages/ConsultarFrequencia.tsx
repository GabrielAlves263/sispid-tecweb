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
		<div style={styles.container}>
			<h1 style={styles.title}>CONSULTAR FREQUÊNCIA</h1>
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
	);
}

const styles: Record<string, React.CSSProperties> = {
	container: {
		maxWidth: 1200,
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
