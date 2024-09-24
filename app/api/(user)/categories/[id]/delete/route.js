import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../../../_lib/responseGenerator";
import { deleteTestCategory } from "@/app/_controllers/testCategoryController";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function DELETE(request, { params }) {
  let result = await deleteTestCategory(Number(params.id));
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
