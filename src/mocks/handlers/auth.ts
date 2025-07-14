import { http, HttpResponse } from "msw";

export const authHandlers = [
  http.post("/auth/login", async ({ request }) => {
    const { username } = await request.json();

    let role = "ROLE_EMPLOYEE";
    if (username === "hr") {
      role = "ROLE_HR";
    }

    return HttpResponse.json({
      token: "mock-jwt-token",
      user: { id: 2, email: `${username}@test.com`, role: role },
    });
  }),
];
