import { successLogoutResponse } from "../../../_lib/responseGenerator";
import { NextRequest } from "next/server";
export const revalidate = 0;

/**
 *
 * @param {NextRequest} request
 * @returns
 */
export async function POST(request) {
  return successLogoutResponse();
}
