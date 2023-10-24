import config from "../config";
import * as jwt from "jsonwebtoken";

export default function generateToken(email: string): string {
  return jwt.sign({ email }, config.jwtSecret, {
    expiresIn: "30d",
    algorithm: "HS256",
  } as jwt.SignOptions);
}

export function verifyToken(token: string): { email: string } {
  return jwt.verify(token, config.jwtSecret) as string as unknown as {
    email: string;
  };
}
