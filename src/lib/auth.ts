import type { NextRequest } from "next/server"

export function isAuthenticated(req: NextRequest) {
  const headers = req.headers
  const authorization = headers.get("Authorization")
  if (!authorization) {
    return false
  }
  const token = authorization?.replace("Bearer ", "")
  return token === process.env.API_SECRET
}
