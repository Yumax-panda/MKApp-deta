import type { DetaClientType } from "@/repository/deta"
import type { Adapter, AdapterUser, AdapterAccount } from "next-auth/adapters"

export function DetaAdapter(d: DetaClientType): Adapter {
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
    async linkAccount(accountInit) {
      return (await d.account
        .create(accountInit)
        .then((account) => account)) as AdapterAccount
    },
    async unlinkAccount({ provider, providerAccountId }) {
      await d.account.delete({ provider, providerAccountId })
    },
    async createSession(sessionInit) {
      return await d.session.create(sessionInit).then((session) => session)
    },
    async getSessionAndUser(sessionToken) {
      const session = await d.session.get(sessionToken)
      if (!session) return null
      const user = (await d.user.getById(session.userId)) as AdapterUser | null
      if (!user) return null
      return { session, user }
    },
    async updateSession(partialSession) {
      return await d.session.update(partialSession)
    },
    async deleteSession(sessionToken) {
      await d.session.delete(sessionToken)
    },
  }
}
