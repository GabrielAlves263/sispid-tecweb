import { Outlet, useNavigate } from "react-router-dom";
import SisPIDHeader from "./Header";
import SisPIDFooter from "./Footer";

const ACTION_ROUTES: Record<string, string> = {
	"inserir-voluntario": "/ins-mon-vol",
	"inserir-disciplina": "/ins-disciplina",
	"inserir-orientador": "/ins-orientador",
	"dados-projeto": "/",
	"desligamento-monitor": "/desligamento-monitor",
	"frequencia-monitor": "/frequencia-monitor",
};

export function Layout() {
	const navigate = useNavigate();

	const handleAction = (action: string) => {
		const route = ACTION_ROUTES[action];
		if (route) {
			navigate(route);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	const handleHelp = () => {
		alert("Ajuda - Em desenvolvimento");
	};

	const handleInfo = () => {
		alert("Informações do sistema - Em desenvolvimento");
	};

	return (
		<>
			<SisPIDHeader
				onAction={handleAction}
				onHelp={handleHelp}
				onInfo={handleInfo}
				onLogout={handleLogout}
			/>
			<main>
				<Outlet />
			</main>
			<SisPIDFooter />
		</>
	);
}
