import { http, HttpResponse } from "msw";
import { housingPayload } from "../payloads/housingPayload";

export const housingHandlers = [
  // GET /api/housing/current
  http.get("/api/housing/current", () => {
    return HttpResponse.json(housingPayload);
  }),
];
