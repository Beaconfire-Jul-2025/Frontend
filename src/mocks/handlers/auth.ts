import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post("/auth/login", () =>
    HttpResponse.json({
      token: "mock-jwt-token",
      user: { id: 2, email: "user1@test.com", role: "ROLE_EMPLOYEE" },
    }),
  ),
];
