import { getMultipleLastVisitTest } from "@/app/_controllers/visitTestController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";

import { NextRequest } from "next/server";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  let body = await request.json();

  let result = await getMultipleLastVisitTest(body);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
