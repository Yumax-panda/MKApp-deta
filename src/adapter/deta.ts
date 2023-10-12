import type { DetaClientType } from "@/repository/deta"
import type { Adapter, AdapterUser } from "next-auth/adapters"

export function DetaAdapter(d: DetaClientType, options = {}): Adapter {
  return {
    createUser: async (user) => {
      return await d.user.create(user)
    },
    getUser: async (id) => {
      return (await d.user.getById(id)) as AdapterUser | null
    },
    getUserByEmail: async (email) => {
      return (await d.user.getByEmail(email)) as AdapterUser | null
    },
    getUserByAccount: async (providerAccountId) => {
      const account = await d.account.get(providerAccountId)
      if (!account) return null
      return (await d.user.getById(account.userId)) as AdapterUser | null
    },
    updateUser: async (user) => {
      return (await d.user.update(user)) as AdapterUser
    },
    deleteUser: async (userId) => {
      const user = await d.user.delete(userId)

      if (!user) return
      await Promise.all([
        d.account.deleteAll(userId),
        d.session.deleteAll(userId),
      ])
      return
    },
    // createSession: async (session) => {},
  }
}
