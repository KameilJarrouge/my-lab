import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../../../_lib/responseGenerator";
import { updateVisitTestTemplate } from "@/app/_controllers/visitTestController";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function PUT(request, { params }) {
  const body = await request.json();
  let result = await updateVisitTestTemplate(Number(params.id), body);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
