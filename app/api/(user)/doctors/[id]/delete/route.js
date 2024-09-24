import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../../../_lib/responseGenerator";
import { deleteDoctor } from "@/app/_controllers/doctorController";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function DELETE(request, { params }) {
  let result = await deleteDoctor(Number(params.id));
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
