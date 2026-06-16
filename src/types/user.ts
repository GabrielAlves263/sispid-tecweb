export interface User {
  id: string
  nome: string
  email: string
  matricula: string
  password: string
  tipo: "admin" | "professor" | "aluno"
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  user: User
}
