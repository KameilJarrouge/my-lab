import { getAllArbitrary } from "@/app/_controllers/arbitraryController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request, { params }) {
  const result = await getAllArbitrary();
  if (result.success) {
    return successResponse(result.returned);
  }
  return errorResponse(result.errorCode);
}
