export default function SisPIDFooter() {
	const year = new Date().getFullYear();

	return (
		<footer style={styles.root}>
			<div style={styles.container}>
				<p style={styles.course}>
					Desenvolvido para a disciplina de Tecnologias Web
				</p>
				<p style={styles.team}>
					© {year} Equipe Web Fofinhos — Todos os direitos reservados
				</p>
			</div>
		</footer>
	);
}

import type { CSSProperties } from "react";

const styles: Record<string, CSSProperties> = {
	root: {
		background: "#1a3a5c",
		borderTop: "0.5px solid #d0dbe8",
		padding: "20px 24px",
		marginTop: "auto",
	},
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		gap: 4,
	},
	course: {
		margin: 0,
		fontSize: 13,
		color: "rgba(255,255,255,0.55)",
	},
	team: {
		margin: 0,
		fontSize: 12,
		color: "rgba(255,255,255,0.35)",
	},
};
