import { allPatients } from "@/app/_controllers/patientController";
import {
  errorResponse,
  successResponse,
} from "../../../_lib/responseGenerator";
import { NextRequest } from "next/server";

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request) {
  const result = await allPatients(
    request.nextUrl.searchParams.get("name"),
    request.nextUrl.searchParams.get("sex"),
    request.nextUrl.searchParams.get("ageOperand"),
    request.nextUrl.searchParams.get("age"),
    request.nextUrl.searchParams.get("page")
  );
  if (!result.success) {
    return errorResponse(result.errorCode);
  }
  return successResponse(result.returned);
}
