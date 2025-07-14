// msw.js
import { http, HttpResponse } from "msw";
import { employeePayload } from "@/mocks/payloads/employeePayload.ts";

export const employeeHandlers = [
  // Single employee
  http.get("/api/employee", () => HttpResponse.json(employeePayload)),

  // Avatar endpoint (unchanged)
  http.get("/api/employee/avatar", () =>
    HttpResponse.json({
      avatarPath: "https://i.pravatar.cc/100?img=3",
    }),
  ),
];
