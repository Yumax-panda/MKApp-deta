import { NextRequest } from "next/server"
import { isAuthenticated } from "./lib/auth"

export const config = {
  matcher: ["/api/guilds/:function*", "/api/users/:function*"],
}

export function middleware(req: NextRequest) {
  if (!isAuthenticated(req)) {
    return Response.json(
      { success: false, message: "authentication failed" },
      { status: 401 },
    )
  }
}
