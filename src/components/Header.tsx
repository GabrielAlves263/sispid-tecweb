import { useState, useRef, useEffect } from "react";
import type { CSSProperties } from "react";

interface DropdownItem {
	label: string;
	action: string;
	highlight?: boolean;
}

interface DropdownGroup {
	section: string | null;
	items: DropdownItem[];
}

interface NavItemConfig {
	label: string;
	icon: string;
	action?: string;
	dropdown?: DropdownGroup[];
}

interface SisPIDHeaderProps {
	projectId?: string;
	userName?: string;
	onAction?: (action: string) => void;
	onHelp?: () => void;
	onInfo?: () => void;
	onLogout?: () => void;
}

const NAV_ITEMS: NavItemConfig[] = [
	{
		label: "Dados do projeto",
		icon: "📄",
		action: "dados-projeto",
	},
	{
		label: "Monitores",
		icon: "👤",
		dropdown: [
			{
				section: "Remunerado",
				items: [
					{
						label: "Inserir monitor remunerado",
						action: "inserir-remunerado",
						highlight: true,
					},
					{ label: "Atualizar monitor remunerado", action: "atualizar-remunerado" },
				],
			},
			{
				section: "Voluntário",
				items: [
					{
						label: "Inserir monitor voluntário",
						action: "inserir-voluntario",
						highlight: true,
					},
					{ label: "Atualizar monitor voluntário", action: "atualizar-voluntario" },
				],
			},
		],
	},
	{ label: "Inserir disciplina", icon: "📚", action: "inserir-disciplina" },
	{ label: "Inserir orientador", icon: "🎓", action: "inserir-orientador" },
	{
		label: "Cadastrar",
		icon: "📝",
		dropdown: [
			{
				section: null,
				items: [
					{ label: "Opção de cadastro 1", action: "cadastrar-1" },
					{ label: "Opção de cadastro 2", action: "cadastrar-2" },
				],
			},
		],
	},
	{
		label: "Consultar",
		icon: "🔍",
		dropdown: [
			{
				section: null,
				items: [
					{ label: "Consulta 1", action: "consultar-1" },
					{ label: "Consulta 2", action: "consultar-2" },
				],
			},
		],
	},
];

interface DropdownProps {
	groups: DropdownGroup[];
	onSelect?: (action: string) => void;
}

function Dropdown({ groups, onSelect }: DropdownProps) {
	return (
		<div style={styles.dropdown}>
			{groups.map((group, gi) => (
				<div key={gi}>
					{gi > 0 && <div style={styles.dropdownDivider} />}
					{group.section && <div style={styles.dropdownLabel}>{group.section}</div>}
					{group.items.map((item) => (
						<button
							key={item.action}
							style={{
								...styles.dropdownItem,
								...(item.highlight ? styles.dropdownItemHighlight : {}),
							}}
							onClick={() => onSelect?.(item.action)}
							onMouseEnter={(e) => {
								e.currentTarget.style.background = item.highlight
									? "#e6f1fb"
									: "#f0f4f8";
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.background = "transparent";
							}}
						>
							{item.highlight && (
								<span style={{ marginRight: 6, fontSize: 12 }}>＋</span>
							)}
							{item.label}
						</button>
					))}
				</div>
			))}
		</div>
	);
}

interface NavItemProps {
	item: NavItemConfig;
	onSelect?: (action: string) => void;
}

function NavItem({ item, onSelect }: NavItemProps) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const hasDropdown = !!item.dropdown;

	return (
		<div ref={ref} style={styles.navItem}>
			<button
				style={{ ...styles.navBtn, ...(open ? styles.navBtnActive : {}) }}
				onClick={() =>
					hasDropdown ? setOpen((v) => !v) : onSelect?.(item.action ?? "")
				}
				onMouseEnter={(e) => {
					if (!open) e.currentTarget.style.background = "#f0f4f8";
				}}
				onMouseLeave={(e) => {
					if (!open) e.currentTarget.style.background = "transparent";
				}}
			>
				<span style={{ fontSize: 15 }}>{item.icon}</span>
				{item.label}
				{hasDropdown && (
					<span
						style={{
							...styles.chevron,
							transform: open ? "rotate(180deg)" : "rotate(0deg)",
						}}
					>
						▾
					</span>
				)}
			</button>

			{hasDropdown && open && (
				<Dropdown
					groups={item.dropdown!}
					onSelect={(action) => {
						setOpen(false);
						onSelect?.(action);
					}}
				/>
			)}
		</div>
	);
}

export default function SisPIDHeader({
	projectId = "PID202619432",
	userName,
	onAction,
	onHelp,
	onInfo,
	onLogout,
}: SisPIDHeaderProps) {
	return (
		<header style={styles.root}>
			{/* Top bar */}
			<div style={styles.topBar}>
				<div style={styles.topBarTitle}>
					<span style={styles.topBarSubtitle}>Pró-Reitoria de Graduação</span>
					<span style={styles.topBarMain}>
						SisPID — Sistema de Cadastro e Acompanhamento de Monitores
					</span>
				</div>
				<div style={styles.topBarActions}>
					{userName && (
						<span style={styles.userName}>👤 {userName}</span>
					)}
					<button style={styles.topBarBtn} onClick={onHelp}>
						❓ Ajuda
					</button>
					<button style={styles.topBarBtn} onClick={onInfo}>
						ℹ️ Informações
					</button>
					<button
						style={{ ...styles.topBarBtn, color: "#f08080" }}
						onClick={onLogout}
					>
						🚪 Sair
					</button>
				</div>
			</div>

			{/* Project bar */}
			<div style={styles.projectBar}>
				<span style={styles.projectLabel}>Projeto ativo</span>
				<span style={styles.projectBadge}>📁 {projectId}</span>
			</div>

			{/* Nav bar */}
			<nav style={styles.navBar} aria-label="Navegação principal">
				<div style={styles.navLeft}>
					{NAV_ITEMS.map((item) => (
						<NavItem key={item.label} item={item} onSelect={onAction} />
					))}
				</div>

				<div style={styles.navRight}>
					<button
						style={{ ...styles.navBtn, color: "#1a6bb5" }}
						onClick={() => onAction?.("imprimir-comprovantes")}
						onMouseEnter={(e) => (e.currentTarget.style.background = "#e6f1fb")}
						onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
					>
						🖨️ Imprimir comprovantes ▾
					</button>
				</div>
			</nav>
		</header>
	);
}

const styles: Record<string, CSSProperties> = {
	root: {
		fontFamily:
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
		width: "100%",
		boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
	},

	// Top bar
	topBar: {
		background: "#1a3a5c",
		padding: "12px 24px",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
	},
	topBarTitle: {
		display: "flex",
		flexDirection: "column",
		gap: 2,
	},
	topBarSubtitle: {
		fontSize: 11,
		fontWeight: 500,
		color: "rgba(255,255,255,0.55)",
		letterSpacing: "0.07em",
		textTransform: "uppercase",
	},
	topBarMain: {
		fontSize: 15,
		fontWeight: 500,
		color: "#fff",
	},
	topBarActions: {
		display: "flex",
		alignItems: "center",
		gap: 12,
	},
	userName: {
		fontSize: 13,
		color: "rgba(255,255,255,0.85)",
		padding: "4px 12px",
		fontWeight: 500,
	},
	topBarBtn: {
		background: "none",
		border: "none",
		cursor: "pointer",
		fontSize: 13,
		color: "rgba(255,255,255,0.7)",
		padding: "4px 8px",
		borderRadius: 6,
		transition: "color 0.15s",
	},

	// Project bar
	projectBar: {
		background: "#f0f4f8",
		borderBottom: "0.5px solid #d0dbe8",
		padding: "7px 24px",
		display: "flex",
		alignItems: "center",
		gap: 8,
	},
	projectLabel: {
		fontSize: 12,
		color: "#6b7f94",
		fontWeight: 500,
	},
	projectBadge: {
		fontSize: 12,
		fontWeight: 600,
		color: "#1a3a5c",
		background: "#d6e6f5",
		padding: "3px 10px",
		borderRadius: 20,
	},

	// Nav bar
	navBar: {
		background: "#fff",
		borderBottom: "0.5px solid #d0dbe8",
		padding: "0 16px",
		display: "flex",
		alignItems: "stretch",
		justifyContent: "space-between",
	},
	navLeft: {
		display: "flex",
		alignItems: "stretch",
		gap: 2,
	},
	navRight: {
		display: "flex",
		alignItems: "center",
	},
	navItem: {
		position: "relative",
		display: "flex",
		alignItems: "stretch",
	},
	navBtn: {
		display: "flex",
		alignItems: "center",
		gap: 6,
		padding: "0 14px",
		height: 46,
		fontSize: 13,
		fontWeight: 500,
		color: "#3d5570",
		background: "transparent",
		border: "none",
		cursor: "pointer",
		whiteSpace: "nowrap",
		borderRadius: 0,
		transition: "background 0.15s, color 0.15s",
	},
	navBtnActive: {
		background: "#f0f4f8",
		color: "#1a3a5c",
	},
	chevron: {
		fontSize: 11,
		opacity: 0.6,
		transition: "transform 0.2s",
		display: "inline-block",
	},

	// Dropdown
	dropdown: {
		position: "absolute",
		top: "100%",
		left: 0,
		background: "#fff",
		border: "0.5px solid #d0dbe8",
		borderRadius: 8,
		boxShadow: "0 4px 16px rgba(26,58,92,0.1)",
		minWidth: 230,
		zIndex: 100,
		overflow: "hidden",
		paddingTop: 6,
		paddingBottom: 6,
	},
	dropdownLabel: {
		fontSize: 10,
		fontWeight: 600,
		color: "#8a9db5",
		letterSpacing: "0.08em",
		textTransform: "uppercase",
		padding: "8px 14px 4px",
	},
	dropdownItem: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		padding: "9px 14px",
		fontSize: 13,
		color: "#3d5570",
		background: "transparent",
		border: "none",
		cursor: "pointer",
		textAlign: "left",
		transition: "background 0.1s",
	},
	dropdownItemHighlight: {
		color: "#1a6bb5",
		fontWeight: 500,
	},
	dropdownDivider: {
		height: 0.5,
		background: "#d0dbe8",
		margin: "4px 0",
	},
};
