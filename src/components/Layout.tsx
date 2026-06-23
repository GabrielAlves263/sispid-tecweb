import { Outlet, useNavigate } from "react-router-dom";
import SisPIDHeader from "./Header";
import SisPIDFooter from "./Footer";
import { useAuth } from "../contexts/AuthContext";

const ACTION_ROUTES: Record<string, string> = {
	"dados-projeto": "/dados-projeto",
	"inserir-remunerado": "/ins-mon-rem",
	"inserir-voluntario": "/ins-mon-vol",
	"atualizar-remunerado": "/atualizar-mon-rem",
	"atualizar-voluntario": "/atualizar-mon-vol",
	"inserir-disciplina": "/ins-disciplina",
	"inserir-orientador": "/ins-orientador",
	"autorizacao-acumulo": "/autorizacao-acumulo",
	"desligamento-monitor": "/desligamento-monitor",
	"frequencia-monitor": "/frequencia-monitor",
};

export function Layout() {
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	const handleAction = (action: string) => {
		const route = ACTION_ROUTES[action];
		if (route) {
			navigate(route);
		}
	};

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	const handleInfo = () => {
		navigate("/")
	};

	return (
		<>
			<SisPIDHeader
				userName={user?.nome}
				onAction={handleAction}
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
