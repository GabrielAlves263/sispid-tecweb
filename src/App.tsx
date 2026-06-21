import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Home";
import InserirMonitorVoluntarioPage from "./pages/InserirMonitorVoluntario";

export default function App() {
	return (
		<Routes>
			<Route path="/login" element={<LoginPage />} />
			<Route element={<Layout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/ins-mon-vol" element={<InserirMonitorVoluntarioPage />} />
			</Route>
		</Routes>
	);
}
