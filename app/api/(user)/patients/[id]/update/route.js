import { NextRequest } from "next/server";
import {
  errorResponse,
  successResponse,
} from "../../../../../_lib/responseGenerator";
import { updatePatient } from "@/app/_controllers/patientController";
/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function PUT(request, { params }) {
  const body = await request.json();
  let result = await updatePatient(Number(params.id), body);
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
