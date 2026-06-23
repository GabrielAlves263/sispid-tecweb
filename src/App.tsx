import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Home";
import InserirMonitorVoluntarioPage from "./pages/InserirMonitorVoluntario";
import InserirDisciplinaPage from "./pages/InserirDisciplina";
import InserirOrientadorPage from "./pages/InserirOrientador";
import DesligamentoMonitorPage from "./pages/DesligamentoMonitor";
import FrequenciaMensal from "./pages/FrequenciaMonitor";
import DadosProjetoPage from "./pages/DadosProjeto";
import InserirMonitorRemuneradoPage from "./pages/InserirMonitorRemunerado";
import AtualizarMonitorVoluntarioPage from "./pages/AtualizarMonitorVoluntario";
import AtualizarMonitorRemuneradoPage from "./pages/AtualizarMonitorRemunerado";
import AutorizacaoAcumuloPage from "./pages/AutorizacaoAcumulo";

export default function App() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route element={<ProtectedRoute />}>
				<Route element={<Layout />}>
					<Route path="/" element={<HomePage />} />
					<Route path="/dados-projeto" element={<DadosProjetoPage />} />
					<Route path="/ins-mon-vol" element={<InserirMonitorVoluntarioPage />} />
					<Route path="/ins-mon-rem" element={<InserirMonitorRemuneradoPage />} />
					<Route path="/atualizar-mon-vol" element={<AtualizarMonitorVoluntarioPage />} />
					<Route path="/atualizar-mon-rem" element={<AtualizarMonitorRemuneradoPage />} />
					<Route path="/ins-disciplina" element={<InserirDisciplinaPage />} />
					<Route path="/ins-orientador" element={<InserirOrientadorPage />} />
					<Route path="/autorizacao-acumulo" element={<AutorizacaoAcumuloPage />} />
					<Route path="/desligamento-monitor" element={<DesligamentoMonitorPage />} />
					<Route path="/frequencia-monitor" element={<FrequenciaMensal />} />
				</Route>
			</Route>
		</Routes>
	);
}
