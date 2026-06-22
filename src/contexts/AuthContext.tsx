import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { User } from "../types/user";
import { login as loginService } from "../services/authService";

interface AuthContextType {
	user: User | null;
	isAuthenticated: boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<User | null>(() => {
		const stored = localStorage.getItem("user");
		return stored ? JSON.parse(stored) : null;
	});

	const login = useCallback(async (username: string, password: string) => {
		const response = await loginService({ username, password });
		localStorage.setItem("token", response.token);
		localStorage.setItem("user", JSON.stringify(response.user));
		setUser(response.user);
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
	}, []);

	return (
		<AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
	return ctx;
}
