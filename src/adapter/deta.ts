import type { DetaClientType } from "@/deta/deta";
import type { Adapter } from "next-auth/adapters";
import type { UpdateProps as UserUpdate } from "@/deta/user";

export function DetaAdapter(d: DetaClientType, options = {}): Adapter {
  return {
    async createUser(user) {
      const { name, image, email } = user;
      const createdUser = await d.user.create({ name, image, email });
      return {
        id: createdUser.key,
        name,
        image,
        email,
        emailVerified: null,
      };
    },
    async getUser(id) {
      const user = await d.user.get(id);
      if (!user) {
        return null;
      }
      return {
        id: user.key,
        discordId: user.discordId,
        name: user.name,
        image: user.image,
        email: user.email,
        emailVerified: null,
      };
    },
    async getUserByEmail(email) {
      const user = await d.user.getByEmail(email);
      if (!user) {
        return null;
      }
      return {
        id: user.key,
        discordId: user.discordId,
        name: user.name,
        image: user.image,
        email: user.email,
        emailVerified: null,
      };
    },
    async getUserByAccount(providerAccountId) {
      const user = await d.user.getByDiscordId(
        providerAccountId.providerAccountId,
      );
      if (!user) {
        return null;
      }
      return {
        id: user.key,
        discordId: user.discordId,
        name: user.name,
        image: user.image,
        email: user.email,
        emailVerified: null,
      };
    },
    async linkAccount(account) {
      const user = await d.user.getByDiscordId(account.providerAccountId);
      if (!user) {
        return null;
      }

      let updates: UserUpdate = { discordId: account.providerAccountId };
      const { access_token, refresh_token, expires_at } = account;

      const tasks: Promise<unknown>[] = [];

      if (refresh_token) {
        updates = { ...updates, refreshToken: refresh_token };
      }

      tasks.push(d.user.update(user.key, updates));

      if (access_token && expires_at) {
        tasks.push(
          d.token.create({
            userId: user.key,
            accessToken: access_token,
            options: { expireAt: expires_at },
          }),
        );
      }

      await Promise.all(tasks);
      return account;
    },
    async createSession({ sessionToken, userId, expires }) {
      const session = await d.session.create({
        sessionToken,
        userId,
        expires,
      });
      return session;
    },
    async getSessionAndUser(sessionToken) {
      const session = await d.session.get(sessionToken);
      if (!session) return null;
      const user = await d.user.get(session.userId);
      if (!user) return null;
      return {
        session,
        user: {
          id: user.key,
          discordId: user.discordId,
          name: user.name,
          image: user.image,
          email: user.email,
          emailVerified: null,
        },
      };
    },
    async updateSession(session) {
      return await d.session.update(session);
    },
    async deleteSession(sessionToken) {
      await d.session.delete(sessionToken);
    },
    async updateUser(user) {
      const { id, emailVerified, ...updates } = user;
      const newUser = await d.user.update(id, updates);
      if (!newUser) {
        throw new Error("User not updated");
      }
      return {
        id: newUser.key,
        discordId: newUser.discordId,
        name: newUser.name,
        image: newUser.image,
        email: newUser.email,
        emailVerified: null,
      };
    },
  };
}
