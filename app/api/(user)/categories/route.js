import { allTestCategories } from "@/app/_controllers/testCategoryController";
import { errorResponse, successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request, { params }) {
  const result = await allTestCategories(
    request.nextUrl.searchParams.get("name"),
    request.nextUrl.searchParams.get("page")
  );
  if (result.success) {
    return successResponse(result.returned);
  }
  return errorResponse(result.errorCode);
}
