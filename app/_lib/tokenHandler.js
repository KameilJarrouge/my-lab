import * as jose from "jose";
import { errorReturn, successReturn } from "./controllerReturnGenerator";
import { errors } from "../_constants/constants";

/**
 * checks if the token the user provided is still valid
 * @param token user's token
 * @param callback a function called with the payload if token valid
 * @returns wether the token is valid or not
 */
export async function verifyToken(token) {
  if (!token) return errorReturn(errors.token_error);

  try {
    const { payload } = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET_TOKEN)
    );
    return successReturn(payload);
  } catch (error) {
    return errorReturn(errors.token_error);
  }
}

/**
 * creates a token for a user
 * @param user the payload to the sign function (user's object)
 * @returns the created token
 */
export async function issueToken(user) {
  let token = await new jose.SignJWT({ id: user.id, admin: user.admin })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(new TextEncoder().encode(process.env.JWT_SECRET_TOKEN));
  return token;
}
