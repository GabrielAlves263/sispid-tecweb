import { http, HttpResponse } from "msw";

export const crudHandlers = [
  http.post("/api/monitores/voluntario", async () => {
    return HttpResponse.json({ message: "Monitor voluntário inserido com sucesso", id: crypto.randomUUID() }, { status: 201 });
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
