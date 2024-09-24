import { searchPatients } from "@/app/_controllers/patientController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";

import { NextRequest } from "next/server";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  const result = await searchPatients(
    request.nextUrl.searchParams.get("searchKey")
  );
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
