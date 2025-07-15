import { authHandlers } from "./auth";
import { employeeHandlers } from "./employee";
import { housingHandlers } from "./housing";

export const handlers = [
  ...authHandlers,
  ...employeeHandlers,
  ...housingHandlers,
];
