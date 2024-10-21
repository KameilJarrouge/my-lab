import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../../../_lib/responseGenerator";
import { appendStoolExaminationArbitrary } from "@/app/_controllers/arbitraryController";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function PUT(request, { params }) {
  const body = await request.json();
  let result = await appendStoolExaminationArbitrary(body.stoolExamination);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
