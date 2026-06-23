import { useEffect, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { FiBookOpen, FiCalendar } from "react-icons/fi";

interface StatCard {
	icon: ReactNode;
	iconColor: string;
	label: string;
	description: string;
	delay: number;
	href?: string;
}

const CARDS: StatCard[] = [
	{
		icon: <FiBookOpen />,
		iconColor: "#1a6bb5",
		label: "Manual do Sistema",
		description: "Leia o manual completo do SisPID",
		delay: 500,
		href: "#",
	},
	{
		icon: <FiCalendar />,
		iconColor: "#1a3a5c",
		label: "Cronograma de Frequências",
		description: "Veja o cronograma de envio das frequências mensais",
		delay: 600,
		href: "#",
	},
];

function AnimatedCard({ card }: { card: StatCard }) {
	const [visible, setVisible] = useState(false);
	const [hovered, setHovered] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setVisible(true), card.delay);
		return () => clearTimeout(timer);
	}, [card.delay]);

	const sharedStyles = {
		...styles.card,
		...(card.href ? { ...styles.cardLink, textDecoration: "none" } : {}),
		opacity: visible ? 1 : 0,
		transform: visible
			? hovered
				? "translateY(-6px)"
				: "translateY(0)"
			: "translateY(24px)",
		boxShadow: hovered
			? "0 8px 24px rgba(26,58,92,0.13)"
			: "0 2px 8px rgba(26,58,92,0.06)",
	};

	const content = (
		<>
			<span style={{ ...styles.cardIcon, color: card.iconColor }}>{card.icon}</span>
			<p style={styles.cardLabel}>{card.label}</p>
			<p style={styles.cardDescription}>{card.description}</p>
		</>
	);

	if (card.href) {
		return (
			<a
				href={card.href}
				style={sharedStyles}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
			>
				{content}
			</a>
		);
	}

	return (
		<div
			style={sharedStyles}
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
		>
			{content}
		</div>
	);
}

export default function HomePage() {
	const [titleVisible, setTitleVisible] = useState(false);
	const [subtitleVisible, setSubtitleVisible] = useState(false);
	const [dividerVisible, setDividerVisible] = useState(false);

	useEffect(() => {
		const t1 = setTimeout(() => setTitleVisible(true), 50);
		const t2 = setTimeout(() => setSubtitleVisible(true), 200);
		const t3 = setTimeout(() => setDividerVisible(true), 350);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
			clearTimeout(t3);
		};
	}, []);

	return (
		<div style={styles.page}>
			<div style={styles.hero}>
				<span
					style={{
						...styles.eyebrow,
						opacity: subtitleVisible ? 1 : 0,
						transform: subtitleVisible ? "translateY(0)" : "translateY(-10px)",
					}}
				>
					Pró-Reitoria de Graduação
				</span>

				<h1
					style={{
						...styles.title,
						opacity: titleVisible ? 1 : 0,
						transform: titleVisible ? "translateY(0)" : "translateY(20px)",
					}}
				>
					Bem-vindo ao <span style={styles.titleAccent}>SisPID</span>
				</h1>

				<div
					style={{
						...styles.divider,
						width: dividerVisible ? "80px" : "0px",
					}}
				/>

				<p
					style={{
						...styles.subtitle,
						opacity: subtitleVisible ? 1 : 0,
						transform: subtitleVisible ? "translateY(0)" : "translateY(10px)",
					}}
				>
					Sistema de Cadastro e Acompanhamento de Monitores PID
				</p>
			</div>

			<div style={styles.grid}>
				{CARDS.map((card) => (
					<AnimatedCard key={card.label} card={card} />
				))}
			</div>
		</div>
	);
}

const styles: Record<string, CSSProperties> = {
	page: {
		minHeight: "calc(100vh - 120px)",
		background: "#f0f4f8",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: "64px 24px 48px",
	},
	hero: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		marginBottom: 56,
	},
	eyebrow: {
		fontSize: 12,
		fontWeight: 600,
		letterSpacing: "0.1em",
		textTransform: "uppercase",
		color: "#6b7f94",
		marginBottom: 16,
		transition: "opacity 0.5s ease, transform 0.5s ease",
	},
	title: {
		fontSize: 42,
		fontWeight: 700,
		color: "#1a3a5c",
		margin: 0,
		textAlign: "center",
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
		transition: "opacity 0.6s ease, transform 0.6s ease",
	},
	titleAccent: {
		color: "#1a6bb5",
	},
	divider: {
		height: 3,
		background: "#1a6bb5",
		borderRadius: 2,
		margin: "20px 0",
		transition: "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
	},
	subtitle: {
		fontSize: 16,
		color: "#6b7f94",
		margin: 0,
		textAlign: "center",
		transition: "opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s",
	},
	grid: {
		display: "grid",
		gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
		gap: 20,
		width: "100%",
		maxWidth: 860,
	},
	card: {
		background: "#ffffff",
		border: "0.5px solid #d0dbe8",
		borderRadius: 12,
		padding: "28px 24px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		textAlign: "center",
		cursor: "default",
		transition: "opacity 0.5s ease, transform 0.4s ease, box-shadow 0.25s ease",
	},
	cardIcon: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		width: 56,
		height: 56,
		fontSize: 28,
		marginBottom: 12,
		borderRadius: "50%",
		background: "linear-gradient(180deg, rgba(26,106,181,0.12), rgba(26,58,92,0.08))",
	},
	cardLabel: {
		margin: "0 0 6px",
		fontSize: 15,
		fontWeight: 600,
		color: "#1a3a5c",
	},
	cardDescription: {
		margin: 0,
		fontSize: 13,
		color: "#6b7f94",
		lineHeight: 1.5,
	},
	cardLink: {
		cursor: "pointer",
		color: "inherit",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		textAlign: "center",
	},
};
