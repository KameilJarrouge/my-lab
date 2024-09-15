import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";

import { addUnitOrNothing } from "@/app/_controllers/settingsController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  const body = await request.json();
  let result = await addUnitOrNothing(body.name);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
