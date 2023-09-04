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

      const tasks: Promise<void>[] = [];

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
      return {
        sessionToken,
        userId,
        expires,
      };
    },
  };
}
