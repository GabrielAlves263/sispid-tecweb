import { http, HttpResponse } from "msw";

export const crudHandlers = [
  http.post("/api/monitores/voluntario", async () => {
    return HttpResponse.json({ message: "Monitor voluntário inserido com sucesso", id: crypto.randomUUID() }, { status: 201 });
  }),

  http.post("/api/monitores/remunerado", async () => {
    return HttpResponse.json({ message: "Monitor remunerado inserido com sucesso", id: crypto.randomUUID() }, { status: 201 });
  }),

  http.get("/api/monitores/:matricula", async ({ params }) => {
    const { matricula } = params;
    return HttpResponse.json({
      id: crypto.randomUUID(),
      matricula,
      nome: "João Silva",
      periodoInicio: "2024-01-01",
      periodoFim: "2024-12-31",
      nrEdital: "001/2024",
      dataNascimento: "2000-05-15",
      curso: "Ciência da Computação",
      codigoCurso: "CK0196",
      email: "joao.silva@email.com",
      telefone: "(85) 99999-9999",
      rg: "00.000.000-0",
      cpf: "000.000.000-00",
      rua: "Rua A",
      numero: "100",
      complemento: "Apto 201",
      bairro: "Centro",
      cidade: "Fortaleza",
      estado: "CE",
      cep: "60000-000",
      atividades: "Atividades de monitoria",
      nomeBanco: "Banco do Brasil",
      agencia: "0001",
      numeroConta: "12345-6",
    });
  }),

  http.put("/api/monitores/voluntario/:id", async () => {
    return HttpResponse.json({ message: "Monitor voluntário atualizado com sucesso" });
  }),

  http.put("/api/monitores/remunerado/:id", async () => {
    return HttpResponse.json({ message: "Monitor remunerado atualizado com sucesso" });
  }),

  http.post("/api/disciplinas", async () => {
    return HttpResponse.json({ message: "Disciplina inserida com sucesso", id: crypto.randomUUID() }, { status: 201 });
  }),

  http.post("/api/orientadores", async () => {
    return HttpResponse.json({ message: "Orientador inserido com sucesso", id: crypto.randomUUID() }, { status: 201 });
  }),

  http.post("/api/frequencias", async () => {
    return HttpResponse.json({ message: "Frequência inserida com sucesso", id: crypto.randomUUID() }, { status: 201 });
  }),

  http.post("/api/desligamentos", async () => {
    return HttpResponse.json({ message: "Desligamento registrado com sucesso", id: crypto.randomUUID() }, { status: 201 });
  }),
];
