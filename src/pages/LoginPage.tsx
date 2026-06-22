import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import { login } from "../services/authService";

export default function LoginPage() {
	const navigate = useNavigate();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		try {
			const response = await login({ username, password });
			localStorage.setItem("token", response.token);
			navigate("/");
		} catch (err) {
			setError(err instanceof Error ? err.message : "Erro ao fazer login");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-page-bg p-4">
			<div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-card">
				<header className="mb-8 flex flex-col items-center text-center">
					<img
						src="/logo-ufc.png"
						alt="Brasão da Universidade Federal do Ceará"
						className="mb-4 h-16 object-contain"
					/>
					<h1 className="text-xl font-medium text-gray-800">
						Universidade Federal do Ceará
					</h1>
					<h2 className="mt-2 text-xs font-medium text-gray-500">
						SisPID - Sistema de Cadastro e Acompanhamento de
						<br />
						Monitores PID
					</h2>
				</header>

				<form onSubmit={handleLogin} className="flex flex-col gap-5">
					<InputField
						id="username"
						label="Usuário sigaa:"
						type="text"
						placeholder="Digite seu usuário SIGAA"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						autoComplete="username"
						required
					/>

					<InputField
						id="password"
						label="Senha sigaa:"
						type="password"
						placeholder="Digite sua senha"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						autoComplete="current-password"
						required
					/>

					{error && (
						<div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
							{error}
						</div>
					)}

					<button
						type="submit"
						disabled={isLoading}
						className="mt-2 w-full rounded-lg bg-button-primary py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
					>
						{isLoading ? "Entrando..." : "Entrar"}
					</button>
				</form>

				<footer className="mt-8 border-t border-gray-100 pt-6 text-center">
					<p className="text-xs font-medium text-gray-400">
						Pró-Reitoria de Graduação - T.I
					</p>
				</footer>
			</div>
		</main>
	);
}
