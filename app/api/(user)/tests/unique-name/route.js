import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { uniqueName } from "@/app/_controllers/testController";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  const body = await request.json();
  const result = await uniqueName(body.name);
  if (!result.success) return errorResponse(result.errorCode);

  return successResponse(result.returned);
}
