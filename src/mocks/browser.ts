import { setupWorker } from "msw/browser"
import { authHandlers } from "./auth"
import { crudHandlers } from "./crud"

export const worker = setupWorker(...authHandlers, ...crudHandlers)
