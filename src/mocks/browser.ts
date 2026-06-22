import { setupWorker } from "msw/browser"
import { authHandlers } from "./data/auth"
import { crudHandlers } from "./data/crud"

export const worker = setupWorker(...authHandlers, ...crudHandlers)
