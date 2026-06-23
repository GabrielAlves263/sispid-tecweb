import { FiTrash2 } from "react-icons/fi";

interface RelatorioMonitor {
	id: string;
	monitor: string;
	conceito: string;
	arquivo: string;
	dataCadastro: string;
}

function ConsultarRelatorioMonitorPage() {
	const relatorios: RelatorioMonitor[] = [
		{
			id: "1",
			monitor: "André Lucas Modesto Soares",
			conceito: "A",
			arquivo: "relatorio_andre.pdf",
			dataCadastro: "22/04/2026",
		},
		{
			id: "2",
			monitor: "Maria Silva Santos",
			conceito: "B",
			arquivo: "relatorio_maria.pdf",
			dataCadastro: "15/04/2026",
		},
	];

	return (
		<div style={styles.container}>
			<h1 style={styles.title}>CONSULTAR RELATÓRIO DO MONITOR</h1>
			<div style={styles.tableWrapper}>
				<table style={styles.table}>
					<thead>
						<tr style={styles.headerRow}>
							<th style={styles.headerCell}>Monitor</th>
							<th style={styles.headerCell}>Conceito</th>
							<th style={styles.headerCell}>Arquivo</th>
							<th style={styles.headerCell}>Data Cadastro</th>
							<th style={styles.headerCell}>Ações</th>
						</tr>
					</thead>
					<tbody>
						{relatorios.map((rel, index) => (
							<tr key={rel.id} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
								<td style={styles.cell}>{rel.monitor}</td>
								<td style={styles.cell}>
									<span style={{
										...styles.badge,
										backgroundColor: "#dbeafe",
										color: "#1e40af",
									}}>
										{rel.conceito}
									</span>
								</td>
								<td style={styles.cell}>{rel.arquivo}</td>
								<td style={styles.cell}>{rel.dataCadastro}</td>
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
	badge: {
		display: "inline-block",
		padding: "4px 8px",
		borderRadius: 4,
		fontSize: 12,
		fontWeight: 600,
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

export default ConsultarRelatorioMonitorPage;
