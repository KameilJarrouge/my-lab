import { getVisits } from "@/app/_controllers/visitController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request, { params }) {
  const result = await getVisits(
    request.nextUrl.searchParams.get("patientId"),
    request.nextUrl.searchParams.get("isByTest"),
    request.nextUrl.searchParams.get("byId"),
    request.nextUrl.searchParams.get("doctorId"),
    request.nextUrl.searchParams.get("startDate"),
    request.nextUrl.searchParams.get("endDate"),
    request.nextUrl.searchParams.get("orderByDateDirection"),
    request.nextUrl.searchParams.get("page")
  );
  if (result.success) {
    return successResponse(result.returned);
  }
  return errorResponse(result.errorCode);
}
