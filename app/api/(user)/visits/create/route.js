import { NextRequest } from "next/server";
import { createVisit } from "@/app/_controllers/visitController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  let body = await request.json();
  const result = await createVisit(body);
  if (result.success) {
    return successResponse(result.returned);
  }
  return errorResponse(result.errorCode);
}
