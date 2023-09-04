import type { DetaClientType } from "@/repository/deta";
import type { Adapter } from "next-auth/adapters";
import type { UpdateProps as UserUpdate } from "@/repository/user";
import { throws } from "assert";

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
      const user = await d.user.get(account.userId);

      if (!user) throw new Error("User not found");

      let updates: UserUpdate = { discordId: account.providerAccountId };
      const { access_token, refresh_token, expires_at } = account;

      if (refresh_token) {
        updates = { ...updates, refreshToken: refresh_token };
      }

      await Promise.all([
        d.user.update(user.key, updates),
        d.token.create({
          userId: user.key,
          accessToken: access_token,
          options: { expireAt: expires_at },
        }),
      ]);
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
      if (!session)
        throw new Error("Session not found on getSessionAndUser called");
      const user = await d.user.get(session.userId);
      if (!user) throw new Error("User not found on getSessionAndUser called");
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
      return await d.session.delete(sessionToken);
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
