import { FiTrash2 } from "react-icons/fi";

interface Monitor {
	id: string;
	nome: string;
	cpf: string;
	email: string;
	tipo: string;
	dataCadastro: string;
}

function ConsultarMonitorPage() {
	const monitors: Monitor[] = [
		{
			id: "1",
			nome: "André Lucas Modesto Soares",
			cpf: "123.456.789-00",
			email: "andre@ufc.br",
			tipo: "Remunerado",
			dataCadastro: "22/04/2026",
		},
		{
			id: "2",
			nome: "Maria Silva Santos",
			cpf: "987.654.321-00",
			email: "maria@ufc.br",
			tipo: "Voluntário",
			dataCadastro: "15/04/2026",
		},
	];

	return (
		<div style={styles.container}>
			<h1 style={styles.title}>CONSULTAR MONITOR</h1>
			<div style={styles.tableWrapper}>
				<table style={styles.table}>
					<thead>
						<tr style={styles.headerRow}>
							<th style={styles.headerCell}>Nome</th>
							<th style={styles.headerCell}>CPF</th>
							<th style={styles.headerCell}>Email</th>
							<th style={styles.headerCell}>Tipo</th>
							<th style={styles.headerCell}>Data Cadastro</th>
							<th style={styles.headerCell}>Ações</th>
						</tr>
					</thead>
					<tbody>
						{monitors.map((monitor, index) => (
							<tr key={monitor.id} style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}>
								<td style={styles.cell}>{monitor.nome}</td>
								<td style={styles.cell}>{monitor.cpf}</td>
								<td style={styles.cell}>{monitor.email}</td>
								<td style={styles.cell}>{monitor.tipo}</td>
								<td style={styles.cell}>{monitor.dataCadastro}</td>
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

export default ConsultarMonitorPage;
