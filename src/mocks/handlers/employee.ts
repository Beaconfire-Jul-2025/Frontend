// msw.js
import { http, HttpResponse } from "msw";
import { roommatePayload } from "@/mocks/payloads/employee/roommate.ts";
import { visaPayload } from "@/mocks/payloads/employee/visa.ts";
import { applicationPayload } from "@/mocks/payloads/employee/application.ts";
import { profilePayload } from "@/mocks/payloads/employee/profile.ts";
import { employeeBasicInfoPayload } from "@/mocks/payloads/employee/basicInfo.ts";

export const employeeHandlers = [
  // Single employee
  http.get("/api/employee/profile", () =>
    HttpResponse.json(employeeBasicInfoPayload),
  ),

  // Avatar endpoint (unchanged)
  http.get("/api/employee/avatar", () =>
    HttpResponse.json({
      avatarPath: "https://i.pravatar.cc/100?img=3",
    }),
  ),

  http.get("/api/employee", ({ request }) => {
    const url = new URL(request.url);
    const view = url.searchParams.get("view") as keyof typeof viewMap;
    const page = Number(url.searchParams.get("page") ?? 1);
    const pageSize = Number(url.searchParams.get("pageSize") ?? 10);

    const payload = viewMap[view] ?? [];
    const total = payload.length;
    const start = (page - 1) * pageSize;
    const slice = payload.slice(start, start + pageSize);

    return HttpResponse.json({
      data: slice,
      total,
      success: true,
    });
  }),
];

let employeeListPayload;
const viewMap = {
  roommate: roommatePayload,
  visa: visaPayload,
  application: applicationPayload,
  hiring: applicationPayload, // same as application
  profile: profilePayload,
};
