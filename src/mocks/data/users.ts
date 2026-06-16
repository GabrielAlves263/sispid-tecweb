import type { User } from "../../types/user"

export const mockUsers: User[] = [
  {
    id: "1",
    nome: "Admin",
    email: "admin@ufc.br",
    matricula: "admin",
    password: "123",
    tipo: "admin",
  },
  {
    id: "2",
    nome: "Danilo Fernandes",
    email: "danilo@ufc.br",
    matricula: "danilo",
    password: "123",
    tipo: "professor",
  },
]
