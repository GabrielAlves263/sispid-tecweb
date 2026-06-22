export interface MonitorVoluntarioRequest {
  periodoInicio: string
  periodoFim: string
  nrEdital: string
  nome: string
  matricula: string
  dataNascimento: string
  curso: string
  codigoCurso: string
  email: string
  telefone: string
  rg: string
  cpf: string
  rua: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  cep: string
  atividades: string
}

export interface MonitorRemuneradoRequest extends MonitorVoluntarioRequest {
  nomeBanco: string
  agencia: string
  numeroConta: string
}
