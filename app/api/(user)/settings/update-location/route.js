import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";

import { setLocation } from "@/app/_controllers/settingsController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function PUT(request) {
  const body = await request.json();
  let result = await setLocation(body.id, body);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
