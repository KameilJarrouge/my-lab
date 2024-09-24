import { NextRequest } from "next/server";

import { setUnits } from "@/app/_controllers/settingsController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function PUT(request) {
  const body = await request.json();
  let result = await setUnits(body.id, body);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
