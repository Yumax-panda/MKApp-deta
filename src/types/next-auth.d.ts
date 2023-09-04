import type { AdapterUser } from "next-auth/adapters";

declare module "next-auth/adapters" {
  export interface AdapterUser {
    discordId?: string | null;
  }
}
