import { getLastVisitTest } from "@/app/_controllers/visitTestController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";

import { NextRequest } from "next/server";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  let result = await getLastVisitTest(
    Number(request.nextUrl.searchParams.get("testId")),
    Number(request.nextUrl.searchParams.get("patientId")),
    new Date(request.nextUrl.searchParams.get("dateInQuestion"))
  );
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
