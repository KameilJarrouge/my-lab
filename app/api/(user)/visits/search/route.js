import { searchVisits } from "@/app/_controllers/visitController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request, { params }) {
  const result = await searchVisits(
    request.nextUrl.searchParams.get("startDate"),
    request.nextUrl.searchParams.get("endDate"),
    request.nextUrl.searchParams.get("orderByDateDirection")
    // request.nextUrl.searchParams.get("page")
  );
  if (result.success) {
    return successResponse(result.returned);
  }
  return errorResponse(result.errorCode);
}
