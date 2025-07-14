import { authHandlers } from "./auth";
import { employeeHandlers } from "./employee";

export const handlers = [...authHandlers, ...employeeHandlers];
