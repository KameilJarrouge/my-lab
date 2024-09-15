import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { createDoctor } from "@/app/_controllers/doctorController";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  let body = await request.json();
  const result = await createDoctor(body);
  if (result.success) {
    return successResponse(result.returned);
  }
  return errorResponse(result.errorCode);
}
