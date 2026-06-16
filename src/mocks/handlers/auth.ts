import { http, HttpResponse } from "msw"
import type { LoginRequest } from "../../types/user"
import { mockUsers } from "../data/users"

export const authHandlers = [
  http.post<never, LoginRequest>("/api/auth/login", async ({ request }) => {
    const { username, password } = await request.json()

    const user = mockUsers.find((u) => u.matricula === username)

    if (!user || password !== user.password) {
      return HttpResponse.json(
        { message: "Credenciais inválidas" },
        { status: 401 },
      )
    }

    return HttpResponse.json({ token: `mock-token-${user.id}`, user })
  }),
]
