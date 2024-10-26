import { fixDirectlSA } from "@/app/_controllers/fixesController";
import { successResponse } from "@/app/_lib/responseGenerator";
import { NextRequest } from "next/server";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function GET(request, { params }) {
  await fixDirectlSA();

  return successResponse();
}
