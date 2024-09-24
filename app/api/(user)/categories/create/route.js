import { NextRequest } from "next/server";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { createTestCategory } from "@/app/_controllers/testCategoryController";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  let body = await request.json();
  const result = await createTestCategory(body);
  if (result.success) {
    return successResponse(result.returned);
  }
  return errorResponse(result.errorCode);
}
