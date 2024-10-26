import { checkDirectlSAIssue } from "@/app/_controllers/fixesController";
import { getVisits } from "@/app/_controllers/visitController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request, { params }) {
  const result = await checkDirectlSAIssue();
  return successResponse(result);
}
