import { NextRequest } from "next/server";

import { updateArbitrary } from "@/app/_controllers/arbitraryController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function PUT(request, { params }) {
  const body = await request.json();
  let result = await updateArbitrary(body);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
